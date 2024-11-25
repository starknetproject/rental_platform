use starknet::ContractAddress;

// TODO: In the component of this poller, The storage should store a mapped value of an address to a
// Poll To initialize another poll, there should be an algorithm that checks the number of entries
// and address has to return the new amount of voters
#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Poll {
    id: felt252,
    owner: ContractAddress,
    max_voters: u64
}

#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct VotedEvent {
    #[key]
    poll_id: felt252,
    voter: ContractAddress
}
///        CREATE THIS STORAGE
///
/// ..    add a voters: Map<felt252, Vec::<ContractAddress>>, maps a poll id to the list of voters


