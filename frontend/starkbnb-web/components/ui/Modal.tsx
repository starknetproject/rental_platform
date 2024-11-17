import React from 'react'

type ModalProps = {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}

export const Modal = ({isOpen, onClose, children} : ModalProps) => {
    if (!isOpen) return null
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center'>
        <div className='bg-gray-900 rounded-lg shadow-xl px-6 py-4 w-fit'>
            <div className="flex justify-end">
                <button className="text-white hover:text-gray-700" onClick={onClose}>
                    ×
                </button>
            </div>
            <div className="p-4">{children}</div>
        </div>
    </div>
  )
}
