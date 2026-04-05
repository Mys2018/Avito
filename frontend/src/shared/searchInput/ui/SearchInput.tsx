import styles from "./SearchInput.module.css";
import search from "./assets/Search_Magnifying_Glass.svg"

interface SearchInputProps {
  value: string,
  onChange: (value: string) => void
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <search className={styles.search}>
      <form
        className={styles.searchForm}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className={styles.searchInput}
          type='search'
          placeholder="Найти объявление..."
          aria-label="Поиск по объявлениям"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="submit"
          aria-label="Найти"
        >
          <img className={styles.searchIcon} src={search} alt="Поиск" />
        </button>
      </form>
    </search>
  )
}

export default SearchInput;