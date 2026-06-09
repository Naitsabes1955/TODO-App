import { en } from "./en";
import { es } from "./es";
import { pt } from "./pt";
import { ja } from "./ja";

export const translations = {
    es,
    en,
    pt,
    ja
};

console.log(translations)


export type Language = "es" | "en" | "pt" | "ja";
export type Translations = typeof es;