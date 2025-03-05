"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const ride_router_1 = __importDefault(require("./routes/ride_router"));
const auth_router_1 = __importDefault(require("./routes/auth_router"));
const user_router_1 = __importDefault(require("./routes/user_router"));
// Configuration for using .env file
dotenv_1.default.config();
// Setting port to PORT in .env or 5000 if port in .env is null
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
// JSON body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Connecting to MongoDB
const mongoUrl = process.env.MONGODB_CONNECTION_URL;
if (!mongoUrl) {
    throw new Error('MONGODB_CONNECTION_URL is not defined in the environment variables');
}
mongoose_1.default.connect(mongoUrl)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});
// Auth router
app.use("/api/auth", auth_router_1.default);
// Ride router
app.use("/api/ride", ride_router_1.default);
// User router
app.use("/api/user", user_router_1.default);
// Listening to PORT
app.listen(PORT, () => console.log(`Server is running in PORT ${PORT}`));
