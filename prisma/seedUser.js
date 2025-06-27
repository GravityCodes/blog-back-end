import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import pswManager from "../config/password.js";
//user model
`
model User {
  id       Int       @id @default(autoincrement())
  name     String
  email    String    @unique
  password String
  author   Boolean
  post     Post[]
  comments Comment[]
}

`;

const password = await pswManager.hashPassword("test");

async function main() {
  const users = [
    {
      name: "Johan Mesa",
      email: "johan.mesa2001@gmail.com",
      password: password,
      author: true,
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        author: user.author,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
