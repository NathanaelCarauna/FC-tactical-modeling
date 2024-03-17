import Customer from "../../../domain/custumer/entity/customer";
import Address from "../../../domain/custumer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const custumer = new Customer("123", "Jhon");
const address = new Address("Street", 123, "Zip", "City");
custumer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(custumer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test find customer use case", () => {

    it("Should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);       

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

    it("Should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        })
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123",
        };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found");
    })
});