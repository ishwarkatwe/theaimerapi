import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Category name is required' })
  name: string;

  @IsString({ message: 'Parent must be a string' })
  parent?: string;

  @IsOptional()
  active?: boolean;
}
