import axios from 'axios';
import { Resolver, resolvers } from './resolver';

const blockStore = ({ cache, resolver }: { cache?: any, resolver?: Resolver }) => {

    if (resolver === undefined) {
        const { w3sLink } = resolvers()
        resolver = w3sLink
    }

    const put = async (block: { cid: any, bytes: Uint8Array }): Promise<void> => {
        throw new Error(`Readonly store, put not supported`)
    }

    const get = async (cid: any): Promise<Uint8Array> => {
        let bytes
        if (cache)
            bytes = cache[cid.toString()]
        if (!bytes) {
            const response = await axios.get(resolver(cid), { responseType: 'arraybuffer' })
            bytes = new Uint8Array(response.data)
            if (cache)
                cache[cid.toString()] = bytes
        }
        return bytes
    }

    return { get, put }
}

export { blockStore }