import { useFiltersStore } from '@/features/ad-filters/model';
import styles from "./AdsToolbar.module.css"
import SearchInput from "@/shared/searchInput/ui/SearchInput";
import ToggleView from "@/shared/toggle-view/ui/ToggleView";
import { SortAds } from "@/features/ad-sort/ui/SortAds";

const AdsToolbar = () => {
  const { q, setSearch, view, setView } = useFiltersStore();

  return (
    <div className={styles.adsToolbar}>
      <SearchInput
        value={q}
        onChange={setSearch}
      />
      <ToggleView
        setView={setView}
        view={view}
      />
      <SortAds />
    </div>
  )
}

export default AdsToolbar;