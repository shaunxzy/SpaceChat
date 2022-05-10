import styled from "styled-components/macro"
import human from "../assets/utils/human.png"
import alien from "../assets/utils/alien.png"
import {keyframes} from "styled-components";

export default function Loading () {
    return (
        <Wrapper>
            <CardFlipOne><Human alt={"loading-page-human"} src={human}/></CardFlipOne>
            <CardFlipTwo><Dot /></CardFlipTwo>
            <CardFlipThree><Dot /></CardFlipThree>
            <CardFlipFour><Dot /></CardFlipFour>
            <CardFlipFive><Alien alt={"loading-page-alien"} src={alien}/></CardFlipFive>
        </Wrapper>
    )
}

const flip = keyframes`
  from {
    transform: rotateY(90deg);
  }
  to {
    transform: rotateY(0deg);
  }
`

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 90px 90px 90px 90px 90px;

  place-content: center;
  
  background-image: linear-gradient(245.93deg, 
  rgba(59, 114, 254, 0.77) 0%, 
  rgba(1, 179, 255, 0.3927) 0.01%, 
  rgba(5, 253, 208, 0.6545) 99.99%, 
  rgba(96, 245, 43, 0.4774) 100%);
`

const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: black;
`

const Human = styled.img`
  
`

const CenterWrapper = styled.div`
  display: grid;
  place-items: center;
  
  transform-style: preserve-3d;
`

const CardFlipOne = styled(CenterWrapper)`
  animation: ${flip} 500ms ease-in-out backwards;
`

const CardFlipTwo = styled(CenterWrapper)`
  animation: ${flip} 500ms ease-in-out backwards;
  animation-delay: 550ms;
`

const CardFlipThree = styled(CenterWrapper)`
  animation: ${flip} 500ms ease-in-out backwards;
  animation-delay: 1100ms;
`

const CardFlipFour = styled(CenterWrapper)`
  animation: ${flip} 500ms ease-in-out backwards;
  animation-delay: 1650ms;
`

const CardFlipFive = styled(CenterWrapper)`
  animation: ${flip} 500ms ease-in-out backwards;
  animation-delay: 2200ms;
`

const Alien = styled.img`
  width: 80%;
`