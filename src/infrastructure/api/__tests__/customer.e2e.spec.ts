import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it("Should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "12345"
                }
            })

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("12345");

    });

    it("Should not create a customer", async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: "John",
            })
        expect(response.status).toBe(500);
    })

    it("Should list all customers", async () => {
        const response = await request(app).post('/customer').send({
            name: "Jane",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "12345"
            }
        })
        expect(response.status).toBe(200);
        const response2 = await request(app).post('/customer').send({
            name: "John",
            address: {
                street: "Street 2",
                city: "City2",
                number: 1234,
                zip: "12344"
            }
        })
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get('/customer').send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer1 = listResponse.body.customers[0];
        expect(customer1.name).toBe("Jane");
        expect(customer1.address.street).toBe("Street");
        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("John");
        expect(customer2.address.street).toBe("Street 2");

        const listResponseXml = await request(app)
            .get("/customer")
            .set("Accept", "application/xml")
            .send();

        expect(listResponseXml.status).toBe(200)
        expect(listResponseXml.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXml.text).toContain(`<customers>`);
        expect(listResponseXml.text).toContain(`<customer>`);
        expect(listResponseXml.text).toContain(`<name>John</name>`);
        expect(listResponseXml.text).toContain(`<name>Jane</name>`);
        expect(listResponseXml.text).toContain(`<address>`);
        expect(listResponseXml.text).toContain(`<street>Street</street>`);
        expect(listResponseXml.text).toContain(`<street>Street 2</street>`);
        expect(listResponseXml.text).toContain(`<city>City</city>`);
        expect(listResponseXml.text).toContain(`<city>City2</city>`);
        expect(listResponseXml.text).toContain(`<number>123</number>`);
        expect(listResponseXml.text).toContain(`<number>1234</number>`);
        expect(listResponseXml.text).toContain(`<zip>12345</zip>`);
        expect(listResponseXml.text).toContain(`<zip>12344</zip>`);
        expect(listResponseXml.text).toContain(`</address>`);
        expect(listResponseXml.text).toContain(`</customer>`);
    })
});