import { RequestHandler, Request, Response, response } from "express";
import asyncHandler from "express-async-handler";
import axios from "axios";

import { IInitPayment, IInitPaymentResponse } from "../../domain/models/init-payment";
import { ITransactionHistoryResponse, ITransactionVm } from "../../domain/models/transaction-history";

const getToken = async (): Promise<{ token: string; expires_in: number }> => {
  const response = await axios.post(
    "https://demo.campay.net/api/token/",
    {
      username: `${process.env.CAMPAY_USERNAME}`,
      password: `${process.env.CAMPAY_PASSWORD}`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

const initiateTransaction = async (
  body: IInitPayment
): Promise<{
  reference: string;
  ussd_code: string;
  operator: string;
  initiated: boolean;
}> => {
  const token = await getToken();
  const response = await axios.post(
    "https://demo.campay.net/api/collect/",
    {
      amount: `${body.amount}`,
      currency: "XAF",
      from: `237${body.telephone}`,
      description: "Pay for services",
      external_reference: "",
      external_user: "",
    },
    {
      headers: {
        Authorization: `Token ${token.token}`,
      },
    }
  );

  return {
    ...response.data,
    initiated: response.statusText === "OK" ? true : false,
  };
};

const trackTransaction = async (
  reference: string
): Promise<ITransactionVm> => {
  const token = await getToken();

  const response = await axios.get(
    `https://demo.campay.net/api/transaction/${reference}/`,
    {
      headers: {
        Authorization: `Token ${token.token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

const initiatePayment: RequestHandler = asyncHandler(
  async (req: Request, res: Response<IInitPaymentResponse>) => {
    const { amount, operator, telephone,  address, email, name} = req.body;

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
          data: { ...initiatedResponse } as any,
        });
      }
      res.status(200).json({
        message: "Transaction Initiated!",
        success: true,
        validationErrors: [],
        data: { ...initiatedResponse } as any,
      });
    } catch (error: any) {
      res.status(400).json({
        message: "Transaction failed, please try again!",
        success: false,
        validationErrors: [],
        data: error,
      });
    }
  }
);

const transactionStatus: RequestHandler = asyncHandler(
  async (req: Request, res: Response<IInitPaymentResponse>) => {
    const { reference } = req.params;
    const response = await trackTransaction(reference);

    res.status(200).json({
      message: `Transaction ${response.status}`,
      success: true,
      validationErrors: [],
      data: response as any,
    });
  }
);
 
const getTransactionHistory = async (body: {
  start_date: Date;
  end_date: Date;
}): Promise<
  {
    datetime: Date;
    code: string;
    operator_tx_code: string;
    operator: string;
    phone_number: string;
    description: string;
    external_user: string;
    amount: number;
    charge_amount: number;
    debit: number;
    credit: number;
    status: string;
    reference_uuid: string;
  }[]
> => {
  const token = await getToken();
  const response = await axios.post(
    "https://demo.campay.net/api/history/",
    body,
    {
      headers: {
        Authorization: `Token ${token.token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
const getTransactions: RequestHandler = asyncHandler(
  async (req: Request, res: Response<ITransactionHistoryResponse>) => {
    const { start_date, end_date } = req.body;

    const response = await getTransactionHistory({ start_date, end_date });
    res.status(200).json({
      message: `Transaction Successful!`,
      success: true,
      validationErrors: [],
      data: response as any,
    });
  }
);

export { initiatePayment, getTransactions, transactionStatus };
