export type CourseProviderShort = {
  id: string;
  name: string;
};

export type CourseProviderFull = {
  id: string;
  name: string;
  url: string;
  coverUrl?: string;
  shortDescription: string;
  description: string;
};

export type CourseProvider = {
  id: string;
  name: string;
  description: string;
  logo: {
    url: string;
    width: number;
    height: number;
  };
};

export type CourseTag = {
  id: string;
  name: string;
};

export type CourseProfession = {
  id: string;
  name: string;
};

type CourseImage = {
  url: string;
};

export type CourseShort = {
  name: string;
  id: string;
  startMskDateTime: string;
  endMskDateTime: string;
  url: string;
  coverUrl: string;
  provider: CourseProviderShort;
  updatedAt: string;
  isArchived: boolean;
  profession: CourseProfession;
};

export type CourseFull = {
  name: string;
  id: string;
  description: string;
  coverUrl: string;
  isArchived: boolean;
  url: string;
  provider: CourseProvider;
  updatedAt: string;
  startMskDateTime: string;
  endMskDateTime: string;
  profession: CourseProfession;
  isIndefinite: boolean;
  internalRating: number;
  isForAdvancedStudents: boolean;
};
