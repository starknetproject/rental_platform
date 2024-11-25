#[starknet::contract]
pub mod Poll {
    use starknet::{ ContractAddress, get_caller_address };
    use starknet::storage::{
        Map, StoragePathEntry, Vec, StoragePointerReadAccess, VecTrait, MutableVecTrait,
        StoragePointerWriteAccess
    };
    use rental_platform::structs::poller::{ Poll, VotedEvent, PollResolve, PollType };
    use rental_platform::constants::poll_constants::{
        BASE_SET_VOTES, MAX_SET_VOTES, STEEPNESS_FACTOR, get_empty_poll
    };
    use rental_platform::interfaces::poller::IPollHandler;

    /// First param maps the poll id to a list of voters
    #[storage]
    pub struct Storage {
        voters: Map::<felt252, Vec<ContractAddress>>,
        polls: Map::<felt252, Poll>,
        caller: Map::<ContractAddress, u16>,
        total_no_of_polls: u64
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.total_no_of_polls.write(0);
    }

    // *******************************************************************************************************
    //                                      ABI AND INTERNALIMPL
    // *******************************************************************************************************

    #[abi(embed_v0)]
    impl PollHandler of IPollHandler<ContractState> {
        fn initialize_default_poll(ref self: ContractState, name: felt252) -> Poll {
            self._initialize_poll(PollType::Sig)
        }

        fn initialize_poll(
            ref self: ContractState, name: felt252, poll_type: PollType, base_set_voters: u64, max_set_voters: u64
        ) -> Poll {
            // Coming Soon
            get_empty_poll()
        }

        fn vote(ref self: ContractState, poll_id: felt252) {

        }

        fn set_open(ref self: ContractState, poll_id: felt252) {

        }

        fn get_open_polls(self: @ContractState) -> Array<Poll> {
            let mut polls: Array<Poll> = array![];
            polls
        }

        fn get_poll_by_owner(self: @ContractState, owner: ContractAddress) -> Array<Poll> {
            let mut polls: Array<Poll> = array![];
            polls
        }

        fn get_all_polls(self: @ContractState) -> Array<Poll> {
            let mut polls: Array<Poll> = array![];
            polls
        }
    }
    

    #[generate_trait]
    impl InternalImpl of InternalTrait {



// # Example usage
// function initialize_poll(user):
//     polls_initialized = get_polls_initialized_by_user(user) # Retrieve user's poll count
//     min_votes = calculate_min_votes(polls_initialized)
    
//     # Create a poll with the calculated minimum votes
//     poll = create_poll(user, min_votes)
//     increment_user_poll_count(user) # Update poll count for the user
//     return poll

        fn _initialize_poll(ref self: ContractState, poll_type: PollType) -> Poll {
            let mut set_votes = self._calculate_set_votes(poll_type);
            get_empty_poll()
        }

        fn _calculate_set_votes(ref self: ContractState, poll_type: PollType) -> u64 {
            let caller: ContractAddress = get_caller_address();
            let polls_initialized: u16 = self.caller.entry(caller).read();
            if polls_initialized == 0 {
                return BASE_SET_VOTES;
            }

            let mut set_votes = match poll_type {
                PollType::Log => 0, // Coming Soon
                PollType::Quad => {
                    BASE_SET_VOTES + STEEPNESS_FACTOR.into() * (polls_initialized.into() * polls_initialized.into())
                },
                PollType::Sig => {
                    let mut normalized = polls_initialized / (polls_initialized + STEEPNESS_FACTOR.into());
                    BASE_SET_VOTES + (MAX_SET_VOTES - BASE_SET_VOTES) * normalized.into()
                },
                _ => (BASE_SET_VOTES + polls_initialized.into() * STEEPNESS_FACTOR.into()),
            };

            if set_votes > MAX_SET_VOTES {
                return MAX_SET_VOTES;
            }

            return set_votes;
        }
    }
}

