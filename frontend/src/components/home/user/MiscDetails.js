import React from 'react'
import { format, parseISO } from 'date-fns'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'

const StyledMisc = styled.div`
  margin: 15px 0 5px;
  font-size: 1.3rem;
  color: rgb(150, 150, 150);

  .userProfileDate {
    display: flex;
    align-items: end;
  }

  span {
    margin-left: 8px;
  }
`

const MiscDetails = ({ joinedDate }) => {
  const date = parseISO(joinedDate)
  const formattedJoinedDate = format(date, 'MMMM R')

  return (
    <StyledMisc>
      <div className="userProfileDate">
        <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
        <span>Joined {formattedJoinedDate}</span>
      </div>
    </StyledMisc>
  )
}

export default MiscDetails