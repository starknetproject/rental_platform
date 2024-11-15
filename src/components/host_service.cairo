#[starknet::component]
pub mod HostHandlerComponent {
    use starknet::ContractAddress;
    use starknet::storage::{ StoragePointerReadAccess, StoragePointerWriteAccess };
    use rental_platform::structs::host::Host;
    use rental_platform::interfaces::host::IHostHandler;

    #[storage]
    pub struct Storage {
        host: Host
    }

    // TODO: Emit an event each time a new service is uploaded
    // TODO: Emit an event each time a house is booked...

    #[embeddable_as(HostServiceImpl)]
    impl HostHandler<TContractState, +HasComponent<TContractState>> of IHostHandler<ComponentState<TContractState>> {
        fn upload_service(ref self: TContractState, host: ContractAddress) -> (bool, felt252) {

        }
        
        fn is_eligible(self: @TContractState, host: ContractAddress) -> bool {

        }
        
        fn set_eligible(ref self: TContractState, host: ContractAddress) {
            // here 
        }
        fn is_open(self: @TContractState, host: ContractAddress) -> bool {

        }
        
        // fn set_expected_open_time()
        fn delete_service(self: @TContractState, host: ContractAddress) -> bool {
            

        }

        fn add(ref x: u8, y: u8) -> (u16, x) {

        }
    }
}