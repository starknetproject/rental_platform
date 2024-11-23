import { createHash } from 'crypto'

export const trimString = (longString: string, length: number) => {
    return longString.length > length ?
    longString.substring(0, length) + '...' : longString
}

export const generateUserId = (walletAddress: string, appSecret: string): string => {
    const salt = createHash('sha256')
        .update(appSecret)
        .digest('hex')

    const reversibleHash = createHash('sha256')
        .update(`${walletAddress}:${salt}`)
        .digest('hex')

    console.log(reversibleHash.length)

    return reversibleHash
}

// console.log(generateUserId('0x5688368493202948747', 'euhdjsiwoee'))