const namespace = '[ZidianHomepage]'

export const logger = {
    /**
     * 记录普通运行信息。
     *
     * @param {string} message 信息内容。
     * @param {...unknown} details 附加数据。
     * @returns {void}
     */
    info(message, ...details) {
        console.info(namespace, message, ...details)
    },

    /**
     * 记录错误信息。
     *
     * @param {string} message 错误说明。
     * @param {...unknown} details 附加数据。
     * @returns {void}
     */
    error(message, ...details) {
        console.error(namespace, message, ...details)
    },
}
