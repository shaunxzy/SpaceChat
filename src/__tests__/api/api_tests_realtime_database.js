import { FetchChannelMessage } from "../../api/FetchChannelMessage.js"
import { FetchUserChannelSingular } from "../../api/FetchUserChannelSingular"
import {addChannel, createChannel, deleteChannel, fetchChannels} from "../../api/HandleChannels"
import {connectDatabaseEmulator} from "firebase/database"
import {connectAuthEmulator, deleteUser, signInWithEmailAndPassword} from "firebase/auth"
import { db, auth, storage } from "../../firebase/customFirebase"
import {
    CreateUser,
    deleteUserAuthFirebase,
    HandleUser,
    SetUser,
    createLinkAndRegisterHost,
    registerGuestInvitationLink
} from "../../api/HandleUser";
import { connectStorageEmulator, uploadString, ref } from "firebase/storage"

const admEmail = 'zyxuxmu@gmail.com'
const admPassword = "123123"
const admName = 'admin'



//test fetch channel api
const channelId = 'f3r80u0fu09fu309ru'
const userPassword = 'zxcxccadasd'
const userEmail = 'zx45@illinois.edu'
const userName = 'sxz'
const mockUid = 'z1cf4a64f6x546'

const fooName = "foo"
const fooEmail = "foo@me.com"
const fooPassword = "zxc''123"

const testUserAdm = 'jVuwXYSX0n4HVtxe7j5oi5mtCTzu'

const userInfo = {
    uid: mockUid,
    username: userName,
    email: userEmail,
    password: userPassword,
    channels: {
        singular: {},
        multiple: {}
    },
    firstUse: true
}

//connect to local emulator
connectDatabaseEmulator(db, '127.0.0.1',9000)
connectAuthEmulator(auth, 'http://localhost:9099')
connectStorageEmulator(storage, 'localhost', 9199)


test('test set up and remove channel', () => {
    const ch = createChannel()
    expect(ch).resolves.toBe(true)

    const dl = deleteChannel()
    expect(dl).resolves.toEqual(true)
})

test('fetch => create => fetch => delete => fetch', async () => {
    let ft = FetchChannelMessage(channelId)
    await expect(ft).rejects.toThrow('no such channel')

    let realChannelId = await createChannel()

    ft = FetchChannelMessage(realChannelId)
    await expect(ft).resolves.toMatchObject({id: realChannelId})

    const rm = deleteChannel(realChannelId)
    await expect(rm).resolves.toBeTruthy()

    ft = FetchChannelMessage(realChannelId)
    await expect(ft).rejects.toThrow('no such channel')
})

test('set user based on parameters provided in this test', async () => {
    const usr = SetUser(userInfo)
    await expect(usr).resolves.toHaveProperty('uid', 'username', 'channels', 'firstUse')


    await expect(HandleUser(userInfo.uid)).resolves.toHaveProperty('uid', 'username', 'channels', 'firstUse')

})

test('create sample user and register auth', async () => {
    const usr = CreateUser({email:userEmail, password:userPassword, name:userName})
    await expect(usr).resolves.toBeTruthy()
})

test('fetch user data from another user, expect failure', async () => {
    await CreateUser({email: userEmail, password: userPassword, name: userName})
    await CreateUser({email: fooEmail, password: fooPassword, name:fooName})

    const prevUid = auth.currentUser.uid

    await signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then(userCredential => true).catch(e => Promise.reject(e))

    const ft = HandleUser(prevUid)

    await expect(ft).rejects.toThrow('Permission denied')

    await signInWithEmailAndPassword(auth, fooEmail, fooPassword)

    let du = deleteUserAuthFirebase()
    await expect(du).resolves.toBeTruthy()

    await signInWithEmailAndPassword(auth, userEmail, userPassword)
    du = deleteUserAuthFirebase()
    await expect(du).resolves.toBeTruthy()
})

// TODO: mock friend invitation >>
//  create user1 => user1 send invitation link for user2 =>
//  user2 opened invitation link and be redirected to sign up page => user2 signed up and saw user1's channel,
//  or user2 signed in and saw user1's channel

test('setting up a new channel for an existing user', async () => {

    await signInWithEmailAndPassword(auth, fooEmail, fooPassword)

    await addChannel(channelId, 'foo', 'singular')

    const ch = fetchChannels('singular')

    await expect(ch).resolves.toHaveLength(1)

    return true
})

test('create hash link', async () => {
    await signInWithEmailAndPassword(auth, admEmail, admPassword)

    const hl = await createLinkAndRegisterHost()
    return expect(typeof hl).toBe("string")
})

test('guest sign up with invitation link', async() => {
    await signInWithEmailAndPassword(auth, admEmail, admPassword)

    const invitationLink = await createLinkAndRegisterHost()
    expect(typeof invitationLink).toBe("string")

    await CreateUser({email: fooEmail, password: fooPassword, name:fooName})

    await registerGuestInvitationLink(invitationLink, 'singular')

    const ft = fetchChannels('singular')
    await expect(ft).resolves.toHaveLength(1)
})
