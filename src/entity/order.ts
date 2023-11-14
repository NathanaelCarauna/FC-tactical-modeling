import OrderItem from "./order_item";

export default class Order{
    _id: string;
    _custumerId: string;
    _items: OrderItem[];

    constructor(id: string, custumerId: string, items: OrderItem[]){
        this._id = id;
        this._custumerId = custumerId;
        this._items = items;
    }
}