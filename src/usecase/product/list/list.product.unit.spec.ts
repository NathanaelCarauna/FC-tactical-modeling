import ProductFactory from "../../../domain/product/factory/product.factory"
import ListProductUseCase from "./list.product.usecase"

const product1 = ProductFactory.create("a", "Product 1", 50)
const product2 = ProductFactory.create("b", "Product 2", 30)

const MockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),        
    }
}

describe("Unit test for listing products", () => {
    it("Should list all products", async () => {
        const repository = MockRepository();
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