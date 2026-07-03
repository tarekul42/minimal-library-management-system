export interface IAuthor {
  _id: string;
  name: string;
  bio?: string;
  birthDate?: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateAuthorInput {
  name: string;
  bio?: string;
  birthDate?: string;
  photo?: string;
}

export interface IUpdateAuthorInput {
  name?: string;
  bio?: string;
  birthDate?: string;
  photo?: string;
}
