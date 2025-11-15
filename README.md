# Blog Backend

This is the backend of TheOdinProject's Blog API. The focus of this project was to learn about API's basics and security.

## Features

- Aunthenticate users with jsonwebtokens and cookies.
- CRUD operations for post and users.
- Postgresql Database for posts and users.

## Getting Started

1. Clone the repository to your local machine.
```sh
git clone git@github.com:GravityCodes/blog-back-end.git
```
2. Navigate to the project directory.
```sh
cd blog-back-end
```
3. Install the required dependencies.
```sh
npm install
```
4. setup environment variables.
```sh
cp .env.example .env
```

5. Initialize prisma.
```sh
npx prisma generate
npx prisma migrate deploy
```

6. Start the server.
```sh
npm run start
```

# Tech

[Express] (https://expressjs.com/) - Web framework for nodejs.
[Prisma] (https://www.prisma.io/) - Prisma ORM for javascript to interact with database.
