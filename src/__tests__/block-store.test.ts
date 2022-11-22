import { CID } from 'multiformats/cid'
import { chunkyStore } from '@dstanesc/store-chunky-bytes'
import { blockStore, resolvers } from '../index'
import { codec, retrieve } from './util'
import { jest } from '@jest/globals'
import * as assert from 'assert';

const RECORD_SIZE_BYTES = 36

jest.setTimeout(60000);

describe('block get API', function () {

  test("zero config", async () => {
    
    // ipfs-block-store api
    const cache = {}
    const { get } = blockStore({ cache })
    const { decode } = codec()
    const { read } = chunkyStore()

    // retrieve data published (to ipfs) previously by @dstanesc/ipfs-block-store tests
    const root = CID.parse('bafkreihgjhazynaiwrztthz6zt5eawje4dbqmtnpkm2oz7yi6zqgxpgk5m')

    const retrieved = await retrieve(read, 0, 10, RECORD_SIZE_BYTES, { root, decode, get })
    //retrieved.forEach(result => console.log(result))
    assert.strictEqual(retrieved.length, 10)
    assert.strictEqual(retrieved[0], '605318b7-f360-46c8-8007-6ed4d786ab9f')
    assert.strictEqual(retrieved[1], '8da2596c-eeb0-4d76-a810-3d593c26cf5d')
    assert.strictEqual(retrieved[2], 'acfda5f0-bcc6-47e2-8108-27433ed0838b')
    assert.strictEqual(retrieved[8], '57682427-b1fe-41ec-8229-aa009c04b3a4')
    assert.strictEqual(retrieved[9], '3dba56e6-22db-4347-a752-a02f67b9b798')
  })

  test("w3s.link explicit", async () => {

    // ipfs-block-store api
    const cache = {}
    const { w3sLink: resolver } = resolvers()
    const { get } = blockStore({ cache, resolver })
    const { decode } = codec()
    const { read } = chunkyStore()

    // retrieve data published (to ipfs) previously by @dstanesc/ipfs-block-store tests
    const root = CID.parse('bafkreihgjhazynaiwrztthz6zt5eawje4dbqmtnpkm2oz7yi6zqgxpgk5m')

    const retrieved = await retrieve(read, 0, 10, RECORD_SIZE_BYTES, { root, decode, get })
    //retrieved.forEach(result => console.log(result))
    assert.strictEqual(retrieved.length, 10)
    assert.strictEqual(retrieved[0], '605318b7-f360-46c8-8007-6ed4d786ab9f')
    assert.strictEqual(retrieved[1], '8da2596c-eeb0-4d76-a810-3d593c26cf5d')
    assert.strictEqual(retrieved[2], 'acfda5f0-bcc6-47e2-8108-27433ed0838b')
    assert.strictEqual(retrieved[8], '57682427-b1fe-41ec-8229-aa009c04b3a4')
    assert.strictEqual(retrieved[9], '3dba56e6-22db-4347-a752-a02f67b9b798')
  })

  test("ipfs.io explicit", async () => {

    // ipfs-block-store api
    const cache = {}
    const { ipfsIo: resolver } = resolvers()
    const { get } = blockStore({ cache, resolver })
    const { decode } = codec()
    const { read } = chunkyStore()

    // retrieve data published (to ipfs) previously by @dstanesc/ipfs-block-store tests
    const root = CID.parse('bafkreihgjhazynaiwrztthz6zt5eawje4dbqmtnpkm2oz7yi6zqgxpgk5m')

    const retrieved = await retrieve(read, 0, 10, RECORD_SIZE_BYTES, { root, decode, get })

    assert.strictEqual(retrieved.length, 10)
    assert.strictEqual(retrieved[0], '605318b7-f360-46c8-8007-6ed4d786ab9f')
    assert.strictEqual(retrieved[1], '8da2596c-eeb0-4d76-a810-3d593c26cf5d')
    assert.strictEqual(retrieved[2], 'acfda5f0-bcc6-47e2-8108-27433ed0838b')
    assert.strictEqual(retrieved[8], '57682427-b1fe-41ec-8229-aa009c04b3a4')
    assert.strictEqual(retrieved[9], '3dba56e6-22db-4347-a752-a02f67b9b798')
  })

  test("plug custom resolver", async () => {

    // ipfs-block-store api
    const cache = {}
    const resolver = (cid: any) => `http://192.168.1.205:8080/ipfs/${cid.toString()}`
    const { get } = blockStore({ cache, resolver })
    const { decode } = codec()
    const { read } = chunkyStore()

    // retrieve data published (to ipfs) previously by @dstanesc/ipfs-block-store tests
    const root = CID.parse('bafkreihgjhazynaiwrztthz6zt5eawje4dbqmtnpkm2oz7yi6zqgxpgk5m')

    const retrieved = await retrieve(read, 0, 10, RECORD_SIZE_BYTES, { root, decode, get })

    assert.strictEqual(retrieved.length, 10)
    assert.strictEqual(retrieved[0], '605318b7-f360-46c8-8007-6ed4d786ab9f')
    assert.strictEqual(retrieved[1], '8da2596c-eeb0-4d76-a810-3d593c26cf5d')
    assert.strictEqual(retrieved[2], 'acfda5f0-bcc6-47e2-8108-27433ed0838b')
    assert.strictEqual(retrieved[8], '57682427-b1fe-41ec-8229-aa009c04b3a4')
    assert.strictEqual(retrieved[9], '3dba56e6-22db-4347-a752-a02f67b9b798')
  })
})