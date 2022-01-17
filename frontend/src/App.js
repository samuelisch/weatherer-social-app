import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUser } from './reducers/loginReducer'
import Routers from './routers/Routers'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <Routers />
  )

}

export default App;
