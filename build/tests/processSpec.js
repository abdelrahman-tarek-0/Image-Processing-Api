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
const process_1 = __importDefault(require("../process"));
describe('testing for the image process', () => {
    it('test for processing image', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, process_1.default)('image', 300, 300)).toBe('done');
    }));
    it('expect to fail for not finding the image', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, process_1.default)('randomText', 300, 300)).toBe('error');
    }));
});
describe('testing for the validation of dimensions', () => {
    it('test  negative numbers for the width', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, process_1.default)('image', -2, 300)).toBe('error');
    }));
    it('test  negative numbers for the height', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, process_1.default)('image', 300, -2)).toBe('error');
    }));
    it('test zero for the width', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, process_1.default)('image', 0, 300)).toBe('error');
    }));
    it('test zero for the height', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, process_1.default)('image', 300, 0)).toBe('error');
    }));
    it('test float for the width', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, process_1.default)('image', 5.5, 300)).toBe('error');
    }));
    it('test float for the height', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, process_1.default)('image', 300, 5.5)).toBe('error');
    }));
});
