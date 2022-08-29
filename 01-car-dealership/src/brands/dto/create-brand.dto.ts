import { IsDefined, IsString, MinLength } from 'class-validator';

export class CreateBrandDto {
  @IsDefined()
  @IsString()
  @MinLength(3)
  readonly name: string;
}

