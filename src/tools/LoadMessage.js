export const LoadMessage  = (messageString) => {
    const result = []

    for (const [key, value] of Object.entries(messageString)) {
        result.push({...value, time: new Date(key)});
    }

    return result;
}