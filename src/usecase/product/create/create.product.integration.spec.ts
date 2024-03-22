import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Integration test to create product use case", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("Should create a product", async () => {
        const repository = new ProductRepository();
        const input = {
            type: "a",
            name: "Product 1",
            price: 60
        }

        const usecase = new CreateProductUseCase(repository);
        const output = await usecase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })

    it("Should throw an error when name is empty", async () => {
        const repository = new ProductRepository();
        const input = {
            type: "a",
            name: "",
            price: 60
        }

        const usecase = new CreateProductUseCase(repository);
        await expect(usecase.execute(input)).rejects.toThrow("Name is required");

    })

    it("Should throw an error when price is negative", async () => {
        const repository = new ProductRepository();
        const input = {
            type: "a",
            name: "Product",
            price: -1
        }

        const usecase = new CreateProductUseCase(repository);
        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");

    })
})