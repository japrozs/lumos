import { UserInput } from "../schemas/user-input";

export const validateRegister = (options: UserInput) => {
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ];
    }

    if (options.password.length <= 6) {
        return [
            {
                field: "password",
                message: "length must be greater than 6",
            },
        ];
    }

    return null;
};
