type LogContext = Record<string, unknown>;

/**
 * 输出普通运行日志，统一项目内日志格式。
 * @param message 日志消息。
 * @param context 附加上下文。
 */
export function logInfo(message: string, context: LogContext = {}): void {
    console.info("[ZiDian]", message, context);
}

/**
 * 输出错误日志，统一项目内错误格式。
 * @param message 错误消息。
 * @param error 捕获到的错误对象。
 */
export function logError(message: string, error: unknown): void {
    console.error("[ZiDian]", message, error);
}
