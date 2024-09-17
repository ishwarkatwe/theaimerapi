import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  @IsNotEmpty({ message: 'Category name is required' })
  name: string;

  @ApiPropertyOptional({
    description: 'The parent category ID, if any',
    example: '5f8f8c44b54764421b716de3',
  })
  @IsString({ message: 'Parent must be a string, add 1 for default' })
  parent?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the category is active or not',
    example: true,
  })
  @IsOptional()
  active?: boolean;
}
