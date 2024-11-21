'use client'

import { Connector, useAccount, useConnect } from "@starknet-react/core";
import { Modal } from "./ui/Modal";
import { useState } from "react";
import Button from "./ui/Button";
import { FaWallet } from "react-icons/fa";
import Image from "next/image";
import { trimString } from "../utils/helpers";

const loader = ({ src }: {src: string}) => {
    return src;
}

type WalletProps = {
    name: string, alt: string, src: string, connector: Connector, handleToggleModal: () => void
}

const Wallet = ({ name, alt, src, connector, handleToggleModal }: WalletProps) => {

    const { connect, status, connectAsync } = useConnect()
    const isSvg = src.substring(0, 4) === "<svg"

    const connectWallet = async(): Promise<void> => {
        console.log(status)
        await connectAsync({ connector })
        console.log(status)
        handleToggleModal()
    }

    return ( 
        <button
            className="hover:bg-outline-grey flex cursor-pointer items-center gap-4 p-[.2rem] text-start transition-all hover:rounded-[10px]"
            onClick={(e) => {
                connectWallet()
            }}
        >
            <div className="h-[2.2rem] w-[2.2rem] rounded-[5px]">
                {isSvg ? (
                        <div
                        className="h-full w-full rounded-[5px] object-cover"
                        dangerouslySetInnerHTML={{
                          __html: src ?? "",
                        }}
                      />
                    ) : (
                        <Image 
                            alt={alt}
                            src={src}
                            loader={loader}
                            unoptimized
                            width={70} height={70}
                            className="rounded-[5px] object-cover"
                        />
                        // <div
                            // className="w-28 md:w-32 h-28 md:h-32 mx-auto flex items-center"
                        //     style={{
                        //         backgroundImage: src,
                        //         backgroundSize: 'cover',
                        //         backgroundPosition: 'center'
                        //     }}
                        // >
                        // </div>
                    )
                }
            </div>
            <p className="text-white">
                {connector.available() ? `${connector.name}`:`Install ${connector.name}`}
            </p>
        </button>
     );
}

type ConnectModalProps = {
    isOpen: boolean,
    handleToggleModal: () => void,
}

const ConnectModal = ({isOpen, handleToggleModal}: ConnectModalProps) => {
    if (!isOpen) return null;

    const { connect, connectors } = useConnect()

    const getIconSrc = (icon: string | { dark: string, light: string }) => {
        if (!icon) return connectors[0].icon
        if (typeof icon === 'string') {
            return icon
        }
        return 'light' in icon? icon.light : '';
    }

    return ( 
        <Modal isOpen={isOpen} onClose={handleToggleModal}>
            <div className="flex flex-col gap-4" key={''}>
                {
                    connectors.map((connector, index) => {
                        const icon = connector.icon
                        return (
                            // <button
                            //     className="bg-blue-700 text-white px-3 py-4 rounded-lg font-bold"
                            //     key={connector.id}
                            //     onClick={() => {
                            //         connect({ connector })
                            //         handleToggleModal()
                            //     }}
                            // >
                            //     {/* <p>{connector.icon}</p> */}
                            //     Connect {connector.name}
                            // </button>
                            <Wallet 
                                key={connector.id || index}
                                src={getIconSrc(connector.icon).toString()}
                                name={connector.name}
                                alt="alt"
                                connector={connector}
                                handleToggleModal={handleToggleModal}
                            />
                        )
                    })
                }
            </div>
        </Modal>
     );
}
 
const ConnectorButton = () => {
    const { address } = useAccount()
    const [isOpen, setIsOpen] = useState(false)
    const handleToggleModal = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true)
    }
    
    return (
        <div>
            <Button text={address ? trimString(address, 10) : "Connect Wallet"} clickHandler={handleToggleModal} type="button" dark icon={FaWallet} iconsize={1}/>
            <ConnectModal isOpen={isOpen} handleToggleModal={handleToggleModal}/>
        </div> 
     );
}
 
export default ConnectorButton;