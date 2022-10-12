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

export type CourseShort = {
  name: string;
  id: string;
  image: Image;
  provider: Provider;
  updatedAt: string;
  dateStart: string;
  dateEnd: string;
  direction: Direction;
};
