import { AwardCategory, Category, Prisma } from '@prisma/client';
import { ListRequest, ListResponse } from '../../types/pagination';
import { RequireAtLeastOne } from '../../utils/util-types';

export interface CreateCategoryPayload {
  name: string;
  description: string;
  createdBy: string;
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
  getCategory: (
    criteria: RequireAtLeastOne<{ id: string; createdBy: string }>,
    include?: Prisma.CategoryInclude,
  ) => Promise<Category | null>;
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
