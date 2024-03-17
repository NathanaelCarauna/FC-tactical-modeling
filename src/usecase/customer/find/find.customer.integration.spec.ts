import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/custumer/entity/customer";
import Address from "../../../domain/custumer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";


describe("Test find customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging:false,
            sync: {force: true},
        });

        await sequelize.addModels([CustomerModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("Should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const costumer = new Customer("123", "Jhon");
        const address = new Address("Street", 123, "Zip", "City");
        costumer.changeAddress(address);
        await customerRepository.create(costumer);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Jhon",
            address: {
                street: "Street",
                number: 123,
                zip: "Zip",
                city: "City",
            }
        }
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    })
});