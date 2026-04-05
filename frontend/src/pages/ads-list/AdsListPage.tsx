import { useAds } from '@/entities/ad/api/queries';
import AdContainer from '@/widgets/ad-container/AdContainer.tsx';
import FiltersSidebar from '@/widgets/filters-sidebar/FiltersSidebar.tsx';
import AdsToolbar from '@/widgets/ad-toolbar/AdsToolbar';
import { Pagination } from '@/shared/ui/Pagination';
import { useFiltersStore } from '@/features/ad-filters/model';
import styles from './AdsListPage.module.css';

const PAGE_SIZE = 10;

const AdsListPage = () => {
  const { page, setPage, q, categories, needRevision, sortColumn, sortDirection } = useFiltersStore();
  const skip = (page - 1) * PAGE_SIZE;

  const categoriesParam = categories.length > 0 ? categories.join(',') : undefined;

  const { data, isLoading, isError, isFetching } = useAds({ 
    limit: PAGE_SIZE, 
    skip,
    q: q || undefined,
    categories: categoriesParam,
    needsRevision: needRevision || undefined,
    sortColumn,
    sortDirection
  });

  const totalPages = data?.total ? Math.ceil(data.total / PAGE_SIZE) : 1;

  if (isLoading) {
    return <div>Загрузка объявлений...</div>;
  }

  if (isError) {
    return <div>Ошибка загрузки объявлений...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Мои объявления</h1>
        <h2>{data?.total ?? 0} объявления</h2>
      </header>
      <div className={styles.content}>
        <AdsToolbar />
        <div className={styles.main}>
          <FiltersSidebar />
          <div className={styles.feed} style={{ opacity: isFetching ? 0.6 : 1, transition: 'opacity 0.2s' }}>
            <AdContainer data={data?.items || []} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsListPage;
