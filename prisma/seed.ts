import { PrismaClient } from '@prisma/client';
import { users } from '../seed/users';
import * as bcrypt from 'bcrypt';
import { roles } from '../seed/roles';

const prisma = new PrismaClient();

async function main() {
  for (const role of roles) {
    await prisma.role.create({
      data: {
        name: role.name,
      },
    });
  }

  for (const user of users) {
    const findItems = await prisma.user.findFirst({ where: { name: 'admin' } });
    const hashedPassword = await bcrypt.hash(user.password, 10);
    let findRole;
    if (findItems === null) {
      findRole = await prisma.role.findFirst({
        where: { name: 'admin' },
      });
    } else {
      findRole = await prisma.role.findFirst({
        where: { name: 'user' },
      });
    }
    await prisma.user.create({
      data: { ...user, password: hashedPassword, roleId: findRole.id },
    });
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
