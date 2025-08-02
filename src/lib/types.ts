export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  accessKey: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  progress: number;
  startDate: string;
  endDate: string;
  techStack: string[];
  client: string;
  overview: {
    background: string;
    objectives: string[];
    deliverables: string[];
  };
  milestones: Milestone[];
  documents: Document[];
  downloads: Download[];
  demos: Demo[];
}

export interface Milestone {
  name: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  completedDate: string | null;
}

export interface Document {
  title: string;
  file: string;
}

export interface Download {
  name: string;
  description: string;
  url: string;
  icon: string;
  size: string;
}

export interface Demo {
  title: string;
  type: 'iframe' | 'video' | 'link';
  url: string;
  description: string;
}

export interface ProjectsData {
  projects: Project[];
}