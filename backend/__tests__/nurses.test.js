const Nurse = require("../models/Nurse")
const app = require("../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('./util/inMemDb')


describe('testing nurses endpoints', () => {
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


    it("Get endpoint with empty database", async () => {

        const res = await request.get("/api/nurses");

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
    });

    it("Get endpoint with non-empty database", async () => {

        await Nurse.insertMany([
            {
                "name": "Test Nurse1", 
                "phone": "06-30 522-2222", 

            },
            {
                "name": "Test Nurse2", 
                "phone": "06-30 633-3333"
            }
        ])

        const res = await request.get("/api/nurses");

        const count = await Nurse.countDocuments()  

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[1].name).toBe("Test Nurse2");
        expect(count).toBe(2);
    });

    
})