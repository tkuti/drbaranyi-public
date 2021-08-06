const Street = require("../../models/Street")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')

describe('GET ./api/streets endpoint testing ', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
    })

    afterAll(async () => {
        await stopServer(mongoServer)
    })

    afterEach(async () => {
        await deleteAll([Street])
    })


    it("Returns an empty array from empty database", async () => {

        const res = await request.get("/api/streets");

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
    });

    it("Returns the existing streets from non-empty database", async () => {

        await Street.insertMany([
            {
                "irsz": "1111",
                "kozterulet": "Test Street1",
                "jelleg": "utca",
                "hsz": "1-11",
                "oldal": "Páros",
            },
            {
                "irsz": "2222",
                "kozterulet": "Test Street2",
                "jelleg": "utca",
                "hsz": "23-33",
                "oldal": "Páratlan",
            }
        ])

        const res = await request.get("/api/streets");
        const count = await Street.countDocuments()

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[1].kozterulet).toBe("Test Street2");
        expect(res.body[1]._id).toBeDefined()
        expect(count).toBe(2);
    });

})

