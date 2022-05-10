import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { RecoilRoot } from 'recoil'
import Routes from './routes'

import i18n from 'utils/locale'
import reportWebVitals from './reportWebVitals'
import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </RecoilRoot>
    </I18nextProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
