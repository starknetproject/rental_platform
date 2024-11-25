use rental_platform::components::host_service::HostHandlerComponent;
use rental_platform::interfaces::host::IHostHandler;
use rental_platform::smart_contracts::starkbnb::Starkbnb;
use rental_platform::structs::host::Service;
use starknet::{ get_contract_address, contract_address_const };
use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
use starknet::testing::set_caller_address;
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address};

type TestingState = HostHandlerComponent::ComponentState<Starkbnb::ContractState>;

impl TestingStateDefault of Default<TestingState> {
    fn default() -> TestingState {
        HostHandlerComponent::component_state_for_testing()
    }
}


#[test]
fn test_upload_and_update() {
    let mut host: TestingState = Default::default();
    let owner = contract_address_const::<'owner'>();
    set_caller_address(owner);

    let name_1: felt252 = 'Pascal';
    let name_2: felt252 = 'Champ';
    let (uploaded_1, id_1) = host.upload_service(name_1);
    let (_, id_2) = host.upload_service(name_2);
    println!("{}", id_1);
    assert!(uploaded_1, "Couldn't upload");

    let cost_1: u256 = 56000000_u256;
    let cost_test: u256 = 60000000_u256;
    let cost_2: u256 = 70000000_u256;

    let costs: Array<u256> = array![cost_test, cost_2];

    host.update_service(id_1, cost_1);
    host.update_service(id_1, cost_test);
    host.update_service(id_2, cost_2);

    let services: Array<Service> = host.get_services_by_host(owner);
    assert(services.len() == 2_u32.into(), 'Length is not two.');

    for i in 0..services.len() {
        let service: Service = *services.at(i);
        assert(service.owner == owner, 'Owner mismatch.');
        assert(service.data.cost == *costs.at(i), 'Cost mismatch.')
    };

    assert(host.services_count.read() == 2_u64, 'services count not equal to 2')
}

#[test]
#[should_panic]
fn test_panic_upload() {
    let mut host: TestingState = Default::default();
    let owner = contract_address_const::<'owner'>();
    let name_1: felt252 = 'Pascal';
    let (uploaded, id) = host.upload_service(name_1);
    let (uploaded_1, id_1) = host.upload_service(name_1);
}
    
    // fn update_service(ref self: TContractState, service_id: felt252, cost: u128);
    // fn is_eligible(ref self: TContractState, service_id: felt252) -> bool;
    // fn is_open(ref self: TContractState, service_id: felt252) -> (bool, u64);
    // fn get_services_by_host(self: @TContractState, host: ContractAddress) -> Array<Service>;


    // Further test events
