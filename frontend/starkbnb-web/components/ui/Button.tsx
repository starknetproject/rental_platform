import { IconType } from "react-icons"


type ButtonProps = {
    text: string,
    dark: boolean,
    type: "submit" | "reset" | "button" | undefined,
    active?: boolean,
    icon?: IconType,
    iconsize?: 1 | 2,
    disabled?: boolean,
    full?: boolean,
    mobileFull?: boolean,
    clickHandler?: () => void,
}

const Button = ({ text, dark, active, disabled, full, mobileFull, clickHandler, type, icon, iconsize }: ButtonProps) => {
    const Icon = icon
  return (
    <button 
        className={`
            ${dark? 'bg-blue-600 text-white hover:bg-blue-700': 'border border-blue-600 text-blue-600 hover:bg-[#efebff]'} 
            ${disabled ? 'bg-blue-200 text-white hover:cursor-not-allowed':''} 
            ${full? 'md:w-[100%]':'md:w-auto'} 
            ${mobileFull? 'w-100':'w-auto'} 
            ${active ? 'bg-blue-800':''}
            rounded-lg grid place-items-center
        `}
        type={type}
        onClick={clickHandler}
        disabled={disabled}
    >
            className="px-2 sm:px-6 py-2 sm:py-3 text-center text-balance whitespace-nowrap font-bold flex items-center justify-center gap-3"
        >
            {Icon && <Icon className={`${iconsize == 2? 'text-xl': ''}`}/>}
            <p>{text}</p>

    </button>
  )
}

export default Button