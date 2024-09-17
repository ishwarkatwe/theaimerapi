import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadProductDto {
  @ApiProperty({
    description: 'The ID of the product for which the image is being uploaded',
    example: '60f9d9e4e09b0931c0e98320',
  })
  @IsNotEmpty({ message: 'Product id is required' })
  productId: string;
}

export class RemoveProductDto {
  @ApiProperty({
    description: 'The URL of the product image that needs to be removed',
    example: 'https://example.com/products/12345/image.jpg',
  })
  @IsNotEmpty({ message: 'Product image to remove is required' })
  url: string;

  @ApiProperty({
    description: 'The ID of the product associated with the image to remove',
    example: '60f9d9e4e09b0931c0e98320',
  })
  @IsNotEmpty({ message: 'Product id is required' })
  productId: string;
}
