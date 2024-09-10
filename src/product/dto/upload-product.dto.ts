import { IsNotEmpty, IsOptional } from 'class-validator';

export class UploadProductDto {
  @IsNotEmpty({ message: 'Product id is required' })
  productId: string;
}

export class RemoveProductDto {
  @IsNotEmpty({ message: 'Product image to remove is required' })
  url: string;

  @IsNotEmpty({ message: 'Product id is required' })
  productId: string;
}
