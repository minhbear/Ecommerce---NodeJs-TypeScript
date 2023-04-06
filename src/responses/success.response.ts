import { ReasonPhrases, StatusCode } from "@utils/httpStatusCode";
import { Response } from "express";

export class SuccessResponse {
    private message: string;
    private status: number;
    private metdata: {};
    
    constructor({
        message,
        statusCode = StatusCode.OK,
        reasonStatusCode = ReasonPhrases.OK,
        metadata = {},
    }) {
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode,
        this.metdata = metadata; 
    }

    send(res: Response, header = {}) {
        return res.header(header).status(this.status).json(this);
    }
}