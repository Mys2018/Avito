import { useMutation } from "@tanstack/react-query";
import { generateAiContent } from "../api/openRouterApi";

type AiActionType = 'description' | 'price';

interface AiAssistantProps {
  actionType: AiActionType;
  adData: any;
}

export const useAiAssistant = () => {
  return useMutation({
    mutationFn: async ({ actionType, adData }: AiAssistantProps) => {
      let prompt = "";
      
      const parametersStr = Object.entries(adData.params || {})
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ");
          
      const baseInfo = `Категория: ${adData.category}. Название: ${adData.title}. Цена: ${adData.price} руб. Параметры: ${parametersStr}.`;

      if (actionType === 'description') {
        prompt = `Составь привлекательное описание для объявления на сайте Classifieds. 
Данные: ${baseInfo}. 
Напиши продающий, грамотный текст. Верни только текст описания без лишних вступлений вроде "Вот описание:". Пиши только обычным текстом (plain text), НЕ ИСПОЛЬЗУЙ markdown разметку (никаких звездочек, жирного текста, заголовков и списков).`;
      } else if (actionType === 'price') {
        prompt = `Оцени рыночную стоимость товара для площадки объявлений. 
Данные товара: ${baseInfo}.
Ответь кратко: сначала напиши одно число (рекомендуемая цена в рублях, без пробелов, например 10000), а затем со следующей строки очень короткое обоснование. Не генерируй длинные тексты.`;
      }

      return generateAiContent(prompt);
    }
  });
};
