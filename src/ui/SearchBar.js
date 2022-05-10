import search from "../assets/utils/search.png";
import styled from "styled-components/macro";
import {COLORS} from "../contants/Contants";

export default function SearchBar () {
    return (
        <SearchInput>
        <div style={{position: "relative"}}>
            <SearchImage alt={"search"} src={search} />
            <Search placeholder={"Search..."}/>
        </div>
    </SearchInput>   )
}


const SearchInput = styled.div`
  position: relative;
  margin-top: 1rem;
  display: grid;
  place-content: center;

  margin-bottom: 1rem;
`

const Search = styled.input`
  border-radius: 0.6rem;
  border: none;
  text-indent: 2rem;
  background-color: ${COLORS.GRAY["300"]};
  
  &:focus {
    outline: 1px solid ${COLORS.GRAY["500"]};
  }
`

const SearchImage = styled.img`
  position: absolute;
  left: 5px;
  top: 0.5px;
  opacity: 50%;
  
`

