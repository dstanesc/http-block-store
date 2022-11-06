
interface Resolver {
    (cid: any): string
}

const resolvers = () => {

    const w3sLink = (cid: any): string => {
        return `https://${cid.toString()}.ipfs.w3s.link`
    }

    const ipfsIo = (cid: any): string => {
        return `https://ipfs.io/ipfs/${cid.toString()}`
    }

    return { w3sLink, ipfsIo }
}

export { Resolver, resolvers}