export const trimString = (longString: string, length: number) => {
    return longString.length > length ?
    longString.substring(0, length) + '...' : longString
}