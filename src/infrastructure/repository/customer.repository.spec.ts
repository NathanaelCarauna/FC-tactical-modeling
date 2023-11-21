import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/custumer/value-object/address";
import Customer from "../../domain/custumer/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";

describe('Product repository test', () => {

    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })
        sequileze.addModels([CustomerModel]);
        await sequileze.sync();
    });

    afterEach(async () => {
        await sequileze.close();
    });

    it("Should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("street 1", 1, "zipcode 1", "city 1");
        customer.changeAddress(address);
        console.log(customer)

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            city: address.city,
        });
    })

    it("Should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("street 1", 1, "zipcode 1", "city 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        await customerRepository.update(customer);

        const productModel2 = await CustomerModel.findOne({ where: { id: "1" } });

        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            city: address.city,
        });
    })

    it("Should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("street 1", 1, "zipcode 1", "city 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);
        const foundCustomer = await customerRepository.find("1");

        expect(customer).toStrictEqual(foundCustomer);
    });

    it("Should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("456ABC");
        }).rejects.toThrow("Customer not found");
    })

    it("Should find all customers", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("1", "Customer 1");
        const address = new Address("street 1", 1, "zipcode 1", "city 1");
        customer.changeAddress(address);
        customer.addRewardPoints(10);
        customer.activate()
        await customerRepository.create(customer);

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("street 2", 1, "zipcode 2", "city 2");
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();        

        expect(foundCustomers).toHaveLength(2);
        expect(foundCustomers).toContainEqual(customer);
        expect(foundCustomers).toContainEqual(customer2);

    });
});
