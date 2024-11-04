export class ErrorHandler {
  static handleError(error: any): never {
    throw new Error(error.message || 'An unexpected error occurred');
  }
}
