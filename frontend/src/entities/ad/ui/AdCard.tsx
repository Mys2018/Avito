import { Link } from 'react-router-dom';
import placeholder from './assets/img_placeholder.png';
import styles from './AdCard.module.css';
import type { AdCategory, AdParams } from '../model/types.ts';
import { calculateNeedsRevision } from '../lib/validateAd';

interface AdCardProps {
  id: string;
  title: string;
  price: number;
  category: AdCategory;
  description?: string;
  params?: AdParams;

  needsRevision?: boolean; 
}

const CATEGORY_TRANSLATIONS: Record<AdCategory, string> = {
  auto: 'Авто',
  real_estate: 'Недвижимость',
  electronics: 'Электроника'
};

const AdCard = ({ id, title, price, category, description, params }: AdCardProps) => {

  const isRevisionNeeded = calculateNeedsRevision({ category, description, params });

  return (
    <Link to={`/ads/${id}`} className={styles.card}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={placeholder} alt='плейсхолдер' />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{CATEGORY_TRANSLATIONS[category]}</span>
        <p className={styles.title}>{title}</p>
        <p className={styles.price}>{price} ₽</p>
        {isRevisionNeeded && (
          <span className={styles.needsRevision}>
            <span className={styles.dot}></span>
            Требует доработки
          </span>
        )}
      </div>
    </Link>
  );
};

export default AdCard;