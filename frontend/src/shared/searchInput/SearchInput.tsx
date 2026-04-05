import styles from "@/widgets/ad-toolbar/AdsToolbar.module.css";
import search from "./assets/Search_Magnifying_Glass.svg"


interface SearchInputProps{
  value: string,
  onChange: () => void
}

const SearchInput = ({value, onChange} : SearchInputProps) => {
  return(
      <search className={styles.search}>
        <form
            className={styles.searchForm}
        >
          <input
              type='search'
              placeholder="Найти объявление..."
              aria-label="Поиск по объявлениям"
              value={value}
              onChange={onChange}
          />
          <button
              type="submit"
              aria-label="Найти"
          >
            <img src={search} alt="Поиск"/>
          </button>
        </form>
      </search>
  )
}

export default SearchInput;