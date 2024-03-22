import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./create.product.usecase";


const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}
describe("Unit test for create product", () => {

    it("Should create a product", async () => {
        const repository = MockRepository();
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
        const repository = MockRepository();
        const input = {
            type: "a",
            name: "",
            price: 60
        }

        const usecase = new CreateProductUseCase(repository);
        await expect(usecase.execute(input)).rejects.toThrow("Name is required");

    })
    
    it("Should throw an error when price is negative", async () => {
        const repository = MockRepository();
        const input = {
            type: "a",
            name: "Product",
            price: -1
        }

        const usecase = new CreateProductUseCase(repository);
        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");

    })
})
