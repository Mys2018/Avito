import { useParams, useNavigate } from "react-router-dom";

const AdEditPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  return (
      <section>
        <h1>Редактирование объявление {params.id}</h1>
        <button onClick={() => navigate(-1)}>Назад</button>
      </section>
  )
}

export default AdEditPage