## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript with [Prisma](https://www.prisma.io) ORM.

## Installation

```bash
$ npm install
```

## Preparing the database

```bash
# Start Postgres Database
$ docker--compose up -d

# run migrations
$ npx prisma migrate dev

# Seed database
$ npm run seed

#Check database contents
$ npx prisma studio
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger module
[Swagger](http://localhost:3000/api)


