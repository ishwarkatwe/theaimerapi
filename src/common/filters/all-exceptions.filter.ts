import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = 'Internal server error';

    console.log(exception);

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const responseMessage = exception.getResponse();
      errorMessage =
        typeof responseMessage === 'string'
          ? responseMessage
          : this.formatValidationErrors(responseMessage);
    } else if (exception instanceof MongoError) {
      statusCode = HttpStatus.BAD_REQUEST;
      errorMessage = this.handleMongoError(exception);
    }

    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: errorMessage,
    });
  }

  private handleMongoError(exception: MongoError): string {
    console.log(exception);
    switch (exception.code) {
      case 11000:
        return 'Duplicate key error';
      default:
        return 'Database error';
    }
  }

  private formatValidationErrors(responseMessage: any): string {
    if (responseMessage.message && Array.isArray(responseMessage.message)) {
      return responseMessage.message.join(', ');
    }
    return responseMessage;
  }
}
