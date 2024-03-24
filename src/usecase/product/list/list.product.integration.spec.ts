import { Sequelize } from "sequelize-typescript"
import ProductFactory from "../../../domain/product/factory/product.factory"
import ListProductUseCase from "./list.product.usecase"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"

const product1 = ProductFactory.create("a", "Product 1", 50)
const product2 = ProductFactory.create("b", "Product 2", 30)

describe("Unit test for listing products", () => {

    let sequelize: Sequelize;    

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })
        await sequelize.addModels([ProductModel])
        await sequelize.sync();
        const repository = new ProductRepository();
        await repository.create(product1)
        await repository.create(product2)
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("Should list all products", async () => {
        const repository = new ProductRepository();
        const usecase = new ListProductUseCase(repository);

        const output = await usecase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id)
        expect(output.products[0].name).toBe(product1.name)
        expect(output.products[0].price).toBe(product1.price)
        expect(output.products[1].id).toBe(product2.id)
        expect(output.products[1].name).toBe(product2.name)
        expect(output.products[1].price).toBe(product2.price)
    })
})