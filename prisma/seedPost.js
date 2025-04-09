const { PrismaClient } = require('@prisma/client');
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
`
const postList = [
  {
    id: 1,
    title: "The Art of Homemade Pizza",
    content: {
      "time": 1744036541508,
      "blocks": [
        {
          "id": "intro1",
          "type": "paragraph",
          "data": {
            "text": "Craving that perfect slice? Let's dive into the delicious world of homemade pizza and learn how to create a pie that rivals your favorite pizzeria."
          }
        },
        {
          "id": "header1",
          "type": "header",
          "data": {
            "text": "Why Make Pizza at Home?",
            "level": 3
          }
        },
        {
          "id": "list1",
          "type": "list",
          "data": {
            "type": "unordered",
            "items": [
              "You control the ingredients and flavors",
              "It's fun and perfect for family nights",
              "Cost-effective and customizable"
            ]
          }
        },
        {
          "id": "header2",
          "type": "header",
          "data": {
            "text": "Essential Ingredients",
            "level": 3
          }
        },
        {
          "id": "para2",
          "type": "paragraph",
          "data": {
            "text": "All you need is high-protein flour, water, yeast, olive oil, and salt. Top it off with homemade sauce, mozzarella, and your favorite toppings."
          }
        },
        {
          "id": "image1",
          "type": "image",
          "data": {
            "file": {
              "url": "https://example.com/images/pizza.jpg"
            },
            "withBorder": true,
            "withBackground": false,
            "stretched": false,
            "caption": "Freshly baked Margherita pizza with basil."
          }
        }
      ]
    },
    authorId: 1,
    publish: true,
  },
  {
    id: 2,
    title: "Avocado Toast: A Breakfast Delight",
    content: {
      "time": 1744036541508,
      "blocks": [
        {
          "id": "intro2",
          "type": "paragraph",
          "data": {
            "text": "Avocado toast is not just a trend; it's a delicious and nutritious way to start your day. Let's explore how to make the perfect avocado toast."
          }
        },
        {
          "id": "header3",
          "type": "header",
          "data": {
            "text": "Why Avocado Toast?",
            "level": 3
          }
        },
        {
          "id": "list2",
          "type": "list",
          "data": {
            "type": "unordered",
            "items": [
              "Rich in healthy fats and fiber",
              "Quick and easy to prepare",
              "Versatile with endless topping options"
            ]
          }
        },
        {
          "id": "header4",
          "type": "header",
          "data": {
            "text": "Basic Recipe",
            "level": 3
          }
        },
        {
          "id": "para3",
          "type": "paragraph",
          "data": {
            "text": "<strong>Ingredients:</strong> Ripe avocados, whole-grain bread, salt, pepper, lemon juice."
          }
        },
        {
          id: 'image2',
          type: 'image',
          data: {
            file: {
              url: 'https://example.com/images/avocado-toast.jpg'
            },
            withBorder: true,
            withBackground: false,
            stretched: false,
            caption: 'Perfectly ripe avocado on toasted bread.'
          }
        }
      ]
    },
    authorId: 1,
    publish: true,
  },
  {
    id:3,
    title: "Ramen at Home: Comfort in a Bowl",
    content: {
      "time": 1744036541508,
      "blocks": [
        {
          "id": "intro3",
          "type": "paragraph",
          "data": {
            "text": "Rainy day? Nothing beats a warm bowl of ramen. Here’s how you can make an impressive bowl of comfort right at home."
          }
        },
        {
          "id": "header1",
          "type": "header",
          "data": {
            "text": "Build Your Bowl",
            "level": 3
          }
        },
        {
          "id": "list1",
          "type": "list",
          "data": {
            "type": "unordered",
            "items": [
              "Broth (chicken, pork, or veggie)",
              "Ramen noodles",
              "Toppings: soft-boiled egg, green onions, mushrooms"
            ]
          }
        },
        {
          "id": "para1",
          "type": "paragraph",
          "data": {
            "text": "Simmer your broth with garlic and miso paste for depth. Cook noodles until chewy and add your favorite toppings."
          }
        },
        {
          "id": "attaches1",
          "type": "attaches",
          "data": {
            "file": {
              "url": "https://example.com/files/ramen-recipe.pdf",
              "size": 20480,
              "name": "ramen-recipe.pdf",
              "extension": "pdf"
            },
            "title": "Full Ramen Recipe"
          }
        },
        {
          "id": "image3",
          "type": "image",
          "data": {
            "file": {
              "url": "https://example.com/images/ramen-bowl.jpg"
            },
            "withBorder": false,
            "withBackground": true,
            "stretched": false,
            "caption": "Homemade miso ramen topped with soft-boiled egg and scallions."
          }
        }
      ]
    },
    authorId: 1,   
    publish: true, 
  }

]

async function main() {
  
  for (const post of postList) {
    const postInDB = await prisma.post.findUnique({
      where: {
        id: post.id
      }
    });

    if(postInDB == null) { 
    const createdPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: post.authorId,
        publish: post.publish,
      },
    });
    console.log(`Created post with id: ${createdPost.id}`);
    }
    
    console.log(`Post with id ${post.id} already exist`);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
}
);