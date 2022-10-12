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

export type CourseComplexity = {
  id: string;
  name: string;
};

export type CourseProfession = {
  id: string;
  name: string;
};

type CourseImage = {
  url: string;
  width: number;
  height: number;
};

export type CourseShort = {
  name: string;
  id: string;
  image: CourseImage;
  provider: CourseProvider;
  updatedAt: string;
  dateStart: string;
  dateEnd: string;
  profession: CourseProfession;
};

export type CourseFull = {
  name: string;
  id: string;
  description: string;
  complexity: CourseComplexity;
  image: CourseImage;
  provider: CourseProvider;
  updatedAt: string;
  dateStart: string;
  dateEnd: string;
  profession: CourseProfession;
};
