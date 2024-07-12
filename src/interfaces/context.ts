export interface IAuthContext {
    signIn: (token: string, refreshToken: string) => void;
    currentUser: IUser | null;
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
}