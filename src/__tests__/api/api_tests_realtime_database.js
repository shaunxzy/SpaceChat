import { FetchChannelMessage } from "../../api/FetchChannelMessage.js"
import { FetchUserChannelSingular } from "../../api/FetchUserChannelSingular"
import { createChannel, deleteChannel } from "../../api/CreateChannelSingular"
import {connectDatabaseEmulator} from "firebase/database"
import {connectAuthEmulator, deleteUser, signInWithEmailAndPassword} from "firebase/auth"
import { db, auth } from "../../firebase/customFirebase"
import {CreateUser, deleteUserAuthFirebase, FetchUser, SetUser} from "../../api/FetchUser";


//test fetch channel api
const channelId = 'simpletest'
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

test('expect failure for fetch channel', () => {
    const fc = FetchUserChannelSingular(userName)
    return expect(fc).rejects.toThrow('user did not contain any channels or there did not exist such user')
})

test('test set up and remove channel', () => {
    const ch = createChannel(channelId)
    expect(ch).resolves.toBe(true)

    const dl = deleteChannel(channelId)
    expect(dl).resolves.toEqual(true)
})

test('fetch => create => fetch => delete => fetch', async () => {
    let ft = FetchChannelMessage(channelId)
    await expect(ft).rejects.toThrow('no such channel')

    let ch = createChannel(channelId)
    await expect(ch).resolves.toBe(`channel ${channelId} created`)

    ft = FetchChannelMessage(channelId)
    await expect(ft).resolves.toMatchObject({id: channelId})

    const rm = deleteChannel(channelId)
    await expect(rm).resolves.toBeTruthy()

    ft = FetchChannelMessage(channelId)
    await expect(ft).rejects.toThrow('no such channel')
})

test('set user based on parameters provided in this test', async () => {
    const usr = SetUser(userInfo)
    await expect(usr).resolves.toHaveProperty('uid', 'username', 'email', 'password', 'channels', 'firstUse')


    await expect(FetchUser(userInfo.uid)).resolves.toHaveProperty('uid', 'username', 'email', 'password', 'channels', 'firstUse')

})

test('create sample user and register auth', async () => {
    const usr = CreateUser({email:userEmail, password:userPassword, name:userName})
    await expect(usr).resolves.toBeTruthy()
})

test('fetch the data from another user', async () => {
    await CreateUser({email: fooEmail, password: fooPassword, name:fooName})

    const prevUid = auth.currentUser.uid

    await signInWithEmailAndPassword(auth, userEmail, userPassword).then(userCredential => true).catch(e => Promise.reject(e))

    const ft = FetchUser(prevUid)

    await expect(ft).rejects.toThrow('Permission denied')

    await signInWithEmailAndPassword(auth, fooEmail, fooPassword)

    const du = deleteUserAuthFirebase()

    await expect(du).resolves.toBeTruthy()

})

