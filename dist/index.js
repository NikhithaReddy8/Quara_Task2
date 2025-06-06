"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const member_routes_1 = __importDefault(require("./routes/member.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Welcome to the Member Management API. Visit /members');
});
app.use('/members', member_routes_1.default);
async function start() {
    try {
        await db_1.default.sync();
        console.log('Database synced');
        app.listen(3000, () => {
            console.log('Server is running http://localhost:3000');
        });
    }
    catch (err) {
        console.error('Error starting server:', err);
    }
}
start();
