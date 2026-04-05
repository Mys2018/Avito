import { useParams, Link } from "react-router-dom";

const AdDetailsPage = () => {
  const params = useParams()
  return (
      <section>
        <h1>Детали</h1>
        <Link to={`ads/${params.id}/edit`}>Редактировать</Link>
      </section>
  )
}

export default AdDetailsPage