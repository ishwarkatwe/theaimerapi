import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class BaseHandlerService {
  handleError(error: any): never {
    if (error.name === 'CastError' || error.name === 'ValidationError') {
      throw new BadRequestException('Invalid ID or data format');
    } else if (error.status === 404) {
      throw new NotFoundException(error.response.message);
    }

    throw new InternalServerErrorException(
      'Something went wrong with the database operation',
    );
  }
}
