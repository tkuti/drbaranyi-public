const Question = require("../../models/Question")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')
const { createJwtAdminToken, createJwtUserToken } = require('../util/createJwtToken')

const adminToken = createJwtAdminToken()
const userToken = createJwtUserToken()


describe('POST ./api/questions endpoint testing ', () => {
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



    it("Post endpoint without token responds with 401", async () => {
        const res = await request.post("/api/questions").send(
            {
                "question": "Test Question1",
                "answer": "Test Answer1",
                "img": [
                    "test1.jpg",
                    "test2.jpg"
                ],
                "video": "testURL"
            }
        )

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Post endpoint with user role token responds with 403", async () => {
        const res = await request.post("/api/questions").send(
            {
                "question": "Test Question1",
                "answer": "Test Answer1",
                "img": [
                    "test1.jpg",
                    "test2.jpg"
                ],
                "video": "testURL"
            }
        ).set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!");
    });

    

    it("Post endpoint with proper admin role token inserts the new question", async () => {

        const res = await request.post("/api/questions").send(
            {
                "question": "Test Question1",
                "answer": "Test Answer1",
                "img": [
                    "test1.jpg",
                    "test2.jpg"
                ],
                "video": "testURL"
            }
        ).set({ authorization: adminToken })

        const count = await Question.countDocuments()

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(count).toBe(1);

    })

})



