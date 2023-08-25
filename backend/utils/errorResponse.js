class ErrorResponse extends Error{
    constructor(message, codeStatus){
        super(message);//what is error  super method is used to call the parent constructor
        this.codeStatus = codeStatus;//status of code
    }
}
module.exports = ErrorResponse;