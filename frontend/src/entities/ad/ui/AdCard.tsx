import placeholder from './assets/img_placeholder.png'
import styles from './AdCard.module.css'
import type { AdCategory } from '../model/types.ts'

interface AdCardProps{
  id: string,
  title: string,
  price: number,
  category: AdCategory,
  needsRevision: boolean
}

const CATEGORY_TRANSLATIONS: Record<AdCategory, string> = {
  auto: 'Авто',
  real_estate: 'Недвижимость',
  electronics: 'Электроника'
};

const AdCard = ({title, price, category, needsRevision}: AdCardProps) => {
  return(
      <div className={styles.card}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={placeholder} alt='плейсхолдер'/>
        </div>
        <div className={styles.content}>
          <span className={styles.category}>{CATEGORY_TRANSLATIONS[category]}</span>
          <p className={styles.title}>{title}</p>
          <p className={styles.price}>{price} ₽</p>
          {needsRevision &&
            <span className={styles.needsRevision}>
              <span className={styles.dot}></span>
              Требует доработки
            </span>
          }
        </div>
      </div>
  )
}

export default AdCard;