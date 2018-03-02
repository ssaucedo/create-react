import fs from 'fs'
import { always } from 'ramda'
import buildService from '../service/buildService'
import regeneratorRuntime from 'regenerator-runtime'

const baseDirectory = './snapshots'

function checkVersion (vs, service) {
  if (vs !== service.version) {
    console.log(`deprecated service snapshot ${service.version}. Current version: ${vs}`)
    return {}
  }
  return service
}

function checkDirectory (baseDirectory, ref) {
  if (!fs.existsSync(ref)) {
    if (!fs.existsSync(baseDirectory)) {
      fs.mkdirSync(baseDirectory)
    }
    fs.writeFileSync(ref, JSON.stringify({}))
  }
}

function loadService (data, ref) {
  try {
    return JSON.parse(data)
  } catch (err) {
    throw new Error(`Store data is not a valid JSON. Check: ${ref} ${err.message}`)
  }
}

function SSnapProxy (service) {
  var handler = {
    get: function (target, thisArg, args) {
      const fun = target[thisArg]
      const ref = `./snapshots/${service.name}.js`
      if (service.name === undefined) throw new Error('Service must export a service name')
      checkDirectory(baseDirectory, ref)
      const content = fs.readFileSync(ref, 'utf8')
      if (content.err) {
        throw new Error(`Error while reading file: ${ref}. Error: ${err}`)
      } else {
        return function () {
          service.getAPIVersion().then(vs => {
            const snapService = checkVersion(vs, loadService(content, ref))
            const serviceResponse = snapService[fun.name]
            if (!serviceResponse) {
              fun.call(null, args).then(res => {
                console.log('CALLING SERVICE')
                console.log('saving service endpoint snapshot')
                fs.writeFile(ref, JSON.stringify({...snapService, [fun.name]: res, version: vs}))
                console.log('RETURN', res)
                return function () { return Promise.resolve(res)}
              })
            }
            console.log('RETURN', serviceResponse)
            return function () {Promise.resolve(serviceResponse)}
          })
        }
      }
    }
  }
  return new Proxy(service, handler)
}

export default SSnapProxy

/**
 (async function test () {
  const proxied = SSnapProxy(buildService);
  console.log((await proxied.getBuilds)())
  // const a = await proxied.getBuilds;
  // console.log(a);
}())

 **/