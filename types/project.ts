// Project Type Definitions
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectInput {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
  order: number;
}
