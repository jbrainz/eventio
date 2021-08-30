import React from 'react'
import styled from 'styled-components'
import backgroundImage from '../../assets/img/Image.png'
import logo from '../../assets/img/logo.png'

/**
 * 
 * implements the styles of the 
 */
const Wrapper = styled.div`
  width: 683px;

`
const ImageBackground = styled.div`
  width: 480px;
  height: 100%;
  position: fixed;
  background-image: url(${backgroundImage});
  background-position: bottom;
  background-repeat: no-repeat;
  background-blend-mode: normal;
  background-size: cover;
`
export const LogoContainer = styled.div`
  width: 29px;
  height: 28px;
  position: absolute;
  top: 39px;
  left: 61px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TextContainer = styled.div`
display: flex;
justify-content: center;
  position: absolute;
  width: 310px;
  height: 96px;
  left: 85px;
  bottom: 20%;
`

const Text = styled.h2`
  font-family: Playfair Display;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 48px;
  text-align: center;
  color: white;
`
const Outline = styled.div`
  position: absolute;
  margin-top: 150px;
  width: 12px;
  height: 2px;
  background-color: #1be38b;
`

const SubText = styled.h4`
  font-family: Hind;
  position: absolute;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  line-height: 24px;
  margin-top: 180px;
  color: #949ea8;
`
/**
 * 
 * @returns Jsx 
 */
const Sidebar = () => {
  return (
    <Wrapper>
      <ImageBackground>
      <LogoContainer>
        <img src={logo} alt='company logo' />
      </LogoContainer>
      <TextContainer>
        <Text>Great, kid. Don’t get cocky.</Text>
        <Outline/>
        <SubText>Han Solo</SubText>
      </TextContainer>
      </ImageBackground>
    </Wrapper>
  )
}

export default Sidebar
