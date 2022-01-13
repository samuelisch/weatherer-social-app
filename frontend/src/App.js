import React from 'react'
import PostForm from './components/posts/PostForm';
import PostsList from './components/posts/PostsList'

const App = () => {
  return (
    <div className="App">
      <h1>Weatherer</h1>
      <PostForm />
      <PostsList />
    </div>
  )

}

export default App;
