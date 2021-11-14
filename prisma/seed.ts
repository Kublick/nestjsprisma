import { PrismaClient } from '@prisma/client';
import { users } from '../seed/users';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({ data: { ...user, password: hashedPassword } });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('🌱 Seeding Database Complete');
    await prisma.$disconnect();
  });
