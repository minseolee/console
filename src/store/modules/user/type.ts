type UserType = 'USER' | 'DOMAIN_OWNER';

export interface UserState {
    userId?: string;
    userType?: UserType;
    name?: string;
    email?: string;
    mobile?: string;
    group?: string;
    language?: string;
    timezone?: string;
    reportState?: boolean;
}

export interface SignInRequest {
    domain_id: string;
    credentials: any;
}

export interface UpdateUserRequest {
    name?: string;
    password?: string;
    email?: string;
    mobile?: string;
    group?: string;
    language?: string;
    timezone?: string;
    tags?: Record<string, any>;
}
