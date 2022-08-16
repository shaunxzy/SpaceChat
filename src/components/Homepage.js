
import styled, { keyframes }  from "styled-components/macro"
import arrow from "../assets/bg/Arrow 1.png"
import background from "../assets/bg/bg.png"
import {useEffect, useState} from "react";
import Loading from "../api/Loading";
import {useNavigate} from "react-router-dom";

const Homepage = props => {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const identifier = setTimeout(() => {
            setLoading(false);
        }, 3000)

        return () => {clearTimeout(identifier)};
    })

    const WrapperReveal = () => loading? {'visibility': 'hidden'}:
        {'visibility': 'visible'}


    const toLogin = () => {
        navigate('/login')
    }

    return (
        <>
            {loading && <LoadingWrapper><Loading /></LoadingWrapper>}
            <Wrapper style={WrapperReveal()}>
                <Title>
                    <p style={{userSelect: "none"}}>SpaceTalk</p>
                    <ButtonWrapper>
                        <Button onClick={toLogin}>Launch</Button>
                        <ButtonReveal onClick={toLogin}>Launch</ButtonReveal>
                        <Rocket>🚀</Rocket>
                        <Arrow alt={'next-page'} src={arrow} />
                    </ButtonWrapper>

                </Title>
                <HeroImage src={background} />
            </Wrapper>
        </>
    )
}

const launch = keyframes`
  to {
    opacity: 0;
    transform: translateX(100%) translateY(-100%);
  }
`


const landing = keyframes`
  from {
    opacity: 0;
    transform: translateX(50%) translateY(-50%);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
`

const LoadingWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`


const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: grid;
  overflow: hidden;
`

const Title = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto auto;
  display: grid;
  justify-items: center;
  align-content: center;
  
  
  & > p{
    font-family: sans-serif;
    font-size: 7rem;
    text-shadow: 2px 2px 2px hsla(0deg, 0%, 0%, 0.33);
  }
`

const Button = styled.button`
  width: fit-content;
  padding: 1rem 6rem 1rem 3rem;
  border: 2px solid black;
  border-radius: 1000px;
  background-color: white;
  font-family: "Orbitron";
  font-weight: 800;
  filter: drop-shadow(2px 2px 2px hsla(0deg, 0%, 0%, 0.75));
`

const Rocket = styled.span`
  font-size: inherit;
  position: absolute;
  right: 2rem;
  top: 1rem;
  pointer-events: none;
  
  animation: ${landing} 100ms ease-in backwards;
`

const Arrow = styled.img`
  position: absolute;
  right: 3rem;
  top: 2rem;
  opacity: 0;
  pointer-events: none;
`

const ButtonReveal = styled(Button)`
  position: absolute;
  left: 0;
  top: 0;
  color: white;
  background: url("https://imgur.com/YocFbIr.jpg");
  opacity: 0;
  transition: opacity 500ms, filter 500ms;
`

const ButtonWrapper = styled.div`
  position: relative;
  font-size: 2rem;
  font-weight: 700;
  

  &:hover ${ButtonReveal} {
    opacity: 1;
    filter: drop-shadow(3px 3px 3px hsla(0deg, 0%, 0%, 0.75));
    transition: opacity 250ms, filter 250ms;
  }
  
  &:hover ${Rocket} {
    animation: ${launch} 250ms ease-out forwards;
  }
  
  &:hover ${Arrow} {
    opacity: 1;
    transform: translateX(20%);
    transition: opacity 250ms, transform 250ms;
    transition-delay: 100ms;
  }
`

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
`



export default Homepage;