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
const process_1 = __importDefault(require("./process"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 4000;
// use express.static to serve the image on the localhost
app.use(express_1.default.static(`${__dirname}/../assets/thumb`));
app.listen(port, () => {
    console.log(`server is running on localhost:${port}`);
});
// main page endboint
app.get('/', (req, res) => {
    res.send('hi!!');
});
// api image endboint
app.get('/api/image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // geting the query inputs
    const name = req.query.name;
    const height = Number(req.query.height); // turning the string that came from req.query into a number
    const width = Number(req.query.width);
    // checking for the existence of the original image in assets/full
    if (fs_1.default.existsSync(`${__dirname}/../assets/full/${name}.jpg`)) {
        // checking for the validation of the width and height
        if (width >= 3000 ||
            height >= 3000 ||
            width <= 0 ||
            height <= 0 ||
            isNaN(width) ||
            isNaN(height) ||
            !Number.isInteger(width) ||
            !Number.isInteger(height)) {
            res.status(404);
            res.send('invalid width or hight');
        }
        else {
            if (
            // checking for the existence of the processed image
            fs_1.default.existsSync(`${__dirname}/../assets/thumb/${name}_${width}Wx${height}H.jpg.jpg`)) {
                // if yes just send the src
                res.send(`<img src="http://localhost:${port}/${name}_${width}Wx${height}H.jpg">`);
            }
            else {
                // if not then process and send the src
                yield (0, process_1.default)(name, width, height);
                res.send(`<img src="http://localhost:${port}/${name}_${width}Wx${height}H.jpg">`);
            }
        }
    }
    else {
        // if the original image was not found then tell the user
        res.status(404);
        res.send(`image not found`);
    }
}));
exports.default = app;
