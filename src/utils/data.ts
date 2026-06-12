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
    title: 'LLM-Based Fiction Story Generation',
    description:
      'Led a hands-on workshop session demonstrating how Large Language Models can be leveraged for creative text generation, specifically fiction story writing.',
    techStack: ['Python', 'LLMs', 'NLP', 'Hugging Face'],
    outcome:
      'Successfully delivered to an international audience of university lecturers from Uzbekistan as part of the International Summer Course program.',
  },
  {
    title: 'NVIDIA DGX AI/ML Training Lab',
    description:
      'Completed Training of Trainers program and facilitated practical learning sessions on NVIDIA DGX supercomputer operations for AI and Data Science students.',
    techStack: ['NVIDIA DGX', 'Python', 'CUDA', 'Deep Learning', 'Data Science'],
    outcome:
      'Enabled dozens of Gunadarma University students to gain hands-on experience with enterprise-grade AI hardware and develop AI/Data Science projects.',
  },
  {
    title: 'ERP & CRM System Enhancement',
    description:
      'Enhanced enterprise ERP and CRM applications by optimizing SQL procedures, integrating APIs with front-end components, and developing custom RDL reports.',
    techStack: ['JavaScript', 'Ext JS', 'SQL', 'ERP', 'CRM'],
    outcome:
      'Improved system performance and user experience for enterprise clients at Minova Infotech Solutions.',
  },
  {
    title: 'Data Analytics & Reporting at BNI',
    description:
      'Processed and analyzed banking data to support data-driven decision-making, generating efficient reports and visualizations for one of Indonesia\'s largest state-owned banks.',
    techStack: ['Data Analysis', 'Reporting', 'Visualization', 'SQL'],
    outcome:
      'Enhanced data accuracy and streamlined reporting processes for the banking operations team.',
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
      'Deep Learning',
      'Hugging Face',
      'Data Science',
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    items: [
      'Google Cloud Platform (GCP)',
      'Google BigQuery',
      'Apache Airflow',
      'NVIDIA DGX Supercomputers',
      'CUDA',
      'Azure',
    ],
  },
  {
    category: 'Backend & Development',
    items: [
      'Python',
      'JavaScript',
      'Ext JS',
      'SQL',
      'ERP/CRM Systems',
      'API Integration',
      'RDL Reporting',
    ],
  },
  {
    category: 'Data & Visualization',
    items: [
      'Pandas',
      'Matplotlib',
      'Data Analysis',
      'Data Visualization',
      'Report Generation',
    ],
  },
];
