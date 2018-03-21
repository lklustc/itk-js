import WebworkerPromise from 'webworker-promise'

import config from './itkConfig'

const worker = new window.Worker(config.itkModulesPath + '/WebWorkers/ImageIO.worker.js')
const promiseWorker = new WebworkerPromise(worker)

/**
 * Write a file ArrayBuffer from an image in the browser.
 *
 * @param: useCompression compression the pixel data buffer when possible
 * @param: image itk.Image instance to write
 * @param: fileName string that contains the file name
 * @param: mimeType optional mime-type string
 */
const writeImageArrayBuffer = (useCompression, image, fileName, mimeType) => {
  return promiseWorker.postMessage({ operation: 'writeImage', name: fileName, type: mimeType, image: image, useCompression: useCompression, config: config },
    [image.data.buffer])
}

export default writeImageArrayBuffer