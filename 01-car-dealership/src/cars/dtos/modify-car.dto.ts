import { IsOptional, IsString } from 'class-validator';

export class ModifyCar {
  @IsOptional()
  @IsString()
  readonly brand: string;

  @IsOptional()
  @IsString()
  readonly model: string;
}
