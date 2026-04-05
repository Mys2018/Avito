import AdCard from "@/entities/ad/ui/AdCard.tsx";
import type { ItemsGetOut } from "@/entities/ad/model/types";
import { useFiltersStore } from "@/features/ad-filters/model";
import styles from './AdContainer.module.css';

interface AdContainerProps {
  data: ItemsGetOut['items']
}

const AdContainer = ({ data }: AdContainerProps) => {
  const { view } = useFiltersStore();

  return(
      <div className={`${styles.container} ${view === 'list' ? styles.list : styles.grid}`}>
        {data.map((ad) => (
            <AdCard
                key={ad.id}
                id={ad.id}
                title={ad.title}
                price={ad.price}
                category={ad.category}
                description={ad.description}
                params={ad.params}
            />
        ))}
      </div>
  )
}

export default AdContainer;