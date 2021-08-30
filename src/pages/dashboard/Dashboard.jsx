import styled from 'styled-components'

import {Layout} from '../../components/layouts/Layout'
import { RoundedButon } from '../../components/button/Button'


const ButtonHolder = styled.div`

    display: flex;
    position: relative;
    justify-content: flex-end;
    margin-top: 50px;
    right: 42px;
    bottom: 42px;
  
`

const Wrapper = styled.div`
background-color: #F2F2F2;
width: auto;
`
const Dashboard = ({history}) => {
   
  return (
    <Wrapper>
      <Layout history={history} onClick={() => history.push('/event/details')} />
      <ButtonHolder>
        <RoundedButon onClick={() => history.push('/event/create')} variant='primary' />
      </ButtonHolder>
    </Wrapper>
  )
}

export default Dashboard
