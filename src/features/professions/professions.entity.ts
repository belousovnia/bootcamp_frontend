export interface ProfessionEntity {
  id: number;
  name: string;
  coverUrl: string;
  description: string;
}

export type ProfessionsAllResponse = ProfessionEntity[];
