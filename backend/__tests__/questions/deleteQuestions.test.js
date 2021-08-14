const Question = require("../../models/Question")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')
const { createJwtAdminToken, createJwtUserToken } = require('../util/createJwtToken')

const adminToken = createJwtAdminToken()
const userToken = createJwtUserToken()

describe('DELETE ./api/questions endpoint testing ', () => {
    let mongoServer
    let questionId

    beforeAll(async () => {
        mongoServer = await startServer()
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
        const question = await Question.findOne(
            { question: "Test Question1" }
        )
        questionId = String(question._id)

    })

    afterAll(async () => {
        await stopServer(mongoServer)
    })



    it("Delete endpoint without token responds with 401", async () => {

        const res = await request.delete(`/api/questions/${questionId}`)

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Delete endpoint with user role token responds with 403", async () => {

        const res = await request.delete(`/api/questions/${questionId}`)
            .set({ authorization: userToken });

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!");
    });


    it("Delete endpoint with proper admin role token deletes the question", async () => {

        const res = await request.delete(`/api/questions/${questionId}`)
            .set({ authorization: adminToken })

        const deletedQuestion = await Question.findOne(
            { _id: questionId }
        )

        expect(deletedQuestion).toBeNull()
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres törlés");

    })


    it("Delete endpoint with non-existing Id returns 404 error", async () => {

        const res = await request.delete("/api/questions/61081dea2793df1da15bf2fb")
            .set({ authorization: adminToken })

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Nem található a megadott kérdés!");
    });
})



