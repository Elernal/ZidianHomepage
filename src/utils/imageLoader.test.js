import { describe, expect, it, vi } from 'vitest'
import { loadHeroImage } from './imageLoader.js'

/**
 * 创建可控的图片构造器。
 *
 * @param {'success' | 'error'} result 加载结果。
 * @returns {typeof Image} 图片构造器。
 */
function createImageConstructor(result) {
    return class MockImage {
        /**
         * 设置图片地址并触发模拟加载。
         *
         * @param {string} value 图片地址。
         * @returns {void}
         */
        set src(value) {
            this.currentSrc = value

            queueMicrotask(() => {
                if (result === 'success') {
                    this.onload()
                    return
                }

                this.onerror()
            })
        }
    }
}

describe('loadHeroImage', () => {
    it('加载成功时返回图片地址', async () => {
        const src = '/images/hero-hema-training.png'
        const ImageConstructor = createImageConstructor('success')

        await expect(loadHeroImage(src, ImageConstructor)).resolves.toBe(src)
    })

    it('加载失败时抛出错误', async () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
        const ImageConstructor = createImageConstructor('error')

        await expect(loadHeroImage('/missing.png', ImageConstructor)).rejects.toThrow(
            '无法加载首屏图片',
        )

        spy.mockRestore()
    })
})
