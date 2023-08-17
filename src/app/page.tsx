import Image from 'next/image'
import styles from './page.module.css'
import Projects from './components/Projects/Projects'

export default function Home() {
  return (
    <main /* className={styles.main} */>
      <div>
        <Projects></Projects>
      </div>
    </main>
  )
}
