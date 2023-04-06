import { ReasonPhrases, StatusCode } from "@utils/httpStatusCode";
import { SuccessResponse } from "./success.response";

export class Created extends SuccessResponse {
    public options: string;

    constructor({
        message,
        statusCode = StatusCode.CREATED,
        reasonStatusCode = ReasonPhrases.CREATED,
        metadata,
    }) {
        super({ message, statusCode, reasonStatusCode, metadata });
    }
}