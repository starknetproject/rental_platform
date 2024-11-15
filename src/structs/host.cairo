/// Here are all the structs used for the host

use starknet::ContractAddress;

/// This is the main struct of the host's service (house) details to be stored.
///     owner -- The contract address of the owner
///     wishlist_count -- The number of addresses that added this to their wishlist. Ranks it by
///     popular together with the booking rate of a certain value to be completed by a function in
///     the service class.
///     booking_rate -- would be calculated in the future, initially set to zero
///     is_open -- bool value whether or not the service is open to be booked. Opens when the host
///     has staked an amount, and closed when the service has been booked, and the cycle repeats
///     itself.
///     cost -- cost of service injected by the owner
///     stake -- stake amount sent by the owner to the broker. TODO: These two values shall be
///     compared in the future.
///
#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Host {
    owner: ContractAddress,
    wishlist_count: u64,
    booking_rate: u8,
    is_open: bool,
    cost: u128,
    stake: u128
}

/// An Event struct to be emitted each time a service is booked
#[derive(Drop, starknet::Event)]
pub struct BookedService {
    #[key]
    host_address: ContractAddress,
    guest_address: ContractAddress
}
