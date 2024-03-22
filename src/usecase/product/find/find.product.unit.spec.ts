import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a", "Product 1", 29);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for finding a product", () => {
    it("Should find a product", async () => {
        const repository = MockRepository();
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