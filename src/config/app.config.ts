import { registerAs } from '@nestjs/config'

export default registerAs('express', () => ({
    env: process.env.APP_ENV,
    version: process.env.APP_VERSION,
    name: process.env.APP_NAME,
    description: "Xcode Open API",
    url: process.env.APP_URL,
    port: process.env.APP_PORT || 3000,
    enableCors: true,
    throttler: {
      ttlTime: 90, //60
      requestCount: 30 //10
    }
  })
);