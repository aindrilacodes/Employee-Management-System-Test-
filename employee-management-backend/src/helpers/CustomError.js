class ApiError extends Error {
  constructor(status = 500, message = "Something went wrong") {
    super(message);
    this.message = message;
    this.success = false;
    this.status = status;
  }
}
export default ApiError