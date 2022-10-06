import * as Joi from "joi";

export const envSchema = Joi.object({
  DB_HOST: Joi.required(),
  DB_PORT: Joi.required().default(5432),
  DB_NAME: Joi.required(),
  DB_PASSWORD: Joi.required(),
  DB_USERNAME: Joi.required(),
});
