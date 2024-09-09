import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UploadService {
  constructor(
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async uploadProfile(userEmail: string, filePath: string) {
    const user = await this.userService.findUserByEmail(userEmail);

    await this.unlink(user.image);
    await this.userService.uploadProfile(user['_id'], filePath);
  }

  async productUpload(productId: string, filePath: string) {
    await this.productService.addToImages(productId, filePath);
  }

  async productRemoveUpload(productId: string, filePath: string) {
    await this.productService.removeFromImages(productId, filePath);
    return true;
  }

  async unlink(image: string, folder = 'users') {
    if (image) {
      const filePath = path.join(
        'public',
        folder,
        image?.split('/').pop() || '',
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }
}
