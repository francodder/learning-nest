import { IsDefined, IsNotEmptyObject, IsString } from 'class-validator';

export class NewCarDto {
  @IsDefined({ message: 'brand is required' })
  @IsString()
  readonly brand: string;

  @IsDefined({ message: 'model is required' })
  @IsString()
  readonly model: string;

  @IsNotEmptyObject()
  this;
}

/* In the DTO we do all validations we need to ensure the frontend
   is sending the data correctly 
   
   class-validator is a package with tons of utilities to validate
   things in our DTOs
   
   Is good practise to make props of a DTO readonly
   */
