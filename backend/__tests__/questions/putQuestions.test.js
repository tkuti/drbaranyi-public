const Question = require("../../models/Question")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer } = require('../util/inMemDb')
const { createJwtAdminToken, createJwtUserToken } = require('../util/createJwtToken')

const adminToken = createJwtAdminToken()
const userToken = createJwtUserToken()


describe('PUT ./api/questions endpoint testing ', () => {
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



    it("Put endpoint without token responds with 401", async () => {

        const res = await request.put(`/api/questions/${questionId}`)
            .send(
                {
                    "question": "Test Question1",
                    "answer": "Test Answer1",
                    "img": [
                        "test1.jpg",
                        "updated.jpg"
                    ],
                    "video": ""
                }
            )

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Put endpoint with user role token responds with 403", async () => {

        const res = await request.put(`/api/questions/${questionId}`)
        .send(
            {
                "question": "Test Question1",
                "answer": "Test Answer1",
                "img": [
                    "test1.jpg",
                    "updated.jpg"
                ],
                "video": ""
            }
        ).set({ authorization: userToken });

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!");
    });


    it("Put endpoint with proper admin role token updates the existing question", async () => {

        const res = await request.put(`/api/questions/${questionId}`)
        .send(
            {
                "question": "Test Question1",
                "answer": "Test Answer1",
                "img": [
                    "test1.jpg",
                    "updated.jpg"
                ],
                "video": ""
            }
        ).set({ authorization: adminToken });

        const count = await Question.countDocuments()
        const updatedQuestion = await Question.findOne(
            { _id: questionId }
            )

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(updatedQuestion.img[1]).toBe("updated.jpg");
        expect(updatedQuestion._id.toString()).toMatch(questionId)
        expect(updatedQuestion.video).toBe("");
        expect(count).toBe(2);

    })


    it("Put endpoint with non-existing Id returns 404 error", async () => {

        const res = await request.put("/api/questions/61081dea2793df1da15bf2fb")
        .send(
            {
                "question": "Test Question1",
                "answer": "Test Answer1",
                "img": [
                    "test1.jpg",
                    "updated.jpg"
                ],
                "video": ""
            }
        ).set({ authorization: adminToken });

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Nem található a megadott kérdés!");
    });
})



