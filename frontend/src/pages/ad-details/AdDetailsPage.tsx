import { useParams, Link, useNavigate } from "react-router-dom";
import { useAdById } from "@/entities/ad/api/queries";
import placeholder from "@/entities/ad/ui/assets/img_placeholder.png";
import { getMissingFieldLabels, getLabel, getValueLabel } from "@/entities/ad/lib/validateAd";
import styles from "./AdDetailsPage.module.css";

const CATEGORY_TRANSLATIONS: Record<string, string> = {
  auto: 'Авто',
  real_estate: 'Недвижимость',
  electronics: 'Электроника'
};

const AdDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: ad, isLoading, isError } = useAdById(id || "");

  if (isLoading) {
    return <div className={styles.container}>Загрузка объявления...</div>;
  }

  if (isError || !ad) {
    return <div className={styles.container}>Ошибка при загрузке объявления или оно не найдено.</div>;
  }

  const { title, price, category, description, createdAt, updatedAt, params } = ad;
  const missingFieldLabels = getMissingFieldLabels(ad);

  const dateStr = new Date(createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
  });
  const updatedDateStr = new Date(updatedAt).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
  });

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>{title}</h1>
          <Link to={`/ads/${id}/edit`} className={styles.editBtn}>
            Редактировать
          </Link>
        </div>
        <div className={styles.actionsDate}>
          <span className={styles.price}>{price} ₽</span>
          <div className={styles.date}>
            Опубликовано: {dateStr}<br />
            {createdAt !== updatedAt && `Отрeдактировано: ${updatedDateStr}`}
          </div>
        </div>
      </div>

      <div className={styles.contentRow}>
        <div className={styles.imagePlaceholder}>
          <img className={styles.mainImage} src={placeholder} alt="Плейсхолдер" />
          <div className={styles.imagePlaceholderOverlay}>
            <img className={styles.secondaryImage} src={placeholder} alt="Плейсхолдер" />
            <img className={styles.secondaryImage} src={placeholder} alt="Плейсхолдер" />
            <img className={styles.secondaryImage} src={placeholder} alt="Плейсхолдер" />
            <img className={styles.secondaryImage} src={placeholder} alt="Плейсхолдер" />

          </div>
        </div>

        <div className={styles.infoBlock}>
          {missingFieldLabels.length > 0 && (
            <div className={styles.needsRevision}>
              <div className={styles.needsRevisionIcon}>!</div>
              <div className={styles.needsRevisionContent}>
                <h4>Требуются доработки</h4>
                <p>У объявления не заполнены следующие обязательные поля:</p>
                <ul className={styles.missingFieldsList}>
                  {missingFieldLabels.map(label => (
                    <li key={label}>{label}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className={styles.detailsList}>
            <div className={styles.detailsRow}>
              <span className={styles.detailsLabel}>Категория</span>
              <span className={styles.detailsValue}>{CATEGORY_TRANSLATIONS[category] || category}</span>
            </div>
            {params && Object.entries(params).map(([key, value]) => (
              <div key={key} className={styles.detailsRow}>
                <span className={styles.detailsLabel}>{getLabel(key)}</span>
                <span className={styles.detailsValue}>{getValueLabel(value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.descriptionBlock}>
        <h3>Описание</h3>
        <div className={styles.description}>
          {description || <span style={{ color: '#8f8f8f' }}>Описание отсутствует.</span>}
        </div>
      </div>
    </section>
  );
};

export default AdDetailsPage;