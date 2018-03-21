export default class ErrorCanvas extends Error {

  constructor() {
    super('More than 1 canvas');
  }
}
