export const LoadMessage  = (messageString) => {
    const result = []

    for (const [key, value] of Object.entries(messageString)) {
        result.push({...value, time: new Date(key)});
    }

    return result;
}

export const LoadChannel = async channelString => {
    const result = []

    for (const [key, value] of Object.entries(channelString)) {
        result.push({...value, id: key})
    }



    return result;
}

export const LoadChannelVisitor = channelString => {
    const result = []

    for (const [key, value] of Object.entries(channelString)) {
        result.push({channelId: value.channelId})
    }


    return result[0];
}

export const findMaxTime = messageBook => {
    let result = -1
    messageBook.forEach(item => {
        if (result < item.time.getTime()) {
            result = item.time.getTime()
        }
    })
    return result
}