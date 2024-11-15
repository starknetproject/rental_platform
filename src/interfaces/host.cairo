use starknet::ContractAddress;

/// For Devs, note:
/// 1.  upload_service uploads a service to the dApp, which will in the future TODO: Start a poll.
///     Automatically returns true with a successful message as a (bool, felt252), else returns the
///     opposite if for some reason the upload fails.
///
/// 2.  is_eligible -- it is automatically set to false (using your implementation anyway) until the
///     poll has been concluded. If in favour with the host, it is set to true, else it remains
///     false.
///     TODO: For a Guest to book a service, always sheck this value.
///
/// 3.  set_eligble -- sets the eligibility of a service. Subject to change.
#[starknet::interface]
pub trait IHostHandler<TContractState> {
    fn upload_service(ref self: TContractState, owner: ContractAddress) -> (bool, felt252);
    fn is_eligible(self: @TContractState, host: ContractAddress) -> bool;
    fn set_eligible(
        ref self: TContractState, host: ContractAddress
    ); // This might later end up being a private function
    fn is_open(self: @TContractState, host: ContractAddress) -> bool;
    // fn set_expected_open_time()
}
