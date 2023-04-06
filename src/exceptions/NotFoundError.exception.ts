import { HttpException } from "./HttpException";
import { StatusCode, ReasonPhrases } from "@/utils/httpStatusCode";

export class NotFoundErrorException extends HttpException{
    constructor({ status = StatusCode.NOT_FOUND, message =ReasonPhrases.NOT_FOUND }) {
        super(status, message);
    }
}