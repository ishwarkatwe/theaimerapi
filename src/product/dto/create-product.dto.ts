import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @IsNotEmpty({ message: 'Product description is required' })
  description: string;

  @IsNotEmpty({ message: 'Product category is required' })
  category: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be positive' })
  price: number;

  @IsNotEmpty({ message: 'Seller ID is required' })
  seller: string;

  @ApiProperty({
    description: 'User status',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
