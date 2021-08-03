const Street = require("../models/Street")
const app = require("../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('./util/inMemDb')


describe('testing streets endpoints with empty database', () => {
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


    it("Get endpoint with empty database", async () => {

        const res = await request.get("/api/streets");

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
    });


    it("Post endpoint with empty database inserts the new street", async () => {
        const res = await request.post("/api/streets").send(
            {
                "irsz": "1111",
                "kozterulet": "Test Street1",
                "jelleg": "utca",
                "hsz": "1-11",
                "oldal": "Páros",
            }
        )

        const count = await Street.countDocuments()

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(count).toBe(1);
    });

})


describe('testing streets endpoints with non-empty database', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
    })

    afterAll(async () => {
        await stopServer(mongoServer)
    })

    beforeEach(async () => {
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
    })

    afterEach(async () => {
        await deleteAll([Street])
    })


    it("Get endpoint returns the existing streets", async () => {

        const res = await request.get("/api/streets");
        const count = await Street.countDocuments()

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[1].kozterulet).toBe("Test Street2");
        expect(res.body[1]._id).toBeDefined()
        expect(count).toBe(2);
    });

    it("Put endpoint updates the existing street", async () => {

        const street = await Street.findOne({ irsz: "2222" })
        const streetId = String(street._id)
        const res = await request.put(`/api/streets/${streetId}`).send({
            irsz: "2222",
            kozterulet: "Test Street2 Updated",
            jelleg: "utca",
            hsz: "23-33",
            oldal: "Páratlan",
        });
        const count = await Street.countDocuments()
        const updatedStreet = await Street.findOne({ _id: streetId })

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(updatedStreet.kozterulet).toBe("Test Street2 Updated");
        expect(updatedStreet._id.toString()).toMatch(streetId)
        expect(count).toBe(2);
    });

    it("Put endpoint with non-existing Id returns 403 error", async () => {

        const res = await request.put("/api/streets/61081dea2793df1da15bf2fb").send({
            irsz: "2222",
            kozterulet: "Test Street2 Updated",
            jelleg: "utca",
            hsz: "23-33",
            oldal: "Páratlan",
        });

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Nem található a megadott utca!");
    });

    it("Delete endpoint deletes the street", async () => {

        const street = await Street.findOne({ irsz: "2222" })
        const streetId = String(street._id)
        const res = await request.delete(`/api/streets/${streetId}`)

        const deletedStreet = await Street.findOne({ _id: streetId })

        expect(deletedStreet).toBeNull()
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
    });

    it("Delete endpoint with non-existing Id returns 403 error", async () => {

        const res = await request.delete("/api/streets/61081dea2793df1da15bf2fb")

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Nem található a megadott utca!");
    });
})