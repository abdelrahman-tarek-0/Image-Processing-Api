import supertest from 'supertest';
import app from '../main';
const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the main page endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
    it('check if no name or dimensions were entered', async () => {
        const response = await request.get('/api/image');
        expect(response.status).toBe(404);
    });
});
describe('image testing query inputs', () => {
    it('test the image process if everything is ok', async () => {
        const response = await request.get(
            '/api/image/?name=image&width=300&height=300',
        );
        expect(response.status).toBe(200);
    });
    it('check if the input image is not found', async () => {
        const response = await request.get(
            '/api/image/?name=someText&width=300&height=300',
        );
        expect(response.status).toBe(404);
    });
    it('test float number to check for the width', async () => {
        const response = await request.get(
            '/api/image/?name=image&width=5.5&height=300',
        );
        expect(response.status).toBe(404);
    });
    it('test float number to check for the height', async () => {
        const response = await request.get(
            '/api/image/?name=image&width=300&height=5.5',
        );
        expect(response.status).toBe(404);
    });
    it('test negative number to check for the width', async () => {
        const response = await request.get(
            '/api/image/?name=image&width=-5&height=300',
        );
        expect(response.status).toBe(404);
    });
    it('test negative number to check for the height', async () => {
        const response = await request.get(
            '/api/image/?name=image&width=300&height=-5',
        );
        expect(response.status).toBe(404);
    });
});
