import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import { COLORS } from "../contants/Contants";
import { useAuth } from "../context/AuthProvider";
import app from "../firebase/customFirebase";


export default function AvatarModal({ name }) {
    const { user } = useAuth();

    const [avatarURL, setAvatarURL] = useState(null);

    const fetchAvatar = async () => {
        const storage = getStorage(app);
        if (!user) return;

        const refUploaded = ref(storage, `/avatar/uploaded/${user.uid}`);
        try {
            const url = await getDownloadURL(refUploaded);
            setAvatarURL(url);
            return;
        } catch (avatarFetchError) {
            console.error({ avatarFetchError });
        }

        let refDefault = ref(storage, "/avatar/shared/thiscatdoesnotexist-1.com.jpeg");
        try {
            const url = await getDownloadURL(refDefault);
            setAvatarURL(url);
        } catch (avatarFetchError) {
            console.error({ avatarFetchError });
        }
    };
    useEffect(() => {
        fetchAvatar();
    }, [user]);

    const uploadAvatar = (image) => {
        const storage = getStorage(app);
        const refAvatar = ref(storage, `/avatar/uploaded/${user.uid}`);
        const metadata = {
            contentType: image.type
        };

        console.log({ refAvatar, image, metadata });
        uploadBytes(refAvatar, image).then(() => {
            console.log("uploaded");
            fetchAvatar();
        });
    };


    return (
        <Centered>
            <Wrapper>
                <Column>
                    <AvatarImage src={avatarURL} />

                    <Row>
                        <Button>Select from default</Button>
                        <UploadButton onFileSelected={uploadAvatar}>Upload</UploadButton>
                    </Row>
                    <Row>
                        <Button style={{ width: "40%" }}>Cancle</Button>
                        <Button style={{ width: "40%" }}>Confirm</Button>
                    </Row>

                </Column>

            </Wrapper>
        </Centered >
    );
}


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

background-color: ${COLORS.GRAY["300"]};

overflow: hidden;
`;

function AvatarImage({ src }) {
    return (
        <Avatar>
            {src && <ContainedImg src={src} />}
        </Avatar>
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
`;

const Centered = styled.div`
width: 100vw;
height: 100vh;

display: flex;
justify-content: center;
align-items: center;
`;

const Row = styled.div`
width: 100%;
height: 100%;

display: flex;
justify-content: space-evenly;
align-items: center;
flex-direction: row;
`;

const Column = styled.div`
width: 100%;
height: 100%;

display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
`;


const buttonStyle = `
height: 3rem;
--padding-lr: 1.5rem;
padding-left: var(--padding-lr);
padding-right: var(--padding-lr);
border-radius: 999px;
border: 1px solid gray;
`;
const Button = styled.button([buttonStyle]);
function UploadButton({ children, onFileSelected }) {
    const uploadButton = useRef(null);
    return (<>
        <br />
        <Button onClick={() => { uploadButton.current?.click(); }}>{children}</Button>
        <input type="file" accept="image/*" ref={uploadButton} style={{ display: "none" }}
            onChange={(e) => {
                const files = e.target.files;
                if (files.length === 0) return;

                const imageFile = files[0];
                if (onFileSelected) onFileSelected(imageFile);
            }}
        />
    </>);
}