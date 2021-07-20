const WarningMessages = require("../models/WarningMessages")
const app = require("../index")
const supertest = require("supertest")
const request = supertest(app)

const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server')

describe('testing warning-messages endpoint', () => {
    let mongoServer = MongoMemoryServer;

    beforeEach(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), {
            useNewUrlParser: true,
            dbName: "test-warning-messages", useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });;
    });

    afterEach(async () => {
        await mongoose.connection.close();
        if (mongoServer) {
            await mongoServer.stop();
        }
    })

    it("Get endpoint with empty database", async () => {
        const res = await request.get("/api/warning-messages");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
    });

    it("Post endpoint with empty database inserts the new message", async () => {
        await request.post("/api/warning-messages").send([
            {
                "name": "calendar-msg-1", 
                "message": "Rendelésre változatlanul időpont foglalás szükséges!!!", 
                "type": "default"
            }
        ])
        const res = await request.get("/api/warning-messages");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });

    it("Post endpoint with one message updates the message", async () => {
        await request.post("/api/warning-messages").send([
            {
                "name": "calendar-msg-1", 
                "message": "Rendelésre változatlanul időpont foglalás szükséges!!!", 
                "type": "default"
            }
        ])
        await request.post("/api/warning-messages").send([
            {
                "name": "calendar-msg-1", 
                "message": "Test update", 
                "type": "info"
            }
        ])
        const res = await request.get("/api/warning-messages");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].message).toBe("Test update");

    });
})