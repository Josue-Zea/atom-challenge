export interface ApiResponse {
    status: number;
    message: string;
}

export interface SuccessResponse<T> extends ApiResponse {
    data: T;
}
