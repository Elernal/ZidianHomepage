import { describe, expect, it } from 'vitest'
import { siteContent } from './siteContent.js'

describe('siteContent', () => {
    it('包含俱乐部名称和主要行动入口', () => {
        expect(siteContent.clubName).toBe('南昌紫电剑术俱乐部')
        expect(siteContent.hero.primaryAction).toBe('加入训练群')
    })

    it('包含主页主要版块数据', () => {
        expect(siteContent.programs).toHaveLength(3)
        expect(siteContent.schedule.length).toBeGreaterThan(0)
        expect(siteContent.values).toContain('完整护具与安全规则')
    })
})
