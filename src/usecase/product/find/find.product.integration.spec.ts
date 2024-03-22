import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";


const product = ProductFactory.create("a", "Product 1", 29);

describe("Unit test for finding a product", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: {force: true},
        });
        await sequelize.addModels([ProductModel])
        await sequelize.sync();

        const repository = new ProductRepository;
        repository.create(product);
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("Should find a product", async () => {
        const repository = new ProductRepository;
        const usecase = new FindProductUseCase(repository);
        
        const input = {
            id: product.id
        }

        const output = await usecase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: product.name,
            price: product.price,
        })
    })
})