"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayValidationErrors = void 0;
const displayValidationErrors = (validationErrors) => {
    if (validationErrors && validationErrors.length > 0) {
        const errors = validationErrors.map((v, i) => {
            return {
                property: v.property,
                constrains: [
                    ...iterateConstrains(v.constraints)
                ]
            };
        });
        return errors;
    }
};
exports.displayValidationErrors = displayValidationErrors;
function iterateConstrains(constrains) {
    const arr = [];
    if (constrains !== null) {
        for (let key in constrains) {
            arr.push(constrains[key]);
        }
    }
    return arr;
}
