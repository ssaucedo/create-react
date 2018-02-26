import fs from 'fs'
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

const SSnap = function (service) {

  return async function (fun, args) {

  }
}

function SSnapProxy (service) {
  var handler = {
    get: async function (target, thisArg, args) {
        const fun = target[thisArg]
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
            console.log('NO')
            const res = await fun.call(null, args)
            console.log('CALLING SERVICE')
            console.log('saving service endpoint snapshot')
            fs.writeFile(ref, JSON.stringify({...snapService, [fun.name]: res, version: vs}))
            return Promise.resolve(res)
          }
          return Promise.resolve(serviceResponse)
      }
    }
  }

  return new Proxy(service, handler)
}

/*
(async function test () {
  const proxied = SSnapProxy(buildService);
  console.log(proxied.getBuilds)
  const a = await proxied.getBuilds();
  console.log(a);
}())

 */

function sum(a, b) {
  return a + b;
}

const handler = {
  apply: function(target, thisArg, argumentsList) {
    console.log(`Calculate sum: ${argumentsList}`);
    // expected output: "Calculate sum: 1,2"

    return argumentsList[0] + argumentsList[1];
  }
};

var proxy1 = new Proxy(sum, handler);

console.log(proxy1(1, 2));
// expected output: 3
