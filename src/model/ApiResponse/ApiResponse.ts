export default interface  ApiResponse<T> {
    code: string;
    message: string;
    body: T;
}