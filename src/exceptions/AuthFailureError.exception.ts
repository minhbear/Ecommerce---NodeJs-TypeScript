import { HttpException } from "./HttpException";
import { StatusCode, ReasonPhrases } from "@/utils/httpStatusCode";

export class AuthFailureErrorException extends HttpException{
    constructor({ status = StatusCode.UNAUTHORIZED, message = ReasonPhrases.UNAUTHORIZED}) {
        super(status, message);
    }
}