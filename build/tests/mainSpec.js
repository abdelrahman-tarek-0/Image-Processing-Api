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
const supertest_1 = __importDefault(require("supertest"));
const main_1 = __importDefault(require("../main"));
const request = (0, supertest_1.default)(main_1.default);
describe('Test endpoint responses', () => {
    it('gets the main page endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
    it('check if no name or dimensions were entered', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image');
        expect(response.status).toBe(404);
    }));
});
describe('image testing query inputs', () => {
    it('test the image process if everything is ok', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image/?name=image&width=300&height=300');
        expect(response.status).toBe(200);
    }));
    it('check if the input image is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image/?name=someText&width=300&height=300');
        expect(response.status).toBe(404);
    }));
    it('test float number to check for the width', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image/?name=image&width=5.5&height=300');
        expect(response.status).toBe(404);
    }));
    it('test float number to check for the height', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image/?name=image&width=300&height=5.5');
        expect(response.status).toBe(404);
    }));
    it('test negative number to check for the width', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image/?name=image&width=-5&height=300');
        expect(response.status).toBe(404);
    }));
    it('test negative number to check for the height', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image/?name=image&width=300&height=-5');
        expect(response.status).toBe(404);
    }));
});
