import styled from "styled-components/macro"

export default function Button(props) {
    return <CustomedButton {...props}>
        {props.children}
    </CustomedButton>
}

const CustomedButton = styled.button`
  
`