import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import {
  CategoryPopulate,
  LikedbyPopulate,
  SellerPopulate,
  WishlistPopulate,
} from 'src/common/querys/populates';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<{ data: Product[]; total: number }> {
    const { limit, offset, sortBy, sortOrder, search } = paginationQuery;

    const filter = search
      ? { name: { $regex: search, $options: 'i' } } // Search by name (case-insensitive)
      : {};

    const total = await this.productModel.countDocuments(filter).exec();
    const products = await this.productModel
      .find(filter)
      .populate(SellerPopulate)
      .populate(LikedbyPopulate)
      .populate(WishlistPopulate)
      .populate(CategoryPopulate)
      .sort({ [sortBy]: sortOrder || 'asc' })
      .skip(offset)
      .limit(limit)
      .exec();

    return { data: products, total };
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate(SellerPopulate)
      .populate(LikedbyPopulate)
      .populate(WishlistPopulate)
      .populate(CategoryPopulate)
      .exec();

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async addLike(productId: string, userId: string): Promise<Product> {
    const product = await this.productModel
      .findByIdAndUpdate(
        productId,
        { $addToSet: { likes: userId } },
        { new: true },
      )
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }

  async remove(id: string) {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return result;
  }

  async addToLikes(productId: string, userId: string): Promise<Product> {
    const product = this.productModel
      .findByIdAndUpdate(
        productId,
        { $addToSet: { likedBy: userId } }, // addToSet ensures no duplicates
        { new: true },
      )
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }

  async removeFromLikes(productId: string, userId: string): Promise<Product> {
    const product = await this.productModel
      .findByIdAndUpdate(
        productId,
        { $pull: { likedBy: userId } },
        { new: true },
      )
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }

  async addToWishList(productId: string, userId: string): Promise<Product> {
    const product = this.productModel
      .findByIdAndUpdate(
        productId,
        { $addToSet: { wishlist: userId } }, // addToSet ensures no duplicates
        { new: true },
      )
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }

  async removeFromWishList(
    productId: string,
    userId: string,
  ): Promise<Product> {
    const product = await this.productModel
      .findByIdAndUpdate(
        productId,
        { $pull: { wishlist: userId } },
        { new: true },
      )
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }
}
