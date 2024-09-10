import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FirebaseService {
  private bucket;

  constructor(private configService: ConfigService) {
    // Initialize Firebase Admin SDK with service account credentials
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
        privateKey: this.configService
          .get<string>('FIREBASE_PRIVATE_KEY')
          .replace(/\\n/g, '\n'), // Ensure newlines in the private key are handled correctly
        clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      }),
      storageBucket: this.configService.get<string>('FIREBASE_STORAGE_BUCKET'),
    });

    this.bucket = admin.storage().bucket();
  }

  // Upload image to Firebase Storage
  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const fileName = `${folder}/${uuidv4()}-${file.originalname}`;
    const fileUpload = this.bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        reject(`Unable to upload file, something went wrong: ${error.message}`);
      });

      blobStream.on('finish', async () => {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${this.bucket.name}/o/${encodeURIComponent(
          fileName,
        )}?alt=media`;
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });
  }

  // Delete the file from Firebase Storage by URL
  async deleteFileByUrl(fileUrl: string): Promise<void> {
    const filePath = this.getFilePathFromUrl(fileUrl); // Extract the file path from the URL
    const file = this.bucket.file(filePath);

    try {
      await file.delete();
      console.log(`Successfully deleted image: ${filePath}`);
    } catch (error) {
      console.error(
        `Failed to delete image: ${filePath}. Error: ${error.message}`,
      );
    }
  }

  // Extract file path from Firebase public URL
  private getFilePathFromUrl(url: string): string {
    const storageBucketName = this.configService.get<string>(
      'FIREBASE_STORAGE_BUCKET',
    );
    const regex = new RegExp(
      `https://firebasestorage.googleapis.com/v0/b/${storageBucketName}/o/(.*)\\?alt=media`,
    );
    const match = url.match(regex);
    return match ? decodeURIComponent(match[1]) : '';
  }
}
