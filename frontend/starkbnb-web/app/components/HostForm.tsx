import { useState } from "react";
import Button from "./ui/Button";
import { Modal } from "./ui/Modal";
import { FaCirclePlus } from "react-icons/fa6";

const HostForm = () => {
    return ( 
        <form action="">
            
        </form>
     );
}

type HostModalProps = {
    isOpen: boolean,
    handleToggleModal: () => void
}

const HostModal = ({isOpen, handleToggleModal}: HostModalProps) => {
    if (!isOpen) return null

    return ( 
        <Modal isOpen={isOpen} onClose={handleToggleModal}>
            <div className="bg-gray-700 w-full h-full">
                Let me see
            </div>
        </Modal>
     );
}
 
const HostButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleToggleModal = () => {
        isOpen? setIsOpen(false) : setIsOpen(true)
    }

    return (
        <div>
            <Button 
                text="Become a Host" 
                type="button" 
                dark 
                icon={FaCirclePlus} 
                iconsize={2}
                clickHandler={handleToggleModal}
            />
            <HostModal isOpen={isOpen} handleToggleModal={handleToggleModal}/>
        </div>
    )
}

export default HostButton