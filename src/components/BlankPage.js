import styled from "styled-components/macro";
import astronaut from "../assets/utils/astronaut_small.png"

export default function BlankPage () {
    return (
        <BlankPageWrapper>
            <EmptyParagraph>Space Vacuum...</EmptyParagraph>
            <img alt={"empty space"} src={astronaut} />
        </BlankPageWrapper>
    )
}

const BlankPageWrapper = styled.div`
  display: grid;
  place-content: center;

  
  pointer-events: none;
  user-select: none;
  opacity: 20%;
`

const EmptyParagraph = styled.h1`
  font-family: "Comic Neue", serif;
  font-style: italic;
  text-align: center;
`