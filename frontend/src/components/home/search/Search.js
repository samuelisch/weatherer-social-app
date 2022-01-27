import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../../assets/Input'
import PostsList from '../posts/PostsList'

const StyledContainer = styled.div`
  border: 1px solid rgb(85, 85, 85);
  border-width: 0 1px 1px;
  padding: 3px 20px;
`

const StyledInput = styled(Input)`
  padding: 10px 20px 10px 40px;
  border-radius: 20px;
  border: none;
  font-size: 1.4rem;
  background: rgba(105, 105, 105, 0.3);
  color: rgb(245, 245 ,245);
  width: 80%;

  &:focus {
    outline: 1px solid rgb(110, 230, 100);
  }
`

const Search = () => {
  const [filter, setFilter] = useState('')

  return (
    <div>
      <StyledContainer>
        <StyledInput 
          className="searchBar" 
          name="searchBar"
          type="text"
          handleChange={(e) => setFilter(e.target.value)}
          value={filter}
          placeholder="Search posts"
        />
      </StyledContainer>
      {filter && 
        <PostsList filterKey={filter} type="search" />
      }
    </div>
  )

}

export default Search