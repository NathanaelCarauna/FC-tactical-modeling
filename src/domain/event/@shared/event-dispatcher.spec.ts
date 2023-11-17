import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerAddressChangedEvent from "../customer/customer-address-changed";
import CustomerCreatedEvent from "../customer/customer-created";
import EnviaConsoleLog1Handler from "../customer/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../customer/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../customer/handler/envia-console-log-handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    })

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    })

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();


        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    })

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toMatchObject(eventHandler);

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    })
});

describe("Customer events test", () => {
    it("should trigger log events when CustomerCreatedEvent is dispatched", () => {
        const eventDispatcher = new EventDispatcher();
        const eventLog1Handler = new EnviaConsoleLog1Handler()
        const eventLog2Handler = new EnviaConsoleLog2Handler();
        eventDispatcher.register("CustomerCreatedEvent", eventLog1Handler);
        eventDispatcher.register("CustomerCreatedEvent", eventLog2Handler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        const customerCreatedEvent = new CustomerCreatedEvent(new Customer("123", "Nathanael"));
        const spyEventHandler1 = jest.spyOn(eventLog1Handler, "handle");
        const spyEventHandler2 = jest.spyOn(eventLog2Handler, "handle");

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    })

    it("should trigger log event when Customer addressChangedEvent is dispatched", () => {
        const eventDispatcher = new EventDispatcher();
        const eventLogHandler = new EnviaConsoleLogHandler()
        eventDispatcher.register("CustomerAddressChangedEvent", eventLogHandler);        

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toMatchObject(eventLogHandler);
        
        const customer = new Customer("123", "Nathanael");
        const address = new Address("Street 1", 1, "5501123-345", "City 1");
        customer.changeAddress(address);
        const customerCreatedEvent = new CustomerAddressChangedEvent(customer);

        const spyEventHandler1 = jest.spyOn(eventLogHandler, "handle");        

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();        
    })
})