import { StatusCode } from "@/utils/httpStatusCode";
import { HttpException } from "./HttpException";

export class PermissionInvalidException extends HttpException{
    constructor() {
        super(StatusCode.FORBIDDEN, "Permission denied")
    }
}