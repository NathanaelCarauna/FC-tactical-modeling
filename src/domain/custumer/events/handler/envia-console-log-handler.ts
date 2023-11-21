import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed";
import CustomerCreatedEvent from "../customer-created";

export default class EnviaConsoleLogHandler implements EventHandlerInterface{
    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para ${event.eventData.address}`);
    }
}