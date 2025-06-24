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
exports.getAllUsers = exports.updateUser = exports.getUserById = exports.logout = exports.login = exports.signUp = void 0;
const userSchema_1 = require("../models/userSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const balanceSchema_1 = require("../models/balanceSchema");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        res.status(400).json({ message: "Invalid or missing details" });
        return;
    }
    try {
        const existingUser = yield userSchema_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email already registered" });
            return;
        }
        const newUser = yield userSchema_1.User.create({
            firstName,
            lastName,
            email,
            password
        });
        const account = yield balanceSchema_1.Account.create({
            userId: newUser._id,
            balance: Math.floor(Math.random() * 10000),
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, "secret", {
            expiresIn: "2h"
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.status(201).json({
            message: "New user created",
            token,
            user: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            },
            account
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error during sign-up" });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({
            message: "Invalid or missing details"
        });
        return;
    }
    const existingUser = yield userSchema_1.User.findOne({
        email: email
    });
    if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.password) == password) {
        const token = jsonwebtoken_1.default.sign({ id: existingUser === null || existingUser === void 0 ? void 0 : existingUser._id }, "secret", { expiresIn: '2h' });
        res.cookie('token', token);
        res.json({
            message: "Logged In",
            token: token,
            firstName: existingUser === null || existingUser === void 0 ? void 0 : existingUser.firstName,
            lastName: existingUser === null || existingUser === void 0 ? void 0 : existingUser.lastName,
            email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email,
        });
        return;
    }
    else {
        res.json({
            message: "Cannot find the user please signUp"
        });
    }
    return;
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
    });
    res.json({
        message: "logged out"
    });
    return;
});
exports.logout = logout;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const user = yield userSchema_1.User.findOne({
        _id: id
    });
    const balance = yield balanceSchema_1.Account.findOne({
        userId: id
    });
    if (user) {
        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            balance
        });
        return;
    }
    else {
        res.status(400).json({
            message: "user not found"
        });
        return;
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const id = req.user.id;
    const { firstName, lastName, email } = req.body;
    const user = yield userSchema_1.User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        email,
    }, { new: true });
    if (user) {
        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
        return;
    }
    else {
        res.status(400).json({
            message: "user not found"
        });
        return;
    }
});
exports.updateUser = updateUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
        res.status(401).json({ message: "Unauthorized, Token Needed" });
        return;
    }
    const id = req.user.id;
    try {
        const currentUser = yield userSchema_1.User.findById(id);
        if (!currentUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // 2. Find all users except the current user
        const allUsers = yield userSchema_1.User.find({ _id: { $ne: id } });
        res.status(200).json({ users: allUsers });
        return;
    }
    catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllUsers = getAllUsers;
