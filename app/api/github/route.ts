import { NextResponse } from 'next/server';
import { getGitHubStats } from '@/lib/github';

export async function GET() {
  try {
    const stats = await getGitHubStats();
    
    if (!stats) {
      return NextResponse.json(
        { error: 'Failed to fetch GitHub stats' },
        { status: 500 }
      );
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('GitHub API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
