export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  highlights: string[];
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  outcome: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}
