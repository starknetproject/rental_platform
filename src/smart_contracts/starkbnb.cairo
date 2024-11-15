#[starknet::contract]
mod starkbnb_contract {
    use starknet::ContractAddress;
    use rental_platform::interfaces::{ guest::IGuestHandler, host::IHostHandler };
    use openzeppelin::access::ownable::OwnableComponent;

    #[storage]
    struct Storage {
        broker: ContractAddress,
        holders: Array<ContractAddress>,
        services_count: u64
    }

    // TODO: Make sure a 'booked house' event is available.
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
    }

    /// Might be edited in the future. The broker is address automated for the sending and
    /// receiving of tokens, both from the host, and the guest, and charges sent to the
    /// third parameter, the devs as holders. Subject to change.
    #[constructor]
    fn constructor(ref self: ContractState, broker: ContractAddress, holders: Array<ContractAddress>) {

    }

}
