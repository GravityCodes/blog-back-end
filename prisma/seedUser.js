const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

`
async function main (){
  const users = [
    {
      name: "Johan Mesa",
      email: "Johan.mesa2001@gmail.com",
      password: "test",
      author: true,
    }
  ]

  for (const user of users) {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        author: user.author
      }
    });
  }

}

main()
.catch(e => {
  console.error(e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
});

