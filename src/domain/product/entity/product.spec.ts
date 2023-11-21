import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            let customer = new Product("", "Product 1", 100);

        }).toThrow("Id is required");
    });
    it("should throw error when name is empty", () => {

        expect(() => {
            let customer = new Product("123", "", 100);

        }).toThrow("Name is required");
    });
    it("should throw error when price is equals or less than zero", () => {

        expect(() => {
            let customer = new Product("123", "Name", -1);

        }).toThrow("Price must be greater than zero");
    });
    it("should change name", () => {

        const product = new Product("123", "product 1", 100);
        product.changeName("product2");
        expect(product.name).toBe("product2");
    });
    it("should change price", () => {

        const product = new Product("123", "product 1", 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });
});