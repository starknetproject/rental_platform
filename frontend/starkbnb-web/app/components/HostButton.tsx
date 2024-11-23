import Button from "./ui/Button";
import { FaCirclePlus } from "react-icons/fa6";
 
const HostButton = () => {

    return (
        <div>
            <Button 
                text="Become a Host" 
                type="button" 
                dark 
                icon={FaCirclePlus} 
                iconsize={2}
                // clickHandler={handleToggleModal}
            />
        </div>
    )
}

export default HostButton