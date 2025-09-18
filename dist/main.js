"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3001;
    await app.listen(port, '0.0.0.0');
    console.log(`NestJS backend is running on http://0.0.0.0:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map