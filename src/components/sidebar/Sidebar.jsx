import React from 'react'
import styled from 'styled-components'
import backgroundImage from '../../assets/img/background-side.jpg'
import logo from '../../assets/svg/UnderLine.svg'

/**
 *
 * implements the styles of the
 */
const Wrapper = styled.div`
  width: 35%;
`
const ImageBackground = styled.div`
  width: 35%;
  height: 100%;
  position: fixed;
  background-image: url(${backgroundImage});
  background-position: bottom;
  background-repeat: no-repeat;
  background-blend-mode: normal;
  background-size: cover;
  opacity: 0.9;
`
export const LogoContainer = styled.div`
  height: 58px;
  padding: 10px;
  position: absolute;
  top: 35px;
  left: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  z-z-index: 1;
  opacity: 1;
`

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 310px;
  height: 96px;
  left: 85px;
  top: 50%;
  user-select: none;
`

const Text = styled.h2`
  font-family: Playfair Display;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 48px;
  text-align: center;
  color: #000;
`
const TextHeader = styled.h1`
  font-family: sans-serif;
  font-style: normal;
  font-weight: bolder;
  font-size: ${(props) => (props.color === 'mobile' ? '30px' : '49px')};
  line-height: 48px;
  text-align: center;
  color: ${(props) => (props.color === 'mobile' ? '#000' : '#fdfffc')};
  user-select: none;
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

export const Logo = ({ color }) => {
  return (
    <LogoContainer>
      <TextHeader color={color}>N-Verify</TextHeader>
      <img src={logo} alt='company logo' />
    </LogoContainer>
  )
}
/**
 *
 * @returns Jsx
 */
const Sidebar = () => {
  return (
    <Wrapper>
      <ImageBackground>
        <Logo />
        <TextContainer>
          <Text>
            Want to Verify Informations? <br />{' '}
            <strong>It's simple and fast</strong>
          </Text>
          <Outline />
          <SubText>-nVerify</SubText>
        </TextContainer>
      </ImageBackground>
    </Wrapper>
  )
}

export default Sidebar
