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
const sharp_1 = __importDefault(require("sharp"));
// resz function that take 3 parameters for processing the image
const resz = (fileName, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`${__dirname}/../assets/full/${fileName}.jpg`)
            .resize(width, height)
            .toFile(`${__dirname}/../assets/thumb/${fileName}_${width}Wx${height}H.jpg`);
        return 'done'; // if everything is ok this async function will return done     Note this for testing part
    }
    catch (err) {
        return 'error'; // if there is error will return error    Note this for testing part
    }
});
exports.default = resz;
