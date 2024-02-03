"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (options) => {
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
exports.validateRegister = validateRegister;
//# sourceMappingURL=validate-register.js.map