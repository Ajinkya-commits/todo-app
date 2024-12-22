"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoInput = exports.createTodoInput = exports.loginInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6, "password must be of length 6"),
    name: zod_1.default.string().optional(),
});
exports.loginInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6, "Password must be of 6 length"),
});
exports.createTodoInput = zod_1.default.object({
    title: zod_1.default.string().min(1, "Title is required"),
    description: zod_1.default.string(),
    priority: zod_1.default.enum(["High", "Medium", "Low"]),
    userId: zod_1.default.string().regex(/^\d+$/, "userId must be a numeric string"),
});
exports.updateTodoInput = zod_1.default.object({
    title: zod_1.default.string().min(1, "Title cannot be empty").optional(),
    description: zod_1.default.string().optional(),
    priority: zod_1.default.enum(["High", "Medium", "Low"]).optional(),
    completed: zod_1.default.boolean().default(false).optional(),
});
