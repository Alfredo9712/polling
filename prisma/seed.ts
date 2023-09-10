import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "alfredo98.rm@gmail.com" },
    update: {
      polls: {
        create: {
          title: "Movie Night Decision",
          description:
            "Help us choose the movie for our next movie night. Cast your vote",
          pollOptions: {
            create: [
              { text: "Action/Adventure" },
              { text: "Comedy" },
              { text: "Sci-Fi/Fantasy" },
              { text: "Romance" },
              { text: "Documentary" },
            ],
          },
        },
      },
    },
    create: {},
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
