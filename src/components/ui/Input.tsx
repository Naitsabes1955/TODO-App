import type {InputProps} from '../../types/components'
import '../../styles/ui/input.css'
import { useTranslation } from "@/context/i18nContext";
import { LanguageSelector } from "@/components/language/LanguageSelector";


export function PressInput({value,onChange,placeholder}:InputProps){
    const {translate} = useTranslation();
    return(
        <>
        <input className="mainInput" placeholder={placeholder=translate.form.placeholder} value={value} onChange={onChange}/>
        </>
    )
}
