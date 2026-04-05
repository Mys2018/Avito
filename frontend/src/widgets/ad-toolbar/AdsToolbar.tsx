import styles from "./AdsToolbar.module.css"
import SearchInput from "@/shared/searchInput/SearchInput";

const AdsToolbar = () => {
  return(
    <div className={styles.adsToolbar}>
      <SearchInput
        value={'23'}
        onChange={() => {}}
      />
    </div>
  )
}

export default AdsToolbar;