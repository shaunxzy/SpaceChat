import Icon from "./Icon";
import {COLORS} from "../contants/Contants";

import styled from "styled-components/macro";

const SIZES = {
    "small": {"--size": "24px"},
    "medium": {"--size": "56px"},
    "large": {"--size": "64px"}
}

export default function AddButton({size, onClick}) {

    const sz = SIZES[size];

   return (
       <AddGroupWrapper style={{...sz}} onClick={onClick}>
           <Texture>
               <Horizontal></Horizontal>
               <Vertical></Vertical>
           </Texture>
       </AddGroupWrapper>
   )
}

const AddGroupWrapper = styled.button`
  position: relative;
  border: none;
  border-radius: 1000px;
  width: var(--size);
  height: var(--size);
  background-color: ${COLORS.GRAY["300"]};
  
`

const Texture = styled.div`
  transition: transform 500ms;

  ${AddGroupWrapper}:hover & {
    transform: rotate(45deg);
    transition: transform 250ms;
  }
`

const Horizontal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto auto;
  width: calc(var(--size) / 8 * 3);
  height: calc(var(--size) / 16);
  background-color: black;
  border-radius: 10px;
`

const Vertical = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto auto;
  height: calc(var(--size) / 8 * 3);
  width: calc(var(--size) / 16);
  background-color: black;
  border-radius: 10px;
`