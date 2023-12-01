"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyTransactionHistory = void 0;
var STATUS;
(function (STATUS) {
    STATUS[STATUS["PENDING"] = 0] = "PENDING";
    STATUS[STATUS["SUCCESSFUL"] = 1] = "SUCCESSFUL";
    STATUS[STATUS["FAILED"] = 2] = "FAILED";
})(STATUS || (STATUS = {}));
exports.emptyTransactionHistory = {
    datetime: new Date(),
    code: "",
    operator_tx_code: "",
    operator: "",
    phone_number: "",
    description: "",
    external_user: "",
    amount: 0,
    charge_amount: 0,
    debit: 0,
    credit: 0,
    status: "",
    reference_uuid: "",
};
