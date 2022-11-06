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
    const root = CID.parse('bafkreidt6hqnrg67gu2rrdp3zgdntx6c74h5wppkdmo4kfpzlcpuoe3dhq')

    const retrieved = await retrieve(read, 0, 10, RECORD_SIZE_BYTES, { root, decode, get })
    //retrieved.forEach(result => console.log(result))
    assert.strictEqual(retrieved.length, 10)
    assert.strictEqual(retrieved[0], '326d04b4-c886-422d-9974-2c7132f02922')
    assert.strictEqual(retrieved[1], 'f65257e8-8711-4bcd-81cf-f17e577b0689')
    assert.strictEqual(retrieved[2], '1af88f9a-a0d0-4657-a23c-7ce38fd71a28')
    assert.strictEqual(retrieved[8], '2e2a7a6d-0284-4a43-aef5-5aaebea45c7b')
    assert.strictEqual(retrieved[9], 'b16020a9-d34c-494f-81e7-a6f66fdc9c50')
  })

  test("w3s.link explicit", async () => {

    // ipfs-block-store api
    const cache = {}
    const { w3sLink: resolver } = resolvers()
    const { get } = blockStore({ cache, resolver })
    const { decode } = codec()
    const { read } = chunkyStore()

    // retrieve data published (to ipfs) previously by @dstanesc/ipfs-block-store tests
    const root = CID.parse('bafkreidt6hqnrg67gu2rrdp3zgdntx6c74h5wppkdmo4kfpzlcpuoe3dhq')

    const retrieved = await retrieve(read, 0, 10, RECORD_SIZE_BYTES, { root, decode, get })
    //retrieved.forEach(result => console.log(result))
    assert.strictEqual(retrieved.length, 10)
    assert.strictEqual(retrieved[0], '326d04b4-c886-422d-9974-2c7132f02922')
    assert.strictEqual(retrieved[1], 'f65257e8-8711-4bcd-81cf-f17e577b0689')
    assert.strictEqual(retrieved[2], '1af88f9a-a0d0-4657-a23c-7ce38fd71a28')
    assert.strictEqual(retrieved[8], '2e2a7a6d-0284-4a43-aef5-5aaebea45c7b')
    assert.strictEqual(retrieved[9], 'b16020a9-d34c-494f-81e7-a6f66fdc9c50')
  })

  test("ipfs.io explicit", async () => {

    // ipfs-block-store api
    const cache = {}
    const { ipfsIo: resolver } = resolvers()
    const { get } = blockStore({ cache, resolver })
    const { decode } = codec()
    const { read } = chunkyStore()

    // retrieve data published (to ipfs) previously by @dstanesc/ipfs-block-store tests
    const root = CID.parse('bafkreidt6hqnrg67gu2rrdp3zgdntx6c74h5wppkdmo4kfpzlcpuoe3dhq')

    const retrieved = await retrieve(read, 0, 10, RECORD_SIZE_BYTES, { root, decode, get })

    assert.strictEqual(retrieved.length, 10)
    assert.strictEqual(retrieved[0], '326d04b4-c886-422d-9974-2c7132f02922')
    assert.strictEqual(retrieved[1], 'f65257e8-8711-4bcd-81cf-f17e577b0689')
    assert.strictEqual(retrieved[2], '1af88f9a-a0d0-4657-a23c-7ce38fd71a28')
    assert.strictEqual(retrieved[8], '2e2a7a6d-0284-4a43-aef5-5aaebea45c7b')
    assert.strictEqual(retrieved[9], 'b16020a9-d34c-494f-81e7-a6f66fdc9c50')
  })

  test("plug custom resolver", async () => {

    // ipfs-block-store api
    const cache = {}
    const resolver = (cid: any) => `https://${cid.toString()}.ipfs.w3s.link`
    const { get } = blockStore({ cache, resolver })
    const { decode } = codec()
    const { read } = chunkyStore()

    // retrieve data published (to ipfs) previously by @dstanesc/ipfs-block-store tests
    const root = CID.parse('bafkreidt6hqnrg67gu2rrdp3zgdntx6c74h5wppkdmo4kfpzlcpuoe3dhq')

    const retrieved = await retrieve(read, 0, 10, RECORD_SIZE_BYTES, { root, decode, get })

    assert.strictEqual(retrieved.length, 10)
    assert.strictEqual(retrieved[0], '326d04b4-c886-422d-9974-2c7132f02922')
    assert.strictEqual(retrieved[1], 'f65257e8-8711-4bcd-81cf-f17e577b0689')
    assert.strictEqual(retrieved[2], '1af88f9a-a0d0-4657-a23c-7ce38fd71a28')
    assert.strictEqual(retrieved[8], '2e2a7a6d-0284-4a43-aef5-5aaebea45c7b')
    assert.strictEqual(retrieved[9], 'b16020a9-d34c-494f-81e7-a6f66fdc9c50')
  })
})