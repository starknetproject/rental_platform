use starknet::ContractAddress;

#[starknet::interface]
pub trait ITransactionHandler<TContractState> {
    fn book_listing(ref self: TContractState, host: ContractAddress, listing_id: felt252, guest: ContractAddress, booking_amount: felt252);

    fn initiate_refund(ref self: TContractState, host: ContractAddress, listing_id: felt252, guest: ContractAddress);

    fn release_payment(ref self: TContractState, host: ContractAddress, listing_id: felt252, guest: ContractAddress);

    fn confirm_check_in(ref self: TContractState, host: ContractAddress, listing_id: felt252, guest: ContractAddress);
}