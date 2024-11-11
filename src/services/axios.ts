import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { IFailedRequestProps, IBackendResponseProps } from "@/interfaces/axios";

let isRefreshing = false;

const failedRequestQueue: Array<IFailedRequestProps> = [];

export const apiAuthenticator = axios.create({
    baseURL: (import.meta.env.VITE_PLUS_AUTHENTICATOR_BASE_URL),
    responseType: 'json'
})

export const apiCore = axios.create({
    baseURL: (import.meta.env.VITE_PLUS_CORE_BASE_URL),
    responseType: 'json'
})

function interceptorRequest (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = localStorage.getItem('accessToken')

    if (config && config.headers) {
        config.headers.Authorization = token ? `Bearer ${token}` : ''
    }

    return config
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function interceptorsResponse (response: AxiosResponse<any, any>): Promise<AxiosResponse<any, any>> {
    return Promise.resolve(response);
}

apiAuthenticator.interceptors.request.use(interceptorRequest)
apiCore.interceptors.request.use(interceptorRequest)

function applyInterceptorsResponse (apiInstance: AxiosInstance) {
    // declare rejeceted function by instance
    function interceptorsResponseRejected (error: AxiosError<unknown>): Promise<AxiosError<unknown>> {
        const { status, data } = (error.response as IBackendResponseProps)
        if (status === 401 && data !== "Credenciais Inválidas") {
            const originalConfig = error.config;
            const refreshToken = localStorage.getItem("refreshToken")
            if (!refreshToken || data === "Token de atualização inválido") {
                localStorage.clear()
                window.location.href = '/login'
                return Promise.reject(data)
            }
            if (refreshToken && typeof data === 'object' && data.message === "Não foi possível validar as credenciais" && !isRefreshing) {
                isRefreshing = true
                apiAuthenticator.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`
                apiAuthenticator.post('refresh-token/')
                .then((response) => {
                    const { accessToken, refreshToken } = response.data as { accessToken: string, refreshToken: string }
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    while (failedRequestQueue.length) {
                        const failedRequest = failedRequestQueue.shift()
                        failedRequest?.onSuccess(accessToken)
                    }
                })
                .catch((err) => {
                    while (failedRequestQueue.length) {
                        const failedRequest = failedRequestQueue.shift()
                        failedRequest?.onFailure(err)
                    }
                    localStorage.clear()
                    window.location.href = '/login'
                })
                .finally(() => {
                    isRefreshing = false
                })
            }
    
            return new Promise((resolve, reject) => {
                failedRequestQueue.push({
                  onSuccess: (token: string) => {
                    if (originalConfig) {
                        originalConfig.headers["Authorization"] = `Bearer ${token}`;
                        resolve(apiInstance(originalConfig));
                    }
                  },
                  onFailure: (err: AxiosError) => {
                    reject(err);
                  },
                });
              });
        }
    
        return Promise.reject(data)
    }

    apiInstance.interceptors.response.use(interceptorsResponse, interceptorsResponseRejected)
}

applyInterceptorsResponse(apiAuthenticator)
applyInterceptorsResponse(apiCore)