import fs from 'fs'
import buildService from '../service/buildService'
import regeneratorRuntime from 'regenerator-runtime'

/*
 Lets say that we have an expensive operation or we just want to save us for making real http requests when making integration tests.
 We would need to mock the response data.
 But mocking can be hard when endpoints change as lot. You may end up having dummy and deprecated objects.
 */

const baseDirectory = './snapshots'

const SSnap = function (service) {
  return async function (fun, args) {
    const ref = `./snapshots/${service.name}.js`
    if (service.name === undefined) throw new Error('Service must export a service name')
    checkDirectory(baseDirectory, ref)
    const content = fs.readFileSync(ref, 'utf8')
    if (content.err) {
      throw new Error(`Error while reading file: ${ref}. Error: ${err}`)
    } else {
      const vs = await service.getAPIVersion()
      const snapService = checkVersion(vs, loadService(content, ref))
      const serviceResponse = snapService[fun.name]
      if (!serviceResponse) {
        const res = await fun.call(null, args)
        console.log('CALLING SERVICE')
        console.log('saving service endpoint snapshot')
        fs.writeFile(ref, JSON.stringify({...snapService, [fun.name]: res, version: vs}))
        return Promise.resolve(res)
      } else {
        return Promise.resolve(serviceResponse)
      }
    }
  }
}

function checkVersion (vs, service) {
  if(vs !== service.version) {
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

(async function test () {
  const a = await SSnap(buildService)(buildService.getBuilds, [])
  console.log(a)
})()






