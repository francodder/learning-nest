import * as Joi from 'joi';

/* Con este schema hacemos que se apliquen las validaciones importantes a nuestro process.env,
   si surge un error, detendra la ejecucion */
export const envValitadion = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.required().default(3001),
});
