import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Ad, ItemUpdateIn } from '@/entities/ad/model/types';
import { useUpdateAd } from '@/entities/ad/api/queries';
import { useAiAssistant, AiSuggestionBlock } from '@/features/ai-assistant';
import { CategorySpecificFields } from './CategorySpecificFields';
import styles from './AdForm.module.css';

interface AdFormProps {
  adId: string;
  initialData: Ad;
}

export const AdForm = ({ adId, initialData }: AdFormProps) => {
  const navigate = useNavigate();
  const { mutateAsync: updateAdMutation, isPending: isSaving } = useUpdateAd();

  const [formData, setFormData] = useState<ItemUpdateIn>(() => {
    const draft = localStorage.getItem(`ad-draft-${adId}`);
    if (draft) {
      try {
        return JSON.parse(draft);
      } catch (e) {

      }
    }
    return {
      title: initialData.title,
      category: initialData.category,
      price: initialData.price || 0,
      description: initialData.description || '',
      params: initialData.params || {}
    };
  });

  const [showDraftNotice, setShowDraftNotice] = useState(() => !!localStorage.getItem(`ad-draft-${adId}`));

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(`ad-draft-${adId}`, JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timer);
  }, [formData, adId]);

  const handleChange = (field: keyof ItemUpdateIn, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleParamsChange = (newParams: any) => {
    handleChange('params', newParams);
  };

  const cancelDraft = () => {
    localStorage.removeItem(`ad-draft-${adId}`);
    setShowDraftNotice(false);
    setFormData({
      title: initialData.title,
      category: initialData.category,
      price: initialData.price || 0,
      description: initialData.description || '',
      params: initialData.params || {}
    });
  };

  const { mutate: callAiDescription, isPending: isDescLoading, data: descData, reset: resetDesc } = useAiAssistant();
  const { mutate: callAiPrice, isPending: isPriceLoading, data: priceData, reset: resetPrice } = useAiAssistant();

  const handleGenerateDescription = () => {
    callAiDescription({ actionType: 'description', adData: formData });
  };

  const handleEstimatePrice = () => {
    callAiPrice({ actionType: 'price', adData: formData });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || formData.price <= 0 || !formData.category) {
      alert("Пожалуйста, заполните все обязательные поля корректно.");
      return;
    }

    try {
      await updateAdMutation({ id: adId, payload: formData });
      localStorage.removeItem(`ad-draft-${adId}`);
      navigate(`/ads/${adId}`);
    } catch (e) {
      console.error(e);
      alert("Ошибка при сохранении объявления.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formInfoContainer}>
      {showDraftNotice && (
        <div className={styles.draftNotice}>
          Обнаружен несохранённый черновик. <button type="button" onClick={cancelDraft} style={{ textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>Сбросить к исходным данным</button>
        </div>
      )}

      <div className={styles.formGroup}>
        <label className={styles.label}>Категория <span className={styles.required}>*</span></label>
        <select
          className={styles.select}
          value={formData.category}
          onChange={e => handleChange('category', e.target.value)}
          required
        >
          <option value="auto">Авто</option>
          <option value="real_estate">Недвижимость</option>
          <option value="electronics">Электроника</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Название <span className={styles.required}>*</span></label>
        <input
          className={styles.input}
          value={formData.title}
          onChange={e => handleChange('title', e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Цена (₽) <span className={styles.required}>*</span></label>
        <input
          className={styles.input}
          type="number"
          value={formData.price}
          onChange={e => handleChange('price', Number(e.target.value))}
          required
        />
        <div>
          <div className={styles.aiActions}>
            <button type="button" onClick={handleEstimatePrice} className={styles.aiBtn}>
              Узнать рыночную цену
            </button>
          </div>
          <AiSuggestionBlock
            isLoading={isPriceLoading}
            content={priceData || null}
            onApply={() => {

              const match = priceData?.match(/\d+/);
              if (match) {
                handleChange('price', Number(match[0]));
              }
              resetPrice();
            }}
            onDiscard={resetPrice}
          />
        </div>
      </div>

      <CategorySpecificFields
        category={formData.category}
        params={formData.params}
        onChange={handleParamsChange}
      />

      <div className={styles.formGroup}>
        <label className={styles.label}>Описание</label>
        <textarea
          className={styles.textarea}
          value={formData.description}
          onChange={e => handleChange('description', e.target.value)}
          placeholder="Опишите ваш товар..."
        />
        <div className={styles.aiActions}>
          <button type="button" onClick={handleGenerateDescription} className={styles.aiBtn}>
            Придумать описание
          </button>
        </div>
        <AiSuggestionBlock
          isLoading={isDescLoading}
          content={descData || null}
          onApply={() => { handleChange('description', descData); resetDesc(); }}
          onDiscard={resetDesc}
        />
      </div>

      <div className={styles.footer}>
        <button type="submit" className={styles.submitBtn} disabled={isSaving}>
          {isSaving ? 'Сохранение...' : 'Сохранить'}
        </button>
        <button type="button" className={styles.cancelBtn} onClick={() => navigate(-1)}>
          Отменить
        </button>
      </div>
    </form>
  );
};
