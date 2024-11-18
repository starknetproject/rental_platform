#[derive(Copy, Drop, Serde, starknet::Store, Hash)]
pub struct TransactionData {
    pub host: ContractAddress,
    pub listing_id: felt252,
    pub guest: ContractAddress,
    pub booking_amount: felt252,
}

use starknet::ContractAddress;

#[starknet::interface]
pub trait ITransactionHandler<TContractState> {
    fn book_listing(ref self: TContractState, new_listing: TransactionData);
    fn initiate_refund(ref self: TContractState, refund_info: TransactionData);
    fn release_payment(ref self: TContractState, payment_info: TransactionData);
    fn confirm_check_in(ref self: TContractState, check_in_info: TransactionData);
}

#[starknet::contract]
pub mod TransactionHandlerComponent {
    use super::*;

    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, Vec, VecTrait, MutableVecTrait, Map, StorageMapReadAccess, StorageMapWriteAccess
    };
    use core::starknet::{ContractAddress, get_caller_address};

    #[storage]
    pub struct Storage {
        host: ContractAddress,
        transactions: Map<ContractAddress, Vec<TransactionData>>,
        refund: Map<ContractAddress, Vec<TransactionData>>,
        check_in: Map<ContractAddress, Vec<TransactionData>>,
    };

    #[constructor]
    fn constructor(ref self: ContractState, host: ContractAddress) {
        self.host.write(host);
    }

    #[abi(embed_v0)]
    impl TransactionHandlerImpl of super::ITransactionHandler<TContractState> {
        fn book_listing(ref self: ContractState, new_listing: TransactionData) {
            self.transactions.entry(new_listing.guest).append().write(new_listing);
        }

        fn initiate_refund(ref self: ContractState, refund_info: TransactionData) {
            self.refund.entry(refund_info.guest).append().write(refund_info);
        }

        fn release_payment(ref self: ContractState, payment_info: TransactionData) {
            self.transactions.entry(payment_info.guest).remove(payment_info);
        }

        fn confirm_check_in(ref self: ContractState, check_in_info: TransactionData) {
            self.check_in.entry(check_in_info.guest).append().write(check_in_info);
        }
    }
}