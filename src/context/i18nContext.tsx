"use client"

import { createContext,useContext,useState } from "react"
import { translations,Language,Translations } from "@/locales/translations"

type I18nContextProps = {
    language: Language;
    setLanguage: (lang: Language) => void;
    translate: Translations;
};

export const I18nContext = createContext<I18nContextProps>(
    {} as I18nContextProps
)

export const useTranslation = () => useContext(I18nContext);

interface i18ProviderProps {
    children: React.ReactNode;
}

export const I18nProvider = ({children}:i18ProviderProps) =>{
    const [language, setLanguage] = useState<Language>("es")

    const translate = translations[language];
    
    return (
        <I18nContext.Provider value={{language,setLanguage,translate}}>
            {children}
        </I18nContext.Provider>
    )
}