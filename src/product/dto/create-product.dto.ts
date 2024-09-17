import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Wireless Bluetooth Headphones',
  })
  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example:
      'High-quality wireless Bluetooth headphones with noise-canceling features.',
  })
  @IsNotEmpty({ message: 'Product description is required' })
  description: string;

  @ApiProperty({
    description: 'The category the product belongs to',
    example: 'Electronics',
  })
  @IsNotEmpty({ message: 'Product category is required' })
  category: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 2999.99,
  })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be positive' })
  price: number;

  @ApiProperty({
    description: 'The seller ID associated with the product',
    example: '60f9d9e4e09b0931c0e98320',
  })
  @IsNotEmpty({ message: 'Seller ID is required' })
  seller: string;

  @ApiPropertyOptional({
    description: 'Indicates if the product is currently active',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
