import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'
import styled from 'styled-components'

const StyledTime = styled.span`
  font-size: 1.15rem;
  color: rgb(150, 150, 150);
`

const TimeAgo = ({ timestamp }) => {
  const date = parseISO(timestamp)
  const timePeriod = formatDistanceToNow(date)
  const timeAgo = `${timePeriod} ago`

  return (
    <StyledTime>
      <i>{timeAgo}</i>
    </StyledTime>
  )
}

export default TimeAgo