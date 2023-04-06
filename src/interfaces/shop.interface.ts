import { Types } from "mongoose";

export interface Shop {
    _id: string;
    name: string;
    email: string;
    password: string,
    status: string,
    verify: boolean,
    roles: Types.Array<string>
}