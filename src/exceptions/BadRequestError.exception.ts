import { HttpException } from "./HttpException";
import { StatusCode, ReasonPhrases } from "@/utils/httpStatusCode";

export class BadRequestErrorException extends HttpException{
    constructor({ status = StatusCode.BAD_REQUEST, message = ReasonPhrases.BAD_REQUEST}) {
        super(status, message);
    }
}