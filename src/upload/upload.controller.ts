// src/upload/upload.controller.ts

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Param,
  Delete,
  Req,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  private async compressAndResizeImage(filePath: string): Promise<void> {
    const maxWidth = 800; // Max width for resizing
    const maxHeight = 800; // Max height for resizing
    const compressedPath = filePath.replace(/(\.[\w\d_-]+)$/i, '-compressed$1');

    await sharp(filePath)
      .resize({ width: maxWidth, height: maxHeight, fit: 'inside' }) // Auto-resize to fit within max dimensions
      .toFormat('jpeg') // Convert to JPEG format
      .jpeg({ quality: 80 }) // Set quality level (0-100)
      .toFile(compressedPath);

    fs.unlinkSync(filePath); // Delete the original file
    fs.renameSync(compressedPath, filePath); // Rename compressed file to original filename
  }

  @Post('user-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/users',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `user-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // Set file size limit
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new Error('Only image files are allowed!'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async uploadUserImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const userEmail = req['user'].email;

    // Compress and resize the image after upload
    await this.compressAndResizeImage(
      path.join('public', 'users', file.filename),
    );

    this.uploadService.uploadProfile(userEmail, `/users/${file.filename}`);

    return {
      message: 'User image uploaded, resized, and compressed successfully',
      filePath: `/users/${file.filename}`,
    };
  }

  @Post('product-image/:productId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/products',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `product-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // Set file size limit
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new Error('Only image files are allowed!'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('productId') productId: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Compress and resize the image after upload
    await this.compressAndResizeImage(
      path.join('public', 'products', file.filename),
    );
    const filePath = `/products/${file.filename}`;
    this.uploadService.productUpload(productId, filePath);

    return {
      message: 'Product image uploaded, resized, and compressed successfully',
      filePath: filePath,
    };
  }

  @Delete('product-image/:productId')
  removeFromImages(
    @Param('productId') productId: string,
    @Body('path') path: string,
  ) {
    return this.uploadService.productRemoveUpload(productId, path);
  }
}
