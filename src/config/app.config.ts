import { registerAs } from '@nestjs/config'

export default registerAs('express', () => ({
    env: process.env.APP_ENV,
    version: process.env.APP_VERSION,
    name: process.env.APP_NAME,
    description: "Xcode Open API",
    url: process.env.APP_URL,
    port: process.env.APP_PORT || 3000,
    enableCors: false,
    throttler: {
      ttlTime: 60,
      requestCount: 10
    }
  })
);