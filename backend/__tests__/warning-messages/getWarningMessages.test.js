const WarningMessage = require("../../models/WarningMessage")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')


describe('GET ./api/warning-messages endpoint testing ', () => {
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


    it("Returns an empty array from empty database", async () => {

        const res = await request.get("/api/warning-messages");

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
    });

    it("Returns the existing messages from non-empty database", async () => {

        await WarningMessage.insertMany([
            {
                "name": "calendar-msg-1", 
                "message": "Rendelésre változatlanul időpont foglalás szükséges!!!", 
                "type": "default" 
            },
            {
                "name": "calendar-msg-2", 
                "message": "Rendelésre változatlanul időpont foglalás szükséges!!!", 
                "type": "default" 
            }
        ])

        const res = await request.get("/api/warning-messages");

        const count = await WarningMessage.countDocuments()  

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[1].name).toBe("calendar-msg-2");
        expect(res.body[1]._id).toBeDefined()
        expect(count).toBe(2);
    });

})

