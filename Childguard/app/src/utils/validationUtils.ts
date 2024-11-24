
export const validateEmail = (email: string): string => {
    if (!email.trim()) return "This field is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email address";
    return "";
};

export const validateRequired = (value: string): string => value.trim() != "" ? "" : "This field is required";
