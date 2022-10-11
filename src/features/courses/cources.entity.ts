type Provider = {
  id: string;
  name: string;
  description: string;
  logo: {
    url: string;
    width: number;
    height: number;
  };
};

type CourseTag = {
  id: string;
  name: string;
};

type Direction = {
  id: string;
  name: string;
};

type Image = {
  url: string;
  width: number;
  height: number;
};

export type Course = {
  name: string;
  id: string;
  image: Image;
  description: string;
  tags: CourseTag[];
  provider: Provider;
  updatedAt: string;
  innerRating: number;
  isProfessional: boolean;
  isArchived: boolean;
  dateStart: string;
  dateEnd: string;
  direction: Direction;
};
