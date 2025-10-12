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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const route_1 = require("./routes/route");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', route_1.router);
const PORT = process.env.PORT;
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const connected = yield mongoose_1.default.connect(process.env.MONGODB_URL);
    try {
        if (connected) {
            console.log("connected to db");
        }
    }
    catch (error) {
        console.log("error in db connection");
        console.log(error);
    }
});
dbConnect();
app.get('/', (req, res) => {
    res.json({
        msg: "testing / route using cicd"
    });
});
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
