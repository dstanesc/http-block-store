# Http Block Store

Readonly content-addressable storage (CAS) based on IPFS via custom HTTP gateways.

## API

```ts
get: (cid: any) => Promise<Uint8Array>
```

## Usage

```js
// import
import { blockStore, resolvers } from '@dstanesc/http-block-store'

// optional cache
const cache = {}

// default resolver
const { get } = blockStore({ cache  })

// custom predefined resolver
const { ipfsIo: resolver } = resolvers()
const { get } = blockStore({ cache, resolver })

// plug custom resolver
const resolver = (cid: any) => `http://192.168.1.205:8080/ipfs/${cid.toString()}`
const { get } = blockStore({ cache, resolver })
```

## Build

```sh
npm run clean
npm install
npm run build
npm run test
```

## Test

Current test exec times
```
block get API
  ✓ zero config (922 ms)
  ✓ w3s.link explicit (825 ms)
  ✓ ipfs.io explicit (467 ms)
  ✓ plug custom resolver (78 ms)
```

## Licenses

Licensed under either [Apache 2.0](http://opensource.org/licenses/MIT) or [MIT](http://opensource.org/licenses/MIT) at your option.
