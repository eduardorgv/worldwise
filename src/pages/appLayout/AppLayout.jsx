import { Map, Sidebar } from "../../components"
import styles from './AppLayout.module.css'

export const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  )
}
