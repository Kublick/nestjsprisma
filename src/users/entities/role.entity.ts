import { UserEntity } from './user.entity';

export class RoleEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  user: UserEntity;
}
