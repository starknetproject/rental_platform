use starknet::ContractAddress;
use rental_platform::structs::poller::PollOutcome;

/// The interfaces used on the poller smart contract
/// get votes and compare, if eligible, interact with the starkbnb smart contract
/// 
/// The caller address is logged and returned in the poll outcome. Here if he loses, the outcome is sent to 
/// the starkbnb contract for further processing. The max_voters variable is calculated from the number of entries
/// The caller address has in the poll map in the storage. Should be a steep curve.
/// 
/// For each vote, log the address. No address should be allowed to vote more than once. Log the caller of this function
/// Emit an event for each vote. NOTE: first assert before each vote if a variable `vote_count` < `max_voters`. Once it
/// equals `max_voters`, immediately compute the outcome.
/// 
/// set open if the max stake has been reached, then the voting can commence. The initializer should feel free to share
/// the link.
#[starknet::interface]
pub trait IPollHandler<TContractState> {
    fn initialize_poll(ref self: TContractState) -> felt252; // OR NOT
    fn vote(ref self: TContractState) -> Poll;
    fn set_open(ref self: TContractState);
}


//        CHECK THESE FUNCTIONS. TO BE CONTINUED.


