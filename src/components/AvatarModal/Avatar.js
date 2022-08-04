import styled from "styled-components/macro";


const ContainedImg = styled.img`
height: 100%;
width: 100%;
`;

const Avatar = styled.div`
--diameter: 250px;
width: var(--diameter);
height: var(--diameter);
margin: 30px 0;

border-radius: 999px;
flex: none;

background-color: #FFF;

overflow: hidden;
`;

export function AvatarImage({ src }) {
    return (
        <Avatar>
            {src && <ContainedImg src={src} />}
        </Avatar>
    );
}