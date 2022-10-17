export type CourseProfession = {
  id: string;
  name: string;
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
