import sharp from 'sharp';

// resz function that take 3 parameters for processing the image
const resz = async (
    fileName: string,
    width: number,
    height: number,
) => {
    try {
        await sharp(`${__dirname}/../assets/full/${fileName}.jpg`)
            .resize(width, height)
            .toFile(
                `${__dirname}/../assets/thumb/${fileName}_${width}Wx${height}H.jpg`,
            );
        return 'done'; // if everything is ok this async function will return done     Note this for testing part
    } catch (err) {
        return 'error'; // if there is error will return error    Note this for testing part
    }
};
export default resz;
