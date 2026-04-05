import { useFiltersStore } from '@/features/ad-filters/model/store';
import styles from './SortAds.module.css'

export const SortAds = () => {
    const { sortColumn, sortDirection, setSort } = useFiltersStore();

    const currentValue = sortColumn && sortDirection
        ? `${sortColumn}:${sortDirection}`
        : 'createdAt:desc';

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [column, direction] = e.target.value.split(':');

        setSort(
            column as 'title' | 'createdAt',
            direction as 'asc' | 'desc'
        );
    };

    return (
        <div className={styles.sortContainer}>
            <label htmlFor="sort-select" className={styles.visuallyHidden}>
            </label>
            <select
                id="sort-select"
                value={currentValue}
                onChange={handleChange}
                className={styles.sortSelect}
            >
                <option value="createdAt:desc">По новизне (сначала новые)</option>
                <option value="createdAt:asc">Сначала старые</option>
                <option value="title:asc">По названию (А-Я)</option>
                <option value="title:desc">По названию (Я-А)</option>
            </select>
        </div>
    );
};