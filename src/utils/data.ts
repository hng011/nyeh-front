import type { Experience, Project, SkillGroup } from './types';

export const experiences: Experience[] = [
  {
    title: 'Machine Learning Engineer',
    company: 'Data Labs Analytics (Indonesia)',
    location: 'Jakarta, Indonesia',
    startDate: 'Oct 2025',
    endDate: 'Present',
    duration: '9 months',
    highlights: [
      'Building and deploying machine learning models for data-driven analytics solutions at datalabs.id',
      'Working with Google Cloud Platform (GCP) infrastructure for ML pipelines',
      'Leveraging Google BigQuery and Google GenAI for large-scale data processing and AI workloads',
    ],
  },
  {
    title: 'Data Science Course Assistant',
    company: 'Gunadarma University',
    location: 'Jakarta, Indonesia',
    startDate: 'Jun 2025',
    endDate: 'Jun 2025',
    duration: '1 month',
    highlights: [
      'Provided academic and technical support for data science courses covering Python, data analysis, and visualization',
      'Guided students through practical exercises using Pandas, Matplotlib, and other Python libraries',
      'Assisted in grading assignments, resolving coding issues, and reinforcing key concepts',
    ],
  },
  {
    title: 'HPC-UG Lab Assistant',
    company: 'Gunadarma University',
    location: 'Jakarta, Indonesia',
    startDate: 'Mar 2025',
    endDate: 'May 2025',
    duration: '3 months',
    highlights: [
      'Completed a Training of Trainers (ToT) program focused on AI/ML development, Data Science, and NVIDIA DGX supercomputer operations',
      'Provided hands-on guidance to students on NVIDIA DGX supercomputer functionalities and AI/Data Science project development',
      'Resolved technical issues during practicum sessions, ensuring uninterrupted learning experiences',
    ],
  },
  {
    title: 'International Summer Course Workshop Assistant',
    company: 'Gunadarma University',
    location: 'Jakarta, Indonesia',
    startDate: 'Apr 2025',
    endDate: 'Apr 2025',
    duration: '1 month',
    highlights: [
      'Assisted in delivering a workshop on Natural Language Processing (NLP) for an international summer course attended by lecturers from Uzbekistan',
      'Led a hands-on session on Large Language Models (LLMs) for creative text generation (fiction story generation)',
      'Prepared materials and provided technical guidance to participants during practical exercises',
    ],
  },
  {
    title: 'Full Stack Web Developer',
    company: 'Minova Infotech Solutions',
    location: 'Tangerang, Banten, Indonesia',
    startDate: 'Jan 2025',
    endDate: 'Feb 2025',
    duration: '2 months',
    highlights: [
      'Integrated APIs with front-end components using JavaScript and Ext JS',
      'Optimized SQL procedures for efficient data processing, enhancing ERP & CRM applications',
      'Developed custom reports (RDL) and resolved system bugs to improve performance and user experience',
    ],
  },
  {
    title: 'Data Analytics and Administrative',
    company: 'PT. BANK NEGARA INDONESIA (Persero) Tbk.',
    location: 'Jakarta, Indonesia',
    startDate: 'Sep 2024',
    endDate: 'Dec 2024',
    duration: '4 months',
    highlights: [
      'Collected and processed data to ensure accuracy for analysis, enhancing data-driven decision-making',
      'Prepared and documented detailed Minutes of Meetings (MoM) for effective communication',
      'Analysed data to generate efficient reports and visualizations',
    ],
  },
  {
    title: 'Machine Learning Student',
    company: 'Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka',
    location: 'Indonesia',
    startDate: 'Feb 2024',
    endDate: 'Jul 2024',
    duration: '6 months',
    highlights: [
      'Selected for Google-led program in collaboration with Indonesia\'s top tech companies (GoTo, Traveloka, Deeptech Foundation)',
      'Developed technical expertise in Machine Learning alongside Android Development and Cloud Computing tracks',
      'Enhanced essential soft skills through project-based learning and industry mentorship',
    ],
  },
];

export const projects: Project[] = [
  {
    title: 'Commander',
    description:
      'Networking Stuff – a glimpse into TCP/IP with a Client-Server Architecture for Remote Command Execution.',
    techStack: ['Python', 'Socket Programming', 'Client/Server Architecture'],
    outcome:
      'https://github.com/hng011/commander',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'AI & Machine Learning',
    items: [
      'TensorFlow',
      'Google GenAI',
      'Large Language Models (LLMs)',
      'Natural Language Processing (NLP)',
      'Data Science',
      'Machine Learning',
      'Deep Learning',
      'Generative AI',
      'RAG Development',
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    items: [
      'Google Cloud Platform',
      'Azure',
    ],
  },
  {
    category: 'Backend & Development',
    items: [
      'Python',
      'FastAPI',
      'JavaScript/TypeScript',
      'SQL',
      'ERP/CRM Systems',
    ],
  },
];
