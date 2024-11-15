import React from 'react'

type ButtonProps = {
    text: string,
    dark: boolean,
    active?: boolean,
    icon?: React.ComponentState | null,
    disabled?: boolean,
    full?: boolean,
    mobileFull?: boolean,
    clickHandler?: () => void,
}

const Button = ({ text, dark, active, disabled, full, mobileFull, clickHandler, icon }: ButtonProps) => {
    const Icon = icon || null
  return (
    <button 
        className={`
            ${dark && !disabled ? 'bg-blue-600 text-white hover:bg-blue-700': 'border border-blue-600 text-blue-600 hover:bg-[#efebff]'}
            ${disabled ? 'bg-blue-200 text-white hover:cursor-not-allowed':''}
            ${full? 'md:w-[100%]':'md:w-auto'}
            ${mobileFull? 'w-100':'w-auto'}
            ${active && 'bg-blue-800'}
        `} 
        onClick={clickHandler}
        disabled={disabled}
    >
        <p
            className={`
                px-6 sm:px-10 py-2 sm:py-3 text-center text-balance whitespace-nowrap font-bold    
            `}
        >
            <Icon />
            {text}
        </p>
    </button>
  )
}

export default Button