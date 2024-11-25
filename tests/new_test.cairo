use rental_platform::components::host_service::{HostHandlerComponent};
use rental_platform::interfaces::host::{IHostHandler, IHostHandlerDispatcher, IHostHandlerDispatcherTrait};
use rental_platform::smart_contracts::starkbnb::{Starkbnb};
use rental_platform::structs::host::Service;
use starknet::{ get_contract_address, contract_address_const };
use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
use starknet::ContractAddress;
// use starknet::testing::set_contract_address;
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address};




fn deploy(name: ByteArray) -> (ContractAddress, IHostHandlerDispatcher) {
    let contract = declare(name).unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@array![]).unwrap();
    (contract_address, IHostHandlerDispatcher { contract_address })
}


#[test]
fn test_upload_and_update() {
    let (contract_address, host) = deploy("Starkbnb");
    // let owner = contract_address_const::<'owner'>();
    // set_contract_address(owner);
    let caller_address: ContractAddress = 'owner'.try_into().unwrap();
    start_cheat_caller_address(contract_address, caller_address);

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

    let services: Array<Service> = host.get_services_by_host(caller_address);
    assert(services.len() == 2_u32.into(), 'Length is not two.');

    for i in 0..services.len() {
        let service: Service = *services.at(i);
        assert(service.owner == caller_address, 'Owner mismatch.');
        assert(service.data.cost == *costs.at(i), 'Cost mismatch.')
    };

    // assert(host.services_count.read() == 2_u64, 'services count not equal to 2')
}