import { AxiosError } from "axios";

export interface IFailedRequestProps {
    onSuccess: (token: string) => void,
    onFailure: (error: AxiosError) => void
}

export interface IBackendResponseProps {
    data: string | { message: string }
    status: number
}