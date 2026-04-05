import type { Ad, AdCategory } from '../model/types';

export const FIELD_LABELS: Record<string, string> = {
  description: 'Описание',
  brand: 'Бренд',
  model: 'Модель',
  yearOfManufacture: 'Год выпуска',
  transmission: 'Коробка передач',
  mileage: 'Пробег',
  enginePower: 'Мощность двигателя',
  type: 'Тип',
  address: 'Адрес',
  area: 'Площадь',
  floor: 'Этаж',
  condition: 'Состояние',
  color: 'Цвет',
};

export const VALUE_TRANSLATIONS: Record<string, string> = {

  automatic: 'Автомат',
  manual: 'Механика',

  flat: 'Квартира',
  house: 'Дом',
  room: 'Комната',

  phone: 'Телефон',
  laptop: 'Ноутбук',
  misc: 'Другое',

  new: 'Новое',
  used: 'Б/У',
};

const CATEGORY_FIELDS: Record<AdCategory, string[]> = {
  auto: ['brand', 'model', 'yearOfManufacture', 'transmission', 'mileage', 'enginePower'],
  real_estate: ['type', 'address', 'area', 'floor'],
  electronics: ['type', 'brand', 'model', 'condition', 'color'],
};

export const getMissingFields = (ad: Ad | any): string[] => {
  const missing: string[] = [];

  if (!ad.description || ad.description.trim() === '') {
    missing.push('description');
  }

  const expectedParams = CATEGORY_FIELDS[ad.category as AdCategory] || [];
  const params = ad.params || {};

  expectedParams.forEach(field => {
    const value = params[field];
    if (value === undefined || value === null || value === '') {
      missing.push(field);
    }
  });

  return missing;
};

export const getMissingFieldLabels = (ad: Ad | any): string[] => {
  return getMissingFields(ad).map(field => FIELD_LABELS[field] || field);
};

export const calculateNeedsRevision = (ad: Ad | any): boolean => {
  return getMissingFields(ad).length > 0;
};

export const getLabel = (key: string): string => FIELD_LABELS[key] || key;

export const getValueLabel = (value: any): string => {
  if (typeof value === 'string' && VALUE_TRANSLATIONS[value]) {
    return VALUE_TRANSLATIONS[value];
  }
  return String(value);
};
