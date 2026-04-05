import { useAds } from "@/entities/ad/api/queries";
import AdContainer from "@/widgets/ad-container/AdContainer.tsx";
import FiltersSidebar from "@/widgets/filters-sidebar/FiltersSidebar.tsx";
import AdsToolbar from "@/widgets/ad-toolbar/AdsToolbar";
import styles from './AdsListPage.module.css'

const AdsListPage = () => {
  const { data, isLoading, isError} = useAds({ limit: 10, skip: 0})

  if ( isLoading ) {
    return <div>Загрузка объявлений...</div>
  }

  if ( isError ) {
    return <div>Ошибка загрузки объявлений...</div>
  }

  //Так как на сервере нет id у items, то будет uuid
  return (
    <div>
      <header className={styles.header}>
        <h1>Мои объявления</h1>
        <h2>{42} объявления</h2>
      </header>
      <div>
        <AdsToolbar/>
        <div>
          <FiltersSidebar/>
          <AdContainer data={data?.items || []}/>
        </div>
      </div>
    </div>
  )
}

export default AdsListPage
