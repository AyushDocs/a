import { ApiResponse } from "./ApiResponse";

export interface AuthResponse extends ApiResponse {
    role: string
}