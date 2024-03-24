import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product", 20);

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for update product", () => {
    it("Should update product", async () => {
        const repository = MockRepository();
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