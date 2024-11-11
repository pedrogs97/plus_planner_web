import { MessageType } from "@/utils/enums";

export interface IAuthContext {
    signIn: (token: string, refreshToken: string) => void;
    signOut: () => void;
    currentUser: IUser | null;
}

export interface IThemeContext {
    currentTheme: string;
}


export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
    clinicId: string | number;
    clinic: string;
    email: string;
    exp: number;
    fullName: string;
    permissions: object[];
    profile: string;
    profileId: string | number;
    sub: number;
}

export interface IUser {
    id: string | number;
    fullName: string;
    email: string;
    profile: string;
    profileId: string | number;
    clinic: string;
    clinicId: string | number;
    permissions: object[];
    token: string;
    uuid_scheduler: string | null;
}

export interface IMessage {
    messageType: MessageType
    clinicId: number
    data: never
}

export interface IWebsocketContext {
    setSchedulerClientWB: (ws: WebSocket) => void;
    createSchedulerClientWB: () => WebSocket | void;
    schedulerClientWB: WebSocket | null;
}
