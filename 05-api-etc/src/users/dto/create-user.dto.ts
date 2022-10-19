import { IsString, MaxLength, MinLength, IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  // TODO: Validate password integrity
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
