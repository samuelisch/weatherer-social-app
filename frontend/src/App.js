import React from 'react'
import Routers from './routers/Routers'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root,
  body {
    background: rgb(245, 245, 245);
    font-family: helvetica;
    font-size: 10px;
    margin: 0;
  }
`

const App = () => {
  return (
    // Notification component
    <div className="content">
      <GlobalStyle />
      <Routers />
    </div>
  )

}

export default App;
