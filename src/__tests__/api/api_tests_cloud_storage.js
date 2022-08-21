import {ref, uploadString} from "firebase/storage";
import {storage} from "../../firebase/customFirebase";

// Sample test for cloud storage
test('carefully test firebase storage', async () => {
    const message2 = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';

    await uploadString(ref(storage, 'someChild'), message2, 'base64').then((snapshot) => {
        console.log('Uploaded a base64 string!');
    }).catch(e => {
        console.log(e)
    });
})

// TODO: 1. Extract all the utility functions from /src/components/AvatarModal to /src/api
// TODO: 2. Write tests for all of the utility functions