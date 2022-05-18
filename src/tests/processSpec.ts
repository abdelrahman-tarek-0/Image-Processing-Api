import resz from '../process';

describe('testing for the image process', () => {
    it('test for processing image', async () => {
        expect(await resz('image', 300, 300)).toBe('done');
    });
    it('expect to fail for not finding the image', async () => {
        expect(await resz('randomText', 300, 300)).toBe('error');
    });
});
describe('testing for the validation of dimensions', () => {
    it('test  negative numbers for the width', async () => {
        expect(await resz('image', -2, 300)).toBe('error');
    });
    it('test  negative numbers for the height', async () => {
        expect(await resz('image', 300, -2)).toBe('error');
    });
    it('test zero for the width', async () => {
        expect(await resz('image', 0, 300)).toBe('error');
    });
    it('test zero for the height', async () => {
        expect(await resz('image', 300, 0)).toBe('error');
    });
    it('test float for the width', async () => {
        expect(await resz('image', 5.5, 300)).toBe('error');
    });
    it('test float for the height', async () => {
        expect(await resz('image', 300, 5.5)).toBe('error');
    });
});
