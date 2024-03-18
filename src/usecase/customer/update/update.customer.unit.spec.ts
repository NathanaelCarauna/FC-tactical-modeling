import CustomerFactory from "../../../domain/custumer/factory/customer.factory"
import Address from "../../../domain/custumer/value-object/address"
import UpdateCustomerUseCase from "./update.customer.usecase"

const customer = CustomerFactory.createWithAddress("John", new Address("Street", 123, "Zip", "City"))

const input = {
    id: customer.id,
    name: "John updated",
    address: {
        street: "Street updated",
        number: 1234,
        zip: "Zip updated",
        city: "City updated",
    }
}

const  MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    }
}

describe("Unit Test for update customer use case", () => {

    it("Should update customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input)
    })
})