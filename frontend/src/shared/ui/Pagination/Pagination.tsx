import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={styles.pagination} aria-label="Навигация по страницам">
      <button
        className={styles.pagination__btn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Предыдущая страница"
      >
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.pagination__btn} ${page === currentPage ? styles['pagination__btn--active'] : ''}`}
          onClick={() => onPageChange(page)}
          aria-label={`Страница ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.pagination__btn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Следующая страница"
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;
