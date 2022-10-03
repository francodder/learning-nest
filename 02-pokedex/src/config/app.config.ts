export const EnvironmentConfig = () => ({
  environment: process.env.ENVIRONMENT || 'dev',
  port: process.env.PORT || 3001,
  mongodb: process.env.MONGODB,
  defaultLimit: process.env.DEFAULT_LIMIT || 7,
});
