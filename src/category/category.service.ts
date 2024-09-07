import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { BaseHandlerService } from 'src/core/base-handler/base-handler.service';

@Injectable()
export class CategoryService extends BaseHandlerService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {
    super();
  }

  create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCat = new this.categoryModel(createCategoryDto);
      return newCat.save();
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(parent = '1') {
    try {
      return await this.categoryModel.find({
        parent: parent,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const cat = await this.categoryModel.findById(id).exec();
      if (!cat) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return cat;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updateCat = await this.categoryModel
        .findByIdAndUpdate(id, updateCategoryDto, {
          new: true,
          runValidators: true,
        })
        .exec();
      if (!updateCat) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return updateCat;
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.categoryModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }
}
