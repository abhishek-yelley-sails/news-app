class NotFoundError {
  message: string;
  status: number;
  constructor(message: string) {
    this.message = message;
    this.status = 404;
  }
}

class NotAuthError {
  message: string;
  status: number;
  constructor(message: string) {
    this.message = message;
    this.status = 401;
  }
}

class MissingData {
  message: string;
  status: number;
  constructor(message: string) {
    this.message = message;
    this.status = 422;
  }
}

class InvalidEditRequest {
  message: string;
  status: number;
  constructor(message: string) {
    this.message = message;
    this.status = 401;
  }
}

export function errorBuilder(message: string, errors: { [key: string]: string }) {
  return {
    error: true,
    message,
    errors,
  }
}

export { NotFoundError, NotAuthError, MissingData, InvalidEditRequest };