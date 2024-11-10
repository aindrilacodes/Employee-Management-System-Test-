class successResponse{
    constructor(message,data={}){
        this.success=true,
        this.message=message,
        this.data=data
    }
}
class errorResponse{
    constructor(message,data={}){
        this.success=false,
        this.message=message
    }
}

export {successResponse,errorResponse}