#[starknet::contract]
mod starkbnb_contract {
    use starknet::ContractAddress;
    use starknet::storage::{
        Map, StoragePathEntry, Vec, StoragePointerReadAccess, VecTrait, MutableVecTrait,
        StoragePointerWriteAccess
    };
    use rental_platform::interfaces::{guest::IGuestHandler, host::IHostHandler};
    use rental_platform::service::contract_service;
    use rental_platform::structs::host::{Host, BookedService};
    use openzeppelin::access::ownable::OwnableComponent;

    #[storage]
    struct Storage {
        broker: ContractAddress,
        holders: Vec::<ContractAddress>,
        hosts: Map::<ContractAddress, Host>,
        services_count: u64
    }

    // TODO: Make sure a 'booked house' event is available.
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        BookedService: BookedService
    }

    /// Might be edited in the future. The broker is address automated for the sending and
    /// receiving of tokens, both from the host, and the guest, and charges sent to the
    /// third parameter, the devs as holders. Subject to change.
    #[constructor]
    fn constructor(
        ref self: ContractState, broker: ContractAddress, holders: Array<ContractAddress>
    ) {
        // contract_service::initialize_contract(broker, holders);
        self.broker.write(broker);
        self.services_count.write(0_u64);
        for holder in holders {
            self.holders.append().write(holder);
        };
        self.services_count.write(0);
    }
}
