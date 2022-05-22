import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import styles from './corona.module.scss'

import Error from './Error'
import View from './View'

const Corona = () => {
  return (
    <div className={styles.corona}>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallbackRender={Error}>
          <View />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

export default Corona
