import { AwardCategory, Category } from '@prisma/client';
import { ListRequest, ListResponse } from '../../types/pagination';

export interface CreateCategoryPayload {
  name: string;
  description: string;
}

export interface UpdateCategoryPayload {
  name: string;
  description: string;
}

export interface CreateAwardCategoryPayload {
  awardId: string;
  categoryId: string;
}

export interface DeleteAwardCategoryPayload {
  awardId: string;
  categoryId: string;
}

export interface GetAwardCategoryPayload {
  awardId: string;
  categoryId: string;
}

export interface GetCategoriesPayload {
  pagination: ListRequest;
}

export interface CategoryService {
  createCategory: (category: CreateCategoryPayload) => Promise<Category>;
  updateCategory: (
    categoryId: string,
    payload: UpdateCategoryPayload,
  ) => Promise<Category>;
  deleteCategory: (categoryId: string) => Promise<void>;
  getCategory: (categoryId: string) => Promise<Category | null>;
  getAwardCategories: (awardId: string) => Promise<Category[]>;
  getPublicCategories: (
    pagination: ListRequest,
  ) => Promise<ListResponse<Category>>;
  createAwardCategory: (
    payload: CreateAwardCategoryPayload,
  ) => Promise<AwardCategory>;
  deleteAwardCategory: (payload: DeleteAwardCategoryPayload) => Promise<void>;
  getAwardCategory: (
    payload: GetAwardCategoryPayload,
  ) => Promise<AwardCategory | null>;
}
