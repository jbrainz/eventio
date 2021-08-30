import React from 'react'
import styled from 'styled-components'
import Sidebar from '../components/sidebar/Sidebar'
import errorImage from '../assets/img/error.png'
import { SigupLinkText, SigupLinkWrapper, StrongSignUp } from './auth/SignIn'
import { FilledButton, TextWrapper } from '../components/button/Button'
import useWindowDimensions from '../utils/responsive'

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 296px;
  left: 341px;
  width: 880px;
  height: 133px;
  z-index: -1;
  display: flex;
  margin-top: 120px;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
    left: 12px;
    width: 0px;
    height: 0px;
    display: flex;
    top: 196px;
    margin-top: 120px;
    justify-content: center;
    align-items: center;
  }
`
const ImageContainer = styled.div`
  mix-blend-mode: normal;
  opacity: 0.06;
  width: 446px;
  height: 433px;
  margin-left: -122px;
`
const TextContainer = styled.div`
  margin-left: -100px;
  @media (max-width: 1200px) {
    margin-left: 0px;
  }
  text-align: left;
`
const ContentWrapper = styled.div`
  flex-direction: column-reverse;
`
const TextHeading = styled.h2`
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 48px;
  color: #323c46;
`
const SubTextContainer = styled.p`
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #949ea8;
  width: 522px;
    @media (max-width: 1200px) { 

      width: auto;
    }
`
const ExtendsButton = styled(FilledButton)`
  background-color: #323c46;
  margin-top: 40px;
  cursor: pointer;
  z-index: 2;
`

const PageNotFound = ({ history }) => {

    const { width } = useWindowDimensions()
  return (
    <>
      {width > 1200 && <Sidebar />}
      <SigupLinkWrapper>
        <SigupLinkText>
          Dont Have account?{' '}
          <StrongSignUp onClick={() => history.push('/signup')}>
            SIGN UP
          </StrongSignUp>
        </SigupLinkText>
      </SigupLinkWrapper>
      <ContentWrapper>
        <Wrapper>
          <ImageContainer>
            <img src={errorImage} alt='not found' />
          </ImageContainer>
          <TextContainer>
            <TextHeading>404 Error - Page Not Found</TextHeading>
            <SubTextContainer>
              Seems like Darth Vader just hits our website and drops it down.
              Please press the refresh button and everything should be fine
              again.
            </SubTextContainer>
            <ExtendsButton onClick={() => window.location.reload()} size='main'>
              <TextWrapper>Refresh</TextWrapper>
            </ExtendsButton>
          </TextContainer>
        </Wrapper>
      </ContentWrapper>
    </>
  )
}

export default PageNotFound
