export interface User {
    id?: string,
    fullname: string,
    username: string,
    email: string,
    password: string,
    userrole: UserRole
}

export enum UserRole {
    User = 'USER',
    Admin = 'ADMIN',
}