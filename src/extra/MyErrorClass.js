export default class NewError {
  constructor(_message, _code, _details, _advice = false) {
    this.message = _message;
    this.code = _code;
    this.details = _details;
    this.advice = _advice;
  }
  //getter
  get formatted() {
    return {
      message: this.message,
      code: this.code,
      details: this.details,
      advice: this.advice,
    };
  }
}
