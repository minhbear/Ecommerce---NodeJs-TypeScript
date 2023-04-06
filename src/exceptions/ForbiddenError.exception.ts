import { HttpException } from "./HttpException";
import { StatusCode, ReasonPhrases } from "@/utils/httpStatusCode";

export class ForBiddenException extends HttpException{
    constructor({ status = StatusCode.FORBIDDEN, message = ReasonPhrases.FORBIDDEN }) {
        super(status, message);
    }  
}