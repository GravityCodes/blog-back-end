const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Post Model
`
model Post {
  id        Int       @id @default(autoincrement())
  title     String
  content   JSON
  author    User      @relation(fields: [authorId], references: [id])
  authorId  Int       @unique
  comments  Comment[]
  publish   Boolean
  timestamp DateTime  @default(now())
}
`;
const postList = [
    {
      id: 1,
      title: "Why You Should Learn JavaScript First",
      content: {
        "time": 1745880000000,
        "blocks": [
          {
            "id": "intro1",
            "type": "header",
            "data": {
              "text": "Why You Should Learn JavaScript First",
              "level": 2
            }
          },
          {
            "id": "para1",
            "type": "paragraph",
            "data": {
              "text": "JavaScript is one of the most widely used programming languages today, especially for web development. It's beginner-friendly, has a massive community, and runs in every modern browser."
            }
          },
          {
            "id": "list1",
            "type": "list",
            "data": {
              "style": "unordered",
              "items": [
                "Runs in any browser",
                "Massive community and learning resources",
                "Used for both frontend and backend"
              ]
            }
          },
          {
            "id": "para2",
            "type": "paragraph",
            "data": {
              "text": "Learning JavaScript first gives you a strong foundation for web development and makes it easier to transition into other frameworks and languages later."
            }
          }
        ]
      }
      ,
      authorId: 1,
      publish: true
    },
    {
      id: 2,
      title: "Understanding Asynchronous Programming in JavaScript",
      content: {
        "time": 1745880100000,
        "blocks": [
          {
            "id": "async1",
            "type": "header",
            "data": {
              "text": "Understanding Asynchronous Programming in JavaScript",
              "level": 2
            }
          },
          {
            "id": "para1",
            "type": "paragraph",
            "data": {
              "text": "JavaScript is single-threaded, which means it can only do one thing at a time. Asynchronous programming lets you run tasks in the background without blocking the main thread."
            }
          },
          {
            "id": "list2",
            "type": "list",
            "data": {
              "style": "unordered",
              "items": [
                "Callbacks",
                "Promises",
                "Async/Await"
              ]
            }
          },
          {
            "id": "code1",
            "type": "code",
            "data": {
              "code": "async function fetchData() {\n  const res = await fetch('/api/data');\n  const json = await res.json();\n  console.log(json);\n}"
            }
          },
          {
            "id": "para2",
            "type": "paragraph",
            "data": {
              "text": "Understanding async code helps you write non-blocking apps and improves performance when working with APIs or databases."
            }
          }
        ]
      }
      ,
      authorId: 1,
      publish: true
    },
    {
      id: 3,
      title: "Getting Started with Git and GitHub",
      content: {
        "time": 1745880200000,
        "blocks": [
          {
            "id": "git1",
            "type": "header",
            "data": {
              "text": "Getting Started with Git and GitHub",
              "level": 2
            }
          },
          {
            "id": "para1",
            "type": "paragraph",
            "data": {
              "text": "Git is a version control system that lets you track changes in your code. GitHub is a platform for hosting and collaborating on Git repositories."
            }
          },
          {
            "id": "list3",
            "type": "list",
            "data": {
              "style": "unordered",
              "items": [
                "Initialize a Git repository with `git init`",
                "Track files with `git add .`",
                "Commit changes with `git commit -m \"message\"`",
                "Push to GitHub with `git push origin main`"
              ]
            }
          },
          {
            "id": "quote1",
            "type": "quote",
            "data": {
              "text": "Version control is a must-have skill for any serious developer.",
              "caption": "— Every dev ever"
            }
          }
        ]
      }
      ,
      authorId: 1,
      publish: true
    }
];

async function main() {
  for (const post of postList) {
    const postInDB = await prisma.post.findUnique({
      where: {
        id: post.id,
      },
    });

    if (postInDB == null) {
      const createdPost = await prisma.post.create({
        data: {
          title: post.title,
          content: post.content,
          authorId: post.authorId,
          publish: post.publish,
        },
      });
      console.log(`Created post with id: ${createdPost.id}`);
    }else {
      console.log(`Post with id ${post.id} already exist`);
    }

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
