import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const product = ProductFactory.create("a", "Product", 20);


describe("Unit test for update product", () => {
    let sequelize : Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            logging: false,
            dialect: 'sqlite',
            sync: {force: true},
            storage: ':memory:'
        })
        await sequelize.addModels([ProductModel])
        await sequelize.sync();

        const repository = new ProductRepository();
        repository.create(product);
    })

    it("Should update product", async () => {
        const repository = new ProductRepository();
        const usecase = new UpdateProductUseCase(repository);

        const input = {
            id: product.id,
            name: "Product updated",
            price: 2
        }

        const output = await usecase.execute(input)

        expect(output).toEqual(input)
    })
})