import { useTranslation } from '@/context/i18nContext';
import '../../styles/components/card.css'
import { LanguageSelector } from "@/components/language/LanguageSelector";

export default function TaskEmpty() {
    const {translate} = useTranslation();
  
  return (
    <div className="task-empty">
      <p>{translate.messages.noTasks}</p>
    </div>
  );
}
