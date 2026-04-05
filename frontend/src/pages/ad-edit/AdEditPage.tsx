import { useParams } from "react-router-dom";
import { useAdById } from "@/entities/ad/api/queries";
import { AdForm } from "@/widgets/ad-form";
import styles from "./AdEditPage.module.css";

const AdEditPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: ad, isLoading, isError } = useAdById(id || "");

  if (isLoading) {
    return <div className={styles.container}>Загрузка данных для редактирования...</div>;
  }

  if (isError || !ad) {
    return <div className={styles.container}>Не удалось загрузить объявление для редактирования.</div>;
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Редактирование объявления</h1>
      <AdForm adId={id!} initialData={ad} />
    </section>
  );
};

export default AdEditPage;