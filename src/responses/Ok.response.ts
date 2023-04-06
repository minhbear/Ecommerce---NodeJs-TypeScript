import { ReasonPhrases, StatusCode } from "@utils/httpStatusCode";
import { SuccessResponse } from "./success.response";

export class OK extends SuccessResponse {
    public options: string;

    constructor({
        message = ReasonPhrases.OK,
        metadata,
    }) {
        super({ message, metadata });
    }
}