const Question = require("../../models/Question")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')

describe('GET ./api/questions endpoint testing ', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
    })

    afterAll(async () => {
        await stopServer(mongoServer)
    })

    afterEach(async () => {
        await deleteAll([Question])
    })


    it("Returns an empty array from empty database", async () => {

        const res = await request.get("/api/questions");

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
    });


    it("Returns the existing questions from non-empty database", async () => {

        await Question.insertMany([
            {
                "question": "Test Question1",
                "answer": "Test Answer1",
                "img": [
                    "test1.jpg",
                    "test2.jpg"
                ],
                "video": "testURL"

            },
            {

                "question": "Test Question2",
                "answer": "Test Answer2",
                "img": [
                    "test1.jpg"
                ],
                "video": ""
            }
        ])

        const res = await request.get("/api/questions");
        const count = await Question.countDocuments()

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[1].answer).toBe("Test Answer2");
        expect(res.body[1]._id).toBeDefined()
        expect(res.body[1].video).toBe("")
        expect(count).toBe(2);
    });

})

