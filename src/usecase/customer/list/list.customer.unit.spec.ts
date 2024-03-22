import { fn } from "sequelize";
import CustomerFactory from "../../../domain/custumer/factory/customer.factory";
import Address from "../../../domain/custumer/value-object/address";
import { idText } from "typescript";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "John",
    new Address(
        "street 1",
        1,
        "12345",
        "city"
    )
)
const customer2 = CustomerFactory.createWithAddress(
    "Jane",
    new Address(
        "street 2",
        2,
        "456",
        "city 2"
    )
)
const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2]))
    }
}
describe("Unit test for listing customer use case", () => {
    it("Should return customers", async () => {
        const repository  = MockRepository();
        const useCase = new ListCustomerUseCase(repository);

        const output = await useCase.execute({});

        expect(output.customers.length).toBe(2)
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
    })
})