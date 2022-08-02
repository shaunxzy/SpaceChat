import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { useAuth } from "../../context/AuthProvider";
import { getAvatarURL, uploadAvatar } from "../../tools/Avatar";
import { AvatarImage } from "./Avatar";
import { COLORS } from "../../contants/Contants";
import { Button, UploadButton } from "./avatarButtons";


export default function AvatarModal() {
    const { user } = useAuth();

    const [avatarURL, setAvatarURL] = useState(null);

    const fetchAvatar = async () => {
        if (!user) return;
        const url = await getAvatarURL(user.uid);
        setAvatarURL(url);
    };
    useEffect(() => {
        fetchAvatar();
    }, [user]);

    const onUpload = async (image) => {
        if (!user || !image) return;
        await uploadAvatar(user.uid, image);
        fetchAvatar();
    };

    return (
        <Centered>
            <Wrapper>
                <CloseButton style={{ top: 0, right: 0, position: "absolute", }}>×</CloseButton>

                <AvatarImage src={avatarURL} />

                <Button>Select from default</Button>
                <UploadButton onFileSelected={onUpload}>Upload</UploadButton>

            </Wrapper>
        </Centered >
    );
}


const Wrapper = styled.div`
width: 400px;
height: 500px;
background-color: ${COLORS.GRAY["100"]};
border: 1px solid gray;
border-radius: 10px;
padding: 1rem;

display: flex;
justify-content: space-evenly;
align-items: center;
flex-direction: column;

position: relative;
overflow: hidden;
`;

const Centered = styled.div`
width: 100vw;
height: 100vh;

display: flex;
justify-content: center;
align-items: center;
`;

const CloseButton = styled.button`
position: absolute;
top: 0;
right: 0;

--edge-length: 3rem;
height: var(--edge-length);
width: var(--edge-length);

--left-bottom-padding: 5px;
padding-left: var(--left-bottom-padding);
padding-bottom: var(--left-bottom-padding);

border: 0;
border-radius: 0;
border-bottom-left-radius: 10px;

&:hover {
    background-color: #ddd;
}
`;