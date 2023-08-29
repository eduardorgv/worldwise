import { useEffect } from "react"
import { Map, Sidebar } from "../../components"
import { User } from "../../components/user/User"
import { useAuth } from "../../contexts/FakeAuthContext"
import styles from './AppLayout.module.css'
import { useNavigate } from "react-router-dom"

export const AppLayout = () => {  
  return (
    <div className={styles.app}>
      <Sidebar />
      <User />
      <Map />
    </div>
  )
}
