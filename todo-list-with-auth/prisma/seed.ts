import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Work",
      },
      {
        name: "Personal",
      },
    ],
  });
  const priorities = await prisma.priority.createMany({
    data: [
      {
        name: "Do",
      },
      {
        name: "Defer",
      },
      {
        name: "Delegate",
      },
      {
        name: "Delete",
      },
    ],
  });
  console.log({
    categories,
    priorities,
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
