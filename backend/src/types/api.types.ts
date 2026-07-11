export interface ApiResponse<T = void> {
    success : boolean;
    message : string;
    data? : T;
    error? : object;
};

export interface customError extends Error {
    statusCode? : number;
}