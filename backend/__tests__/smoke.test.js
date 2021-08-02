const app = require("../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('./util/inMemDb')
const mongoose = require("mongoose");


describe('Smoke tests', () => {


    it("Testing to see if Jest works", () => {
        expect(1).toBe(1);
    });

    it("Testing to see if Supertest works. Get invalid endpoint responds with 404", async () => {
        const res = await request.get("/api/dashboards");
        expect(res.status).toBe(404);
    });

    it("Testing to see if mongo-memory-server works", async () => {
        const Cat = mongoose.model('Cat', { name: String })

        const mongoServer = await startServer()
    
        const kitty = new Cat({
          name: 'Cicuska'
        })
    
        await kitty.save()
        const doc = await Cat.findOne()
    
        expect(doc.name).toBe('Cicuska')
        await deleteAll([Cat])
    
        const result = await Cat.countDocuments()
    
        expect(result).toBe(0)
        await stopServer(mongoServer)
    });

})