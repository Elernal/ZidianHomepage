import { onMounted, ref } from 'vue'
import { loadHeroImage } from '../utils/imageLoader.js'

/**
 * 异步加载首屏英雄图片，返回媒体加载状态。
 *
 * @param {string} imageSrc 图片地址。
 * @returns {{ mediaState: import('vue').Ref<'loading' | 'loaded' | 'fallback'> }}
 */
export function useHeroImage(imageSrc) {
    const mediaState = ref('loading')

    onMounted(async () => {
        try {
            await loadHeroImage(imageSrc)
            mediaState.value = 'loaded'
        } catch {
            mediaState.value = 'fallback'
        }
    })

    return { mediaState }
}
