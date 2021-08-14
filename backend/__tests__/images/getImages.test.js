const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)

const mock = require('mock-fs');


describe('GET ./api/images endpoint testing ', () => {



    it("Returns the images from uploads folder", async () => {

        mock({
            './uploads': {
                'image1.jpg': 'file content here',
                'image2.jpg': 'file content here'
            }
        });

        const res = await request.get("/api/images");

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0]).toBe("image1.jpg");
        expect(res.body[1]).toBe("image2.jpg");

        mock.restore();
    });




})

