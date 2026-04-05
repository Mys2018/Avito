import {Navigate, Outlet, useLocation} from "react-router-dom";

const BaseLayout = () => {
  const location = useLocation()

  if (location.pathname === '/') {
    return <Navigate to={`/ads`} replace={true} />
  }
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default BaseLayout