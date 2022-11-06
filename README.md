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

// plugged custom resolver
const resolver = (cid: any) => `https://${cid.toString()}.ipfs.w3s.link`
const { get } = blockStore({ cache, resolver })

```


## Build

```sh
npm run clean
npm install
npm run build
npm run test
```

## Licenses

Licensed under either [Apache 2.0](http://opensource.org/licenses/MIT) or [MIT](http://opensource.org/licenses/MIT) at your option.
