import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrow("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("Name is required");
    });

    it("should change name", () => {
        //arrange
        const customer = new Customer("123", "John");

        //Act
        customer.changeName("Jane");

        //Assert
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        //arrange
        const customer = new Customer("1", "Customer1");
        const address = new Address("Street 1", 123, "13330-250", "São paulo");
        customer.changeAddress(address);

        //Act
        customer.activate()

        //Assert
        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when address is undefined and customer is activated", () => {
        expect(() => {
            //arrange
            const customer = new Customer("1", "Customer1");
            //Act
            customer.activate()
            //Assert
        }).toThrow("Address is mandatory to activate a customer")
    });

    it("should deactivate customer", () => {
        //arrange
        const customer = new Customer("1", "Customer1");

        //Act
        customer.deactivate()

        //Assert
        expect(customer.isActive()).toBe(false);
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});