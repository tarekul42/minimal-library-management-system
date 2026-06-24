export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateCategoryInput {
  name: string;
  slug?: string;
  description?: string;
  parent?: string;
}
