import { useState } from "react";
import Button from "./ui/Button";
import { Modal } from "./ui/Modal";
import { FaCirclePlus } from "react-icons/fa6";

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
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <Button 
                text="Become a Host" 
                type="button" 
                dark 
                icon={FaCirclePlus} 
                iconsize={2}
            />
            <HostModal isOpen={isOpen} handleToggleModal={handleToggleModal}/>
        </div>
    )
}

export default HostButton