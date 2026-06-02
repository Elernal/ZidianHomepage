export const siteContent = {
    clubName: '南昌紫电剑术俱乐部',
    shortName: '紫电剑术',
    label: 'Nanchang Zidian HEMA Club',
    logo: `${import.meta.env.BASE_URL}images/zidian-logo.jpg`,
    hero: {
        kicker: 'Historical European Martial Arts',
        title: '在南昌，练一门真正能对抗的剑术',
        summary:
            '紫电剑术专注 HEMA 长剑训练，以安全装备、体系化课程和真实对练，' +
            '带你进入历史欧洲武术的现代训练场。',
        primaryAction: '加入训练群',
        secondaryAction: '查看训练安排',
        image: `${import.meta.env.BASE_URL}images/hero-hema-training.png`,
    },
    stats: [
        { value: 'HEMA', label: '历史欧洲武术' },
        { value: 'Longsword', label: '长剑基础与对抗' },
        { value: 'Nanchang', label: '南昌本地训练' },
    ],
    intro: {
        title: '不是表演剑，也不是健身课',
        body:
            '我们用现代护具复现历史剑术中的距离、节奏、攻防选择和压力测试。' +
            '训练从步法、握剑、守位开始，逐步进入技术组合、受控对练和规则化实战。',
    },
    programs: [
        {
            title: '入门基础',
            meta: '适合零基础',
            body: '学习安全规范、基础步法、长剑握持、四大守位和常见进攻线路。',
        },
        {
            title: '技术训练',
            meta: '每周常规课',
            body: '围绕距离判断、击打时机、防守反击、缠剑和复盘进行主题训练。',
        },
        {
            title: '装备对练',
            meta: '逐步开放',
            body: '在护具、规则和教练监督下进行受控对抗，积累真实压力下的判断。',
        },
    ],
    schedule: [
        { day: '周三', time: '19:30 - 21:30', type: '技术课', status: '时间占位' },
        { day: '周六', time: '14:00 - 17:00', type: '综合训练', status: '地点占位' },
        { day: '周日', time: '15:00 - 17:00', type: '新手体验', status: '预约开放' },
    ],
    values: [
        '完整护具与安全规则',
        '可复盘的训练结构',
        '欢迎零基础与跨项目练习者',
        '不追求花架子，只追求可验证的技术',
    ],
    join: {
        title: '来试一堂课',
        body:
            '第一次体验建议提前联系确认时间、地点和装备尺码。真实二维码与社媒链接' +
            '可以后续替换到这里。',
        contact: '训练群二维码占位',
        address: '南昌市训练场地占位',
        note: '建议穿运动鞋和便于活动的衣服，俱乐部可提供基础体验装备。',
    },
}
