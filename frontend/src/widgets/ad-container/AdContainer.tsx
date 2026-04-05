import AdCard from "@/entities/ad/ui/AdCard.tsx";
import type { ItemsGetOut } from "@/entities/ad/model/types";
import styles from './AdContainer.module.css';

interface AdContainerProps {
  data: ItemsGetOut['items']
}

const AdContainer = ({ data }: AdContainerProps) => {
  return(
      <div className={styles.container}>
        {data.map((ad) => (
            <AdCard
                id={ad.id}
                title={ad.title}
                price={ad.price}
                category={ad.category}
                needsRevision={ad.needsRevision}
            />
        ))}
      </div>
  )
}

export default AdContainer;