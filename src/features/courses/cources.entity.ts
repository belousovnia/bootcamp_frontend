export type CourseProviderShort = {
  id: string;
  title: string;
};

export type CourseProviderFull = {
  id: string;
  name: string;
  url: string;
  coverUrl?: string;
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
  id: string;
  title: string;
  url: string;
  coverUrl: string;
  startsAt: string;
  endsAt: string;
  provider: string;
  providerUrl: string;
  providerCoverUrl: string;
  profession: string;
};

export type CourseFull = {
  id: string;
  title: string;
  url: string;
  coverUrl: string;
  description: string;
  startsAt: string;
  endsAt: string;
  isAdvanced: boolean;
  provider: string;
  providerUrl: string;
  providerCoverUrl: string;
  profession: string;
};
