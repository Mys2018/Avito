import { useFiltersStore } from '@/features/ad-filters/model';
import styles from './FiltersSidebar.module.css';

const CATEGORIES = [
  { label: 'Авто', value: 'auto' },
  { label: 'Электроника', value: 'electronics' },
  { label: 'Недвижимость', value: 'real_estate' },
] as const;

const FiltersSidebar = () => {
  const { categories, toggleCategory, needRevision, toggleNeedRevision, resetFilters } =
    useFiltersStore();

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>Фильтры</h3>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Категория</legend>

        <ul className={styles.checkboxList}>
          {CATEGORIES.map(({ label, value }) => {
            const id = `category-${value}`;
            const isChecked = categories.includes(value);

            return (
              <li key={value} className={styles.checkboxItem}>
                <label htmlFor={id} className={styles.checkboxLabel}>
                  <input
                    id={id}
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isChecked}
                    onChange={() => toggleCategory(value)}
                  />
                  <span className={styles.checkboxCustom} />
                  {label}
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className={styles.divider} />

      <label htmlFor="needs-revision" className={styles.switchLabel}>
        <span>Только требующие доработок</span>
        <span className={styles.switchWrapper}>
          <input
            id="needs-revision"
            type="checkbox"
            className={styles.switchInput}
            checked={needRevision}
            onChange={toggleNeedRevision}
          />
          <span className={styles.switchTrack}>
            <span className={styles.switchThumb} />
          </span>
        </span>
      </label>

      <div className={styles.divider} />

      <button className={styles.resetButton} onClick={resetFilters} type="button">
        Сбросить фильтры
      </button>
    </aside>
  );
};

export default FiltersSidebar;