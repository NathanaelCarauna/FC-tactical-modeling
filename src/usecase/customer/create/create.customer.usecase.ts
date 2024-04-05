import CustomerFactory from "../../../domain/custumer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/custumer/repository/customer-repository.interface";
import Address from "../../../domain/custumer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";

export default class CreateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = CustomerFactory.createWithAddress(input.name,
            new Address(input.address.street, input.address.number, input.address.zip, input.address.city));
        await this.customerRepository.create(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zipcode,
                city: customer.address.city,
            }
        }
    }
}