import type {InputProps} from '../../types/components'
import '../../styles/ui/input.css'


export function PressInput({value,onChange,placeholder}:InputProps){
    
    return(
        <>
        <input className="mainInput" placeholder={placeholder="Put Your Task"} value={value} onChange={onChange}/>
        </>
    )
}
