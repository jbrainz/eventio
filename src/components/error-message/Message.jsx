import React from 'react'
import styled from 'styled-components'

const WrapperMessage = styled.div`
width: fit-content;
height: 24px;
margin-top: 25px;
margin-bottom: 25px;
`
const MessageText = styled.p`
  font-family: Hind;
  font-weight: 400;
  size: 18px;
  line-height: 24px;
  color: #FF4081;
`

const Message = ({message}) => {
  return (
    <WrapperMessage>
      <MessageText>{message}</MessageText>
    </WrapperMessage>
  )
}

export default Message
