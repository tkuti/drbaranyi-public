const WarningMessages = require("../models/WarningMessages")
const app = require("../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('./util/inMemDb')


describe('testing warning-messages endpoints', () => {
    let mongoServer
  
    beforeAll(async () => {
      mongoServer = await startServer()
    })
  
    afterAll(async () => {
      await stopServer(mongoServer)
    })
  
    afterEach(async () => {
      await deleteAll([WarningMessages])
    })


    it("Get endpoint with empty database", async () => {

        const res = await request.get("/api/warning-messages");

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
    });

    it("Get endpoint with non-empty database", async () => {

        await WarningMessages.insertMany([
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

        const count = await WarningMessages.countDocuments()  

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[1].name).toBe("calendar-msg-2");
        expect(count).toBe(2);
    });

    it("Post endpoint with empty database inserts the new message", async () => {
        const res = await request.post("/api/warning-messages").send([
            {
                "name": "calendar-msg-1", 
                "message": "Rendelésre változatlanul időpont foglalás szükséges!!!", 
                "type": "default"
            }
        ])

        const count = await WarningMessages.countDocuments()  

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(count).toBe(1);
    });

    it("Post endpoint with one message updates the existing message", async () => {
        await new WarningMessages(
            {
                "name": "calendar-msg-1", 
                "message": "Rendelésre változatlanul időpont foglalás szükséges!!!", 
                "type": "default"
            }
        ).save()

        const res = await request.post("/api/warning-messages").send([
            {
                "name": "calendar-msg-1", 
                "message": "Test update", 
                "type": "info"
            }
        ])

        const messages = await WarningMessages.find() 

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(messages.length).toBe(1);
        expect(messages[0].name).toBe("calendar-msg-1");
        expect(messages[0].message).toBe("Test update");

    });

    it("Post endpoint with more new message inserts the new message", async () => {

        const res = await request.post("/api/warning-messages").send([
            {
                "name": "calendar-msg-1", 
                "message": "Test message1", 
                "type": "info"
            },
            {
                "name": "calendar-msg-2", 
                "message": "Test message2", 
                "type": "info"
            }
        ])

        const messages = await WarningMessages.find() 

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(messages.length).toBe(2);
        expect(messages[0].name).toBe("calendar-msg-1");
        expect(messages[0].message).toBe("Test message1");

    });
})