import './styles.css'
import { siteContent } from './content/siteContent.js'
import { loadHeroImage } from './utils/imageLoader.js'

/**
 * 转义 HTML 文本，避免内容配置注入结构。
 *
 * @param {string} value 原始文本。
 * @returns {string} 转义后的文本。
 */
function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => {
        const entities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        }

        return entities[char]
    })
}

/**
 * 渲染数据列表。
 *
 * @param {{ value: string, label: string }[]} items 统计数据。
 * @returns {string} HTML 字符串。
 */
function renderStats(items) {
    let html = ''

    for (const item of items) {
        html += `
            <li>
                <strong>${escapeHtml(item.value)}</strong>
                <span>${escapeHtml(item.label)}</span>
            </li>
        `
    }

    return html
}

/**
 * 渲染训练项目卡片。
 *
 * @param {{ title: string, meta: string, body: string }[]} programs 训练项目。
 * @returns {string} HTML 字符串。
 */
function renderPrograms(programs) {
    let html = ''

    for (const program of programs) {
        html += `
            <article class="program-card">
                <span>${escapeHtml(program.meta)}</span>
                <h3>${escapeHtml(program.title)}</h3>
                <p>${escapeHtml(program.body)}</p>
            </article>
        `
    }

    return html
}

/**
 * 渲染课程时间列表。
 *
 * @param {{ day: string, time: string, type: string, status: string }[]} schedule 时间表。
 * @returns {string} HTML 字符串。
 */
function renderSchedule(schedule) {
    let html = ''

    for (const item of schedule) {
        html += `
            <li>
                <span class="schedule-day">${escapeHtml(item.day)}</span>
                <span>${escapeHtml(item.time)}</span>
                <strong>${escapeHtml(item.type)}</strong>
                <em>${escapeHtml(item.status)}</em>
            </li>
        `
    }

    return html
}

/**
 * 渲染价值列表。
 *
 * @param {string[]} values 价值说明。
 * @returns {string} HTML 字符串。
 */
function renderValues(values) {
    let html = ''

    for (const value of values) {
        html += `<li>${escapeHtml(value)}</li>`
    }

    return html
}

/**
 * 渲染完整首页。
 *
 * @param {HTMLElement} app 页面根节点。
 * @param {typeof siteContent} content 站点内容。
 * @returns {void}
 */
function renderHome(app, content) {
    app.innerHTML = `
        <header class="site-header" aria-label="站点导航">
            <a class="brand" href="#top" aria-label="${escapeHtml(content.clubName)}">
                <img
                    class="brand-mark"
                    src="${escapeHtml(content.logo)}"
                    alt=""
                    loading="eager"
                    decoding="async"
                />
                <span>
                    <strong>${escapeHtml(content.shortName)}</strong>
                    <small>${escapeHtml(content.label)}</small>
                </span>
            </a>
            <nav aria-label="主页导航">
                <a href="#programs">训练</a>
                <a href="#schedule">安排</a>
                <a href="#join">加入</a>
            </nav>
        </header>

        <main id="top">
            <section class="hero-section" aria-labelledby="hero-title">
                <div class="hero-media" data-hero-media></div>
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <p class="eyebrow">${escapeHtml(content.hero.kicker)}</p>
                    <h1 id="hero-title">${escapeHtml(content.hero.title)}</h1>
                    <p class="hero-summary">${escapeHtml(content.hero.summary)}</p>
                    <div class="hero-actions">
                        <a class="button button-primary" href="#join">
                            ${escapeHtml(content.hero.primaryAction)}
                        </a>
                        <a class="button button-secondary" href="#schedule">
                            ${escapeHtml(content.hero.secondaryAction)}
                        </a>
                    </div>
                    <ul class="stats" aria-label="俱乐部亮点">
                        ${renderStats(content.stats)}
                    </ul>
                </div>
            </section>

            <section class="section intro-section" aria-labelledby="intro-title">
                <div class="section-heading">
                    <p class="eyebrow">Club Focus</p>
                    <h2 id="intro-title">${escapeHtml(content.intro.title)}</h2>
                </div>
                <p class="section-copy">${escapeHtml(content.intro.body)}</p>
            </section>

            <section class="section programs-section" id="programs" aria-labelledby="program-title">
                <div class="section-heading">
                    <p class="eyebrow">Training</p>
                    <h2 id="program-title">从基础到对抗的训练路径</h2>
                </div>
                <div class="program-grid">
                    ${renderPrograms(content.programs)}
                </div>
            </section>

            <section
                class="section schedule-section"
                id="schedule"
                aria-labelledby="schedule-title"
            >
                <div class="section-heading">
                    <p class="eyebrow">Schedule</p>
                    <h2 id="schedule-title">训练安排占位</h2>
                </div>
                <ul class="schedule-list">
                    ${renderSchedule(content.schedule)}
                </ul>
            </section>

            <section class="section values-section" aria-labelledby="values-title">
                <div class="section-heading">
                    <p class="eyebrow">Safety</p>
                    <h2 id="values-title">安全、体系、真实反馈</h2>
                </div>
                <ul class="value-list">
                    ${renderValues(content.values)}
                </ul>
            </section>

            <section class="join-section" id="join" aria-labelledby="join-title">
                <div>
                    <p class="eyebrow">Join Us</p>
                    <h2 id="join-title">${escapeHtml(content.join.title)}</h2>
                    <p>${escapeHtml(content.join.body)}</p>
                </div>
                <div class="join-panel">
                    <span>${escapeHtml(content.join.contact)}</span>
                    <strong>${escapeHtml(content.join.address)}</strong>
                    <p>${escapeHtml(content.join.note)}</p>
                </div>
            </section>
        </main>

        <footer class="site-footer">
            <span>${escapeHtml(content.clubName)}</span>
            <span>HEMA · Longsword · Nanchang</span>
        </footer>
    `
}

/**
 * 初始化首屏图片。
 *
 * @param {Document} documentRef 文档对象。
 * @param {string} src 图片地址。
 * @returns {Promise<void>}
 */
async function initHeroImage(documentRef, src) {
    const heroMedia = documentRef.querySelector('[data-hero-media]')

    try {
        const loadedSrc = await loadHeroImage(src)

        heroMedia?.style.setProperty('--hero-image', `url("${loadedSrc}")`)
        heroMedia?.classList.add('is-loaded')
    } catch {
        heroMedia?.classList.add('is-fallback')
    }
}

/**
 * 启动页面应用。
 *
 * @returns {void}
 */
function bootstrap() {
    const app = document.querySelector('#app')

    if (!app) {
        throw new Error('找不到页面根节点 #app')
    }

    renderHome(app, siteContent)
    void initHeroImage(document, siteContent.hero.image)
}

bootstrap()
