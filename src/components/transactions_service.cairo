#[derive(Copy, Drop, Serde, starknet::Store, Hash)]
pub struct TransactionData {
    pub host: ContractAddress,
    pub listing_id: felt252,
    pub guest: ContractAddress,
    pub booking_amount: felt252,
    pub timestamp: felt252
}


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
    use starknet::ContractAddress;

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        ListingBooked: ListingBooked,
        RefundInitiated: RefundInitiated,
        PaymentReleased: PaymentReleased,
        CheckInConfirmed: CheckInConfirmed
    }

    #[derive(Drop, starknet::Event)]
    pub struct ListingBooked {
        #[key]
        pub guest: ContractAddress,
        #[key]
        pub listing_id: felt252,
        pub host: ContractAddress,
        pub booking_amount: felt252,
        pub timestamp: felt252
    }

    #[derive(Drop, starknet::Event)]
    pub struct RefundInitiated {
        #[key]
        pub guest: ContractAddress,
        #[key]
        pub listing_id: felt252,
        pub host: ContractAddress,
        pub booking_amount: felt252,
        pub timestamp: felt252
    }

    #[derive(Drop, starknet::Event)]
    pub struct PaymentReleased {
        #[key]
        pub guest: ContractAddress,
        #[key]
        pub listing_id: felt252,
        pub host: ContractAddress,
        pub booking_amount: felt252,
        pub timestamp: felt252
    }

    #[derive(Drop, starknet::Event)]
    pub struct CheckInConfirmed {
        #[key]
        pub guest: ContractAddress,
        #[key]
        pub listing_id: felt252,
        pub timestamp: felt252
    }

    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, Vec, VecTrait, MutableVecTrait, Map, StorageMapReadAccess, StorageMapWriteAccess
    };
    use core::starknet::{ContractAddress, get_caller_address};

    #[storage]
    pub struct Storage {
        transactions: Map<(ContractAddress, felt252), TransactionData>, // (guest, listing_id) => TransactionData
        refund_requests: Map<(ContractAddress, felt252), TransactionData>, // (guest, listing_id) => TransactionData
        check_in: Map<(ContractAddress, felt252), bool>, // (guest, listing_id) => check-in status
    };

    #[constructor]
    fn constructor(ref self: ContractState, host: ContractAddress) {
        self.host.write(host);
    }

    #[abi(embed_v0)]
    impl TransactionHandlerImpl of super::ITransactionHandler<TContractState> {
        fn book_listing(ref self: ContractState, new_listing: TransactionData) {

            let caller = get_caller_address();
            let guest = new_listing.guest;

            assert(caller == guest, "Only the guest can book a listing");

            let key = (new_listing.guest, new_listing.listing_id);

            self.transactions.write(key, new_listing);

            self.emit(Event::ListingBooked {
                guest: new_listing.guest,
                listing_id: new_listing.listing_id,
                host: new_listing.host,
                booking_amount: new_listing.booking_amount,
                timestamp: new_listing.timestamp
            })
        }

        fn initiate_refund(ref self: ContractState, refund_info: TransactionData) {

            let caller = get_caller_address();
            let guest = refund_info.guest;

            assert(caller == guest, "Only the guest can initiate a refund");
            
            let key = (refund_info.guest, refund_info.listing_id);

            self.refund_requests.write(key, refund_info);

            self.emit(Event::RefundInitiated {
                guest: refund_info.guest,
                listing_id: refund_info.listing_id,
                host: refund_info.host,
                booking_amount: refund_info.booking_amount,
                timestamp: refund_info.timestamp
            })
        }

        fn release_payment(ref self: ContractState, payment_info: TransactionData) {
            let caller = get_caller_address();
            let host = payment_info.host;

            assert(caller == host, "Only the host can release a payment");

            let key = (payment_info.guest, payment_info.listing_id);

            self.transactions.write(key, {});

            self.emit(Event::PaymentReleased {
                guest: payment_info.guest,
                listing_id: payment_info.listing_id,
                host: payment_info.host,
                booking_amount: payment_info.booking_amount,
                timestamp: payment_info.timestamp
            })
        }

        fn confirm_check_in(ref self: ContractState, check_in_info: TransactionData) {
            let caller = get_caller_address();
            let guest = check_in_info.guest;

            assert(caller == guest, "Only the guest can confirm check-in");

            let key = (check_in_info.guest, check_in_info.listing_id);

            self.check_in.write(key, true);

            self.emit(Event::CheckInConfirmed {
                guest: check_in_info.guest,
                listing_id: check_in_info.listing_id,
                timestamp: check_in_info.timestamp
            })
        }
    }
}