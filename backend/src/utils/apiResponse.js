class ApiResponse {
  constructor(statusCode, messageOrData = "success", data = null) {
    this.statusCode = statusCode;
    if (typeof messageOrData === "string") {
      this.message = messageOrData;
      this.data = data;
    } else {
      this.data = messageOrData;
      this.message = typeof data === "string" ? data : "success";
    }
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
