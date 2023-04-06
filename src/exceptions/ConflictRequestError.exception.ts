import { HttpException } from "./HttpException";
import { StatusCode, ReasonPhrases } from "@/utils/httpStatusCode";

export class ConfilctRequestErrorException extends HttpException{
    constructor() {
        super(StatusCode.CONFLICT, ReasonPhrases.CONFLICT);
    }
}