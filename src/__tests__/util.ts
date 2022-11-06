import { CID } from 'multiformats/cid'
import * as raw from 'multiformats/codecs/raw'
import { sha256 } from 'multiformats/hashes/sha2'
import { v4 as uuidV4, parse as uuidParse, stringify as uuidStringify } from 'uuid'

const codec = () => {
    const encode = async (bytes: Uint8Array): Promise<any> => {
        const chunkHash = await sha256.digest(bytes)
        const chunkCid = CID.create(1, raw.code, chunkHash)
        return chunkCid
    }
    const decode = (cidBytes: Uint8Array): any => {
        return CID.decode(cidBytes)
    }
    return { encode, decode }
}

async function retrieve(read: any, startOffset: number, recordCount: number, recordSize: number, { root, decode, get }): Promise<any[]> {
    const completeBuffer = await read(startOffset, recordSize * recordCount, { root, decode, get })
    let cursor = 0
    const records = []
    for (let index = 0; index < recordCount; index++) {
        const recordBytes = completeBuffer.subarray(cursor * recordSize, cursor * recordSize + recordSize)
        const recordFound = uuidStringify(recordBytes)
        records.push(recordFound)
        cursor++
    }
    return records
}

export { codec, retrieve }