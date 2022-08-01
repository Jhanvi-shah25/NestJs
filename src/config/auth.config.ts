import { registerAs } from '@nestjs/config'

export default registerAs('auth', () => ({
    secret: 'g|ykUuL{RWjZS4l0hF7}',
    expiresIn: '24h', // '7d',
    ignoreTokenExpiration: false
  })
);