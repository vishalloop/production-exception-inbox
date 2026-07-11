import { config as configg } from "dotenv";
import type { IConfig } from "../types/config.types.js";
import { ApiError } from "../utils/api-error.js";

configg();

const required = (key: string) : string => {
    const value = process.env[key];

    if(!value){
        throw new ApiError(`${key} is not found` , 500);
    };

    return value;
};

export const config : IConfig = {
    PORT : Number(required("PORT")),
    NODE_ENVIROMENT : required("NODE_ENVIROMENT"),
    DATABASE_URL : required("DATABASE_URL")
}