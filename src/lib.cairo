mod interfaces {
    pub mod guest;
    pub mod host;
}

mod service {
    pub mod guest_service;
    pub mod host_service;
}

mod smart_contracts {
    pub mod poller;
    pub mod starkbnb;
}