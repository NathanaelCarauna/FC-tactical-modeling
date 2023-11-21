import Address from "../value-object/address"

export default interface CustomerInterface {
    get id(): string;

    get name(): string;

    get rewardPoints(): number;

    get address(): Address;

    isActive(): boolean;

    validate(): void;

    changeName(name: string): void;

    activate(): void;

    deactivate(): void;

    addRewardPoints(points: number): void;

    changeAddress(address: Address): void;
}