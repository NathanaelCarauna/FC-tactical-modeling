import Customer from "../../../domain/custumer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/custumer/repository/customer-repository.interface";
import Address from "../../../domain/custumer/value-object/address";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers)
    }
}

class OutputMapper {
    static toOutput(customers: Customer[]): OutputListCustomerDto {
        return {
            customers: customers.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    zip: customer.address.zipcode,
                    city: customer.address.city
                }
            }))
        }
    }
}