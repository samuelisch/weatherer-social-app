import React from 'react'
import Routers from './routers/Routers'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root,
  body {
    background: rgb(10, 10, 10);
    font-family: helvetica;
    font-size: 10px;
    margin: 0;
    color: rgb(230, 230, 230);
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
