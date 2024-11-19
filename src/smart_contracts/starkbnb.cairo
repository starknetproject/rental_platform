#[starknet::contract]
mod starkbnb_contract {
    use starknet::ContractAddress;
    use starknet::storage::{
        Map, StoragePathEntry, Vec, StoragePointerReadAccess, VecTrait, MutableVecTrait,
        StoragePointerWriteAccess
    };
    use rental_platform::interfaces::{guest::IGuestHandler, host::IHostHandler};
    use rental_platform::components::contract_service;
    use rental_platform::structs::host::{Service, BookedServiceEvent};

    #[storage]
    struct Storage {
        broker: ContractAddress,
        holders: Vec::<ContractAddress>,
    }

    // TODO: Make sure a 'booked service' event is available.
    // Guest's side, take note.
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event { // BookedService: BookedService
    }

    /// Might be edited in the future. The broker is address automated for the sending and
    /// receiving of tokens, both from the host, and the guest, and charges sent to the
    /// third parameter, the devs as holders. Subject to change.
    /// The broker should be lock away after setup, and ownership will be handed to the holders.
    /// TODO: Refine this ownership well.
    #[constructor]
    fn constructor(
        ref self: ContractState, broker: ContractAddress, holders: Array<ContractAddress>
    ) {
        // contract_service::initialize_contract(broker, holders);
        self.broker.write(broker);
        for holder in holders {
            self.holders.append().write(holder);
        };
        // initialize the service count here from the private method of the host component
    }
}
