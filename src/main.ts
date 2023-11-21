import Address from "./domain/custumer/value-object/address";
import Customer from "./domain/custumer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";

// A relação entre objetos de diferentes agregados se dá por id
// A relação entre objetos pertencentes ao mesmo agregado se dá pelo próprio objeto
let customer = new Customer("123", "nathan carauna");
const address = new Address("Rua dois", 2, "12345-678", "São Paulo");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 15);
const order = new Order("1", "123", [item1, item2]);
