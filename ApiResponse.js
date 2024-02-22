class ApiResponse {
    constructor(statusCode, data, msg) {
        this.statusCode = statusCode,
            this.data = data,
            this.msg = msg
    }
}

module.exports = { ApiResponse }