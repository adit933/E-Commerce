class ApiError extends Error{
    constructor(
        statusCode,
        message = "Request Failed",
        error = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.data = null,
        this.success = false,
        this.error = error
        this.stack = stack


        if(stack)
        {
            this.stack = stack
        }
        else
        {
            Error.captureStackTrace(this , this.constructor)
        }
    }
}


export { ApiError }