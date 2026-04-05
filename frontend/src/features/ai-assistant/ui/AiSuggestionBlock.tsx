import styles from './AiSuggestionBlock.module.css';

interface AiSuggestionBlockProps {
  isLoading: boolean;
  content: string | null;
  onApply: () => void;
  onDiscard: () => void;
}

export const AiSuggestionBlock = ({ isLoading, content, onApply, onDiscard }: AiSuggestionBlockProps) => {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        AI печатает ответ...
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.icon}>✨</span>
        <span>Предложение от AI</span>
      </div>
      <div className={styles.content}>{content}</div>
      <div className={styles.actions}>
        <button type="button" onClick={onApply} className={`${styles.btn} ${styles.applyBtn}`}>
          Применить
        </button>
        <button type="button" onClick={onDiscard} className={`${styles.btn} ${styles.discardBtn}`}>
          Отклонить
        </button>
      </div>
    </div>
  );
};
