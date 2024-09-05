// src/product/dto/pagination-query.dto.ts
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string; // Search query string

  @IsOptional()
  @IsString()
  sortBy?: string = 'name'; // Field to sort by (default: name)

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'asc'; // Sort order (default: ascending)

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number = 0; // Skip offset (default: 0)

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10; // Limit results (default: 10)
}
