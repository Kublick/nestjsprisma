import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  role: string;
}

export default RegisterDto;
