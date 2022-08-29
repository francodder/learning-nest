import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsString, MinLength } from 'class-validator';
import { CreateBrandDto } from './create-brand.dto';

/* Inheriting this way we get all props defined in CreateBrandDto
   but they are all optionals

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

*/

export class UpdateBrandDto {
  @IsDefined()
  @IsString()
  @MinLength(3)
  readonly name: string;
}

