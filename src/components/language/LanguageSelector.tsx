"use client";

import { useTranslation } from "@/context/i18nContext";
import { Language } from "@/locales/translations";

const languages: { value: Language; label: string }[] = [
  { value: "es", label: "ESPAÑOL" },
  { value: "en", label: "ENGLISH" },
  { value: "pt", label: "PORTUGUÊS" },
  { value: "ja", label: "日本語" },
];

export const LanguageSelector = () =>{
    const {language, setLanguage} = useTranslation();

    return(
        <>
            <select value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className=""
            >
                {languages.map((lang)=>(
                    <option key={lang.value} 
                            value={lang.value}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </>
    )
}