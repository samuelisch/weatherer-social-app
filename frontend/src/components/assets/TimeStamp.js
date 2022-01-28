import React from 'react'
import { format, parseISO } from 'date-fns'
import styled from 'styled-components'

const StyledTime = styled.div`
  padding: 8px 0;
  font-size: 1.3rem;
  color: rgb(150, 150, 150);
`

const TimeStamp = ({ timestamp }) => {
  const date = parseISO(timestamp)
  const formattedTime = format(date, "h:mm a - PP")

  return (
    <StyledTime>
      {formattedTime}
    </StyledTime>
  )
}

export default TimeStamp