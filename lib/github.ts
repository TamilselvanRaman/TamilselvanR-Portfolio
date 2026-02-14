export interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface GitHubStats {
  repos: number;
  stars: number;
  followers: number;
  following: number;
  avatarUrl: string;
  name: string;
  totalContributions: number;
  contributionDays: ContributionDay[];
}

export async function getGitHubStats(): Promise<GitHubStats | null> {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    console.error('GITHUB_USERNAME not set');
    return null;
  }

  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 }
    });

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`);
    }

    const userData = await userResponse.json();

    // Fetch repos data
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
      next: { revalidate: 3600 }
    });

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`);
    }

    const reposData = await reposResponse.json();
    const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

    // Fetch contribution data using GraphQL API
    let totalContributions = 0;
    let contributionDays: ContributionDay[] = [];

    if (token) {
      try {
        const graphqlQuery = {
          query: `
            query {
              user(login: "${username}") {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        contributionCount
                        date
                      }
                    }
                  }
                }
              }
            }
          `
        };

        const graphqlResponse = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(graphqlQuery),
          next: { revalidate: 3600 }
        });

        if (graphqlResponse.ok) {
          const graphqlData = await graphqlResponse.json();
          const calendar = graphqlData.data?.user?.contributionsCollection?.contributionCalendar;
          
          if (calendar) {
            totalContributions = calendar.totalContributions;
            
            // Get all contribution days from the full year
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const allDays = calendar.weeks.flatMap((week: any) => week.contributionDays);
            contributionDays = allDays; // Use all available data
          }
        }
      } catch (err) {
        console.warn('Failed to fetch contribution data, using fallback:', err);
      }
    }

    return {
      repos: userData.public_repos,
      stars: totalStars,
      followers: userData.followers,
      following: userData.following,
      avatarUrl: userData.avatar_url,
      name: userData.name || username,
      totalContributions,
      contributionDays,
    };
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);
    return null;
  }
}
