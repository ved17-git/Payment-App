"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserBalance = exports.transferFunds = void 0;
const balanceSchema_1 = require("../models/balanceSchema");
const userSchema_1 = require("../models/userSchema");
const mongoose_1 = __importDefault(require("mongoose"));
const transferFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    //Better way when doing a payment transfer=>multiple operations either all succeed or all fail — this is called atomicity.
    const { amount, email } = req.body;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        yield session.commitTransaction();
        const sender = yield balanceSchema_1.Account.findOne({
            userId: id
        });
        if (!sender) {
            yield session.abortTransaction();
            res.status(400).json({
                message: "Sender not found"
            });
            return;
        }
        if (sender.balance < amount) {
            yield session.abortTransaction();
            res.status(400).json({
                message: "Insuffucient balance"
            });
            return;
        }
        yield session.commitTransaction();
        const reciever = yield userSchema_1.User.findOne({
            email: email
        });
        if (!reciever) {
            yield session.abortTransaction();
            res.status(400).json({
                message: "Reciever not found"
            });
            return;
        }
        yield session.commitTransaction();
        const toAccount = yield balanceSchema_1.Account.findOne({
            userId: reciever._id
        });
        if (!toAccount) {
            yield session.abortTransaction();
            res.status(400).json({
                message: "Reciever Account not found"
            });
            return;
        }
        yield session.commitTransaction();
        yield balanceSchema_1.Account.updateOne({
            _id: sender._id
        }, { $inc: { balance: -amount } });
        yield balanceSchema_1.Account.updateOne({
            _id: toAccount._id
        }, { $inc: { balance: amount } });
        yield session.endSession();
        res.status(200).json({
            message: "Transaction successful",
            senderId: sender.userId,
            receiverId: toAccount.userId,
            amount: amount
        });
    }
    catch (error) {
        console.log("transfer fund error");
        console.log(error);
    }
});
exports.transferFunds = transferFunds;
const getCurrentUserBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const balance = yield balanceSchema_1.Account.findOne({ userId: id });
    if (!balance) {
        res.status(400).json({
            message: "Balance not found"
        });
        return;
    }
    else {
        res.status(200).json({
            message: "Balance Found",
            balance,
        });
        return;
    }
});
exports.getCurrentUserBalance = getCurrentUserBalance;
