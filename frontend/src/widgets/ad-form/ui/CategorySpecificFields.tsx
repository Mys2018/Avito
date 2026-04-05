import type { AdCategory } from '@/entities/ad/model/types';
import styles from './AdForm.module.css';

interface CategorySpecificFieldsProps {
  category: AdCategory;
  params: any;
  onChange: (newParams: any) => void;
}

export const CategorySpecificFields = ({ category, params, onChange }: CategorySpecificFieldsProps) => {
  const handleChange = (key: string, value: any) => {
    onChange({ ...params, [key]: value });
  };

  switch (category) {
    case 'auto':
      return (
        <>
          <div className={styles.formGroup}>
            <label className={styles.label}>Бренд</label>
            <input className={styles.input} value={params.brand || ''} onChange={e => handleChange('brand', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Модель</label>
            <input className={styles.input} value={params.model || ''} onChange={e => handleChange('model', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Год выпуска</label>
            <input className={styles.input} type="number" value={params.yearOfManufacture || ''} onChange={e => handleChange('yearOfManufacture', Number(e.target.value))} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Коробка передач</label>
            <select className={styles.select} value={params.transmission || ''} onChange={e => handleChange('transmission', e.target.value)}>
              <option value="">Не выбрано</option>
              <option value="automatic">Автомат</option>
              <option value="manual">Механика</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Пробег</label>
            <input className={styles.input} type="number" value={params.mileage || ''} onChange={e => handleChange('mileage', Number(e.target.value))} />
          </div>
        </>
      );
    case 'real_estate':
      return (
        <>
          <div className={styles.formGroup}>
            <label className={styles.label}>Тип недвижимости</label>
            <select className={styles.select} value={params.type || ''} onChange={e => handleChange('type', e.target.value)}>
              <option value="">Не выбрано</option>
              <option value="flat">Квартира</option>
              <option value="house">Дом</option>
              <option value="room">Комната</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Площадь</label>
            <input className={styles.input} type="number" value={params.area || ''} onChange={e => handleChange('area', Number(e.target.value))} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Этаж</label>
            <input className={styles.input} type="number" value={params.floor || ''} onChange={e => handleChange('floor', Number(e.target.value))} />
          </div>
        </>
      );
    case 'electronics':
      return (
        <>
          <div className={styles.formGroup}>
            <label className={styles.label}>Тип устройства</label>
            <select className={styles.select} value={params.type || ''} onChange={e => handleChange('type', e.target.value)}>
              <option value="">Не выбрано</option>
              <option value="phone">Телефон</option>
              <option value="laptop">Ноутбук</option>
              <option value="misc">Другое</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Состояние</label>
            <select className={styles.select} value={params.condition || ''} onChange={e => handleChange('condition', e.target.value)}>
              <option value="">Не выбрано</option>
              <option value="new">Новое</option>
              <option value="used">Б/У</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Модель</label>
            <input className={styles.input} value={params.model || ''} onChange={e => handleChange('model', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Цвет</label>
            <input className={styles.input} value={params.color || ''} onChange={e => handleChange('color', e.target.value)} />
          </div>
        </>
      );
    default:
      return null;
  }
};
