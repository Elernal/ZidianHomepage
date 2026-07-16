import { createApp } from "vue";
import App from "./App.vue";
import "./styles.css";
import { logError, logInfo } from "./utils/logger";

/**
 * 创建并挂载 Vue 应用。
 */
function bootstrapApp(): void {
    try {
        createApp(App).mount("#app");
        logInfo("官网应用已启动");
    } catch (error) {
        logError("官网应用启动失败", error);
    }
}

bootstrapApp();
