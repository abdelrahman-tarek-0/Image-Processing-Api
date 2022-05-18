import express from 'express';
import resz from './process';
import fs from 'fs';
const app = express();
const port = 4000;

// use express.static to serve the image on the localhost
app.use(express.static(`${__dirname}/../assets/thumb`));
app.listen(port, () => {
    console.log(`server is running on localhost:${port}`);
});
// main page endboint
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('hi!!');
});

// api image endboint
app.get(
    '/api/image',
    async (req: express.Request, res: express.Response) => {
        // geting the query inputs
        const name = req.query.name as string;
        const height = Number(req.query.height as string); // turning the string that came from req.query into a number
        const width = Number(req.query.width as string);

        // checking for the existence of the original image in assets/full
        if (
            fs.existsSync(`${__dirname}/../assets/full/${name}.jpg`)
        ) {
            // checking for the validation of the width and height
            if (
                width >= 3000 ||
                height >= 3000 ||
                width <= 0 ||
                height <= 0 ||
                isNaN(width) ||
                isNaN(height) ||
                !Number.isInteger(width) ||
                !Number.isInteger(height)
            ) {
                res.status(404);
                res.send('invalid width or hight');
            } else {
                if (
                    // checking for the existence of the processed image
                    fs.existsSync(
                        `${__dirname}/../assets/thumb/${name}_${width}Wx${height}H.jpg.jpg`,
                    )
                ) {
                    // if yes just send the src
                    res.send(
                        `<img src="http://localhost:${port}/${name}_${width}Wx${height}H.jpg">`,
                    );
                } else {
                    // if not then process and send the src
                    await resz(name, width, height);
                    res.send(
                        `<img src="http://localhost:${port}/${name}_${width}Wx${height}H.jpg">`,
                    );
                }
            }
        } else {
            // if the original image was not found then tell the user
            res.status(404);
            res.send(`image not found`);
        }
    },
);

export default app;
