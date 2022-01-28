import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'
import styled from 'styled-components'

const StyledTime = styled.span`
  font-size: 1.1rem;
`

export const TimeAgo = ({ timestamp }) => {
  const date = parseISO(timestamp)
  const timePeriod = formatDistanceToNow(date)
  const timeAgo = `${timePeriod} ago`

  return (
    <StyledTime title={timestamp}>
      <i>{timeAgo}</i>
    </StyledTime>
  )
}

export default TimeAgo