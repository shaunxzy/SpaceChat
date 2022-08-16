import { FetchMessage } from "../../api/FetchMessage.js"
import { FetchUserChannels } from "../../api/FetchUserChannels"
import { createChannel, deleteChannel } from "../../api/CreateChannelSingular"
import {connectDatabaseEmulator} from "firebase/database"
import { db } from "../../firebase/customFirebase"

//test fetch channel api
const channelId = 'simpletest'

//connect to local emulator
connectDatabaseEmulator(db, '127.0.0.1',9000)

test('expect failure for fetch channel', () => {
    const fc = FetchUserChannels("/adascjkzxc")
    return expect(fc).rejects.toBe('no channel found')
})

test('test set up and remove channel', () => {

    const ch = createChannel('test1')
    return expect(ch).resolves.toBe(true)

})

test('test success', () => {
    const ch = createChannel(channelId)

    const fc = FetchMessage("/channel/08d0ccd2-3f72-4dd0-8a3e-e52ffa0befa2")

    return expect(fc).resolves.toBe('no channel found')
})

