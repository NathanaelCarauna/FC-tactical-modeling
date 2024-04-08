import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it("Should create a product", async () => {
        const response = await request(app)
            .post('/product')
            .send({
                name: "Product 1",
                price: 99,
                type: 'a'
            })
        expect(response.status).toBe(200);   
        expect(response.body.id.length).toBeGreaterThan(4);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(99);
    })

    it("Should not create a product", async () => {
        const response = await request(app)
            .post('/product')
            .send({
                name: "",
                price: 0,
                type: 'a'
            })
        expect(response.status).toBe(500);        
    })
})