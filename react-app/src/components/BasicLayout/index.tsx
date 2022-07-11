import { useState, FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Loading from '../Loading'

/**
 * 基础布局
 *
 * @returns
 */
const BasicLayout: FC = () => {
  const [loading, setLoading] = useState(false)

  return loading ? (
    <Loading />
  ) : (
    <div className="layout">
      <nav>
        <Link to="/">home</Link>&nbsp;&nbsp;
        <Link to="/sign">sign</Link>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}

export default BasicLayout
