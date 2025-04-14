export interface User {
    username: string;
    token: string;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface RegisterForm extends LoginForm {}
