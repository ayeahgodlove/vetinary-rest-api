"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionStatus = exports.getTransactions = exports.initiatePayment = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const axios_1 = __importDefault(require("axios"));
const getToken = async () => {
    const response = await axios_1.default.post("https://demo.campay.net/api/token/", {
        username: `${process.env.CAMPAY_USERNAME}`,
        password: `${process.env.CAMPAY_PASSWORD}`,
    }, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
const initiateTransaction = async (body) => {
    const token = await getToken();
    const response = await axios_1.default.post("https://demo.campay.net/api/collect/", {
        amount: `${body.amount}`,
        currency: "XAF",
        from: `237${body.telephone}`,
        description: "Pay for services",
        external_reference: "",
        external_user: "",
    }, {
        headers: {
            Authorization: `Token ${token.token}`,
        },
    });
    return {
        ...response.data,
        initiated: response.statusText === "OK" ? true : false,
    };
};
const trackTransaction = async (reference) => {
    const token = await getToken();
    const response = await axios_1.default.get(`https://demo.campay.net/api/transaction/${reference}/`, {
        headers: {
            Authorization: `Token ${token.token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
const initiatePayment = (0, express_async_handler_1.default)(async (req, res) => {
    const { amount, operator, telephone, address, email, name } = req.body;
    try {
        const initiatedResponse = await initiateTransaction({
            amount,
            operator,
            telephone,
            address,
            email,
            name
        });
        if (!initiatedResponse.initiated) {
            res.status(400).json({
                message: "Transaction failed, please try again!",
                success: false,
                validationErrors: [],
                data: { ...initiatedResponse },
            });
        }
        res.status(200).json({
            message: "Transaction Initiated!",
            success: true,
            validationErrors: [],
            data: { ...initiatedResponse },
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Transaction failed, please try again!",
            success: false,
            validationErrors: [],
            data: error,
        });
    }
});
exports.initiatePayment = initiatePayment;
const transactionStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const { reference } = req.params;
    const response = await trackTransaction(reference);
    res.status(200).json({
        message: `Transaction ${response.status}`,
        success: true,
        validationErrors: [],
        data: response,
    });
});
exports.transactionStatus = transactionStatus;
const getTransactionHistory = async (body) => {
    const token = await getToken();
    const response = await axios_1.default.post("https://demo.campay.net/api/history/", body, {
        headers: {
            Authorization: `Token ${token.token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
const getTransactions = (0, express_async_handler_1.default)(async (req, res) => {
    const { start_date, end_date } = req.body;
    const response = await getTransactionHistory({ start_date, end_date });
    res.status(200).json({
        message: `Transaction Successful!`,
        success: true,
        validationErrors: [],
        data: response,
    });
});
exports.getTransactions = getTransactions;
