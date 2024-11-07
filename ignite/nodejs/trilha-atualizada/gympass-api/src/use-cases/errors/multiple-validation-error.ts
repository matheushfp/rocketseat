export class MultipleValidationError extends Error {
  constructor() {
    super('The Check-in can only be validated one time')
  }
}
