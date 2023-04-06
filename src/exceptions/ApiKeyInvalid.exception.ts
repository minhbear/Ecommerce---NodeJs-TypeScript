import { HttpException } from "./HttpException";
import { StatusCode, ReasonPhrases } from "@/utils/httpStatusCode";

export class ApiKeyInvalidException extends HttpException{
    constructor() {
        super(StatusCode.FORBIDDEN, ReasonPhrases.FORBIDDEN);
    }
}