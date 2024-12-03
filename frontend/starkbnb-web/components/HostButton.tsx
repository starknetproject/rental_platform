import Button from "./ui/Button";
import { FaCirclePlus } from "react-icons/fa6";
 
const HostButton = () => {

    return (
        <div>
            {/* <Button 
                text="Become a Host" 
                type="button" 
                dark 
                icon={FaCirclePlus} 
                iconsize={2}
                // clickHandler={handleToggleModal}
            /> */}
            <button className="flex items-center justify-center gap-2 px-6 py-2 bg-black text-white rounded-3xl">
                <FaCirclePlus />
                <p>Become a Host</p>
            </button>
        </div>
    )
}

export default HostButton