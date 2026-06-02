import { logger } from './logger.js'

/**
 * 异步加载图片资源。
 *
 * @param {string} src 图片地址。
 * @param {typeof Image} ImageConstructor 图片构造器。
 * @returns {Promise<string>} 成功加载后的图片地址。
 */
export function loadHeroImage(src, ImageConstructor = Image) {
    return new Promise((resolve, reject) => {
        const image = new ImageConstructor()

        image.onload = () => {
            logger.info('首屏图片加载完成', src)
            resolve(src)
        }

        image.onerror = () => {
            const error = new Error(`无法加载首屏图片：${src}`)

            logger.error(error.message)
            reject(error)
        }

        image.src = src
    })
}
