import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { defaultCategories } from './default-categories';

const prisma = new PrismaClient();

async function main() {
  if (!process.env.FWA_PASSWORD) {
    throw new Error('FWA_PASSWORD is not set');
  }

  const encryptedPassword = await bcrypt.hash(process.env.FWA_PASSWORD, 10);

  let fwaUser = await prisma.user.findUnique({
    where: {
      username: 'FriendsAwards',
    },
  });

  if (!fwaUser) {
    fwaUser = await prisma.user.create({
      data: {
        username: 'FriendsAwards',
        password: encryptedPassword,
      },
    });
  }

  await prisma.category.createMany({
    data: defaultCategories.categories.map((category) => ({
      name: category.name,
      description: category.description,
      tags: category.tags,
      createdBy: fwaUser!.id,
      public: true,
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
