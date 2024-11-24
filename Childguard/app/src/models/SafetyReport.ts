export interface SafetyReport {
    id?: string,
    description: string,
    reportDate?: Date,
    isCompleted?: boolean,
    title: string,
    address: string,
    state: string,
    city: string,
    comments?: string
}   