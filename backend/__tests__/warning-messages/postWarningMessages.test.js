const WarningMessage = require("../../models/WarningMessage")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')
const { createJwtAdminToken, createJwtUserToken } = require('../util/createJwtToken')

const adminToken = createJwtAdminToken()
const userToken = createJwtUserToken()

describe('POST ./api/warning-messages endpoint testing', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
    })

    afterAll(async () => {
        await stopServer(mongoServer)
    })

    afterEach(async () => {
        await deleteAll([WarningMessage])
    })


    it("Post endpoint without token responds with 401", async () => {
        const res = await request.post("/api/warning-messages")
            .send([
                {
                    "name": "calendar-msg-1",
                    "message": "Rendelésre változatlanul időpont foglalás szükséges!!!"
                }
            ])

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");;
    });


    it("Post endpoint with user role token responds with 403", async () => {
        const res = await request.post("/api/warning-messages")
            .send([
                {
                    "name": "calendar-msg-1",
                    "message": "Rendelésre változatlanul időpont foglalás szükséges!!!"
                }
            ])
            .set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!");
    });


    it("Post endpoint with proper admin role token inserts the new message", async () => {

        const res = await request.post("/api/warning-messages")
            .send([
                {
                    "name": "calendar-msg-1",
                    "message": "Rendelésre változatlanul időpont foglalás szükséges!!!"
                }
            ])
            .set({ authorization: adminToken })

        const count = await WarningMessage.countDocuments()

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(count).toBe(1);
    });


    it("Post endpoint with one message updates the existing message", async () => {
        await new WarningMessage(
            {
                "name": "calendar-msg-1",
                "message": "Rendelésre változatlanul időpont foglalás szükséges!!!"
            }
        ).save()

        const res = await request.post("/api/warning-messages")
            .send([
                {
                    "name": "calendar-msg-1",
                    "message": "Test update"
                }
            ])
            .set({ authorization: adminToken })

        const messages = await WarningMessage.find()

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(messages.length).toBe(1);
        expect(messages[0].name).toBe("calendar-msg-1");
        expect(messages[0].message).toBe("Test update");

    });


    it("Post endpoint with more new message inserts the new messages", async () => {

        const res = await request.post("/api/warning-messages")
            .send([
                {
                    "name": "calendar-msg-1",
                    "message": "Test message1"
                },
                {
                    "name": "calendar-msg-2",
                    "message": "Test message2"
                }
            ])
            .set({ authorization: adminToken })

        const messages = await WarningMessage.find()

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(messages.length).toBe(2);
        expect(messages[0].name).toBe("calendar-msg-1");
        expect(messages[0].message).toBe("Test message1");

    });
})