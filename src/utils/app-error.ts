/**
 * Lidar com os erros no Backend
 */
export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || 500;

    this.name = "AppError";

    Error.captureStackTrace(this, this.constructor);
  }
}