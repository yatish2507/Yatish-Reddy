export interface LoginFormFields {
    email: string;
    password: string;
}

export interface LoginFormErrors {
    email: string;
    password: string;
}

export interface UpdateFieldPayload {
    field: keyof LoginFormFields;
    value: LoginFormFields[keyof LoginFormFields];
}