import { CategoryService } from './types';
import { prisma } from '../../plugins/prisma.plugin';

export const categoryService: CategoryService = {
  createCategory: async (category) => {
    return prisma.category.create({ data: category });
  },
  updateCategory: async (categoryId, payload) => {
    return prisma.category.update({
      where: { id: categoryId },
      data: payload,
    });
  },
  deleteCategory: async (categoryId) => {
    await prisma.category.delete({ where: { id: categoryId } });
  },
  getCategory: async (categoryId) => {
    return prisma.category.findUnique({ where: { id: categoryId } });
  },
  getAwardCategories: async (awardId) => {
    const awardCategories = await prisma.awardCategory.findMany({
      where: { awardId },
      include: { category: true },
    });

    return awardCategories.map((awardCategory) => awardCategory.category);
  },
  getPublicCategories: async (pagination) => {
    const categories = await prisma.category.findMany({
      where: {
        public: true,
      },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
    });

    const total = await prisma.category.count({
      where: {
        public: true,
      },
    });

    return {
      items: categories,
      total,
    };
  },
  createAwardCategory: async (payload) => {
    return prisma.awardCategory.create({ data: payload });
  },
  deleteAwardCategory: async (payload) => {
    await prisma.awardCategory.delete({
      where: {
        awardId_categoryId: {
          awardId: payload.awardId,
          categoryId: payload.categoryId,
        },
      },
    });
  },
  getAwardCategory: async (payload) => {
    return prisma.awardCategory.findUnique({
      where: {
        awardId_categoryId: {
          awardId: payload.awardId,
          categoryId: payload.categoryId,
        },
      },
    });
  },
};
