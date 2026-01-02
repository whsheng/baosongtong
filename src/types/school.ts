export interface School {
  id: number;
  name: string;
  plan: number;
  limit: number;
  brochureDate: string;
  registrationStart: string;
  registrationEnd: string;
  writtenExamDate: string;
  interviewDate: string;
  officialUrl: string;
}

export interface SchoolData {
  year: number;
  schools: School[];
}

export type ViewMode = 'timeline' | 'cards';

export interface TimelineEvent {
  id: string;
  schoolId: number;
  schoolName: string;
  date: string;
  type: 'written' | 'interview';
}
