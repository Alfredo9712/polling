import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "alfredo98.rm@gmail.com" },
    update: {
      polls: {
        create: {
          title: "Team Meeting Time Preferences",
          description:
            "We need to schedule our weekly team meeting. Please vote for your preferred meeting time.",
          pollOptions: {
            create: [
              { text: "Monday 9:00 AM" },
              { text: "Tuesday 2:00 PM" },
              { text: "Wednesday 4:00 PM" },
              { text: "Thursday 11:00 AM" },
              { text: "Friday 3:00 PM" },
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
