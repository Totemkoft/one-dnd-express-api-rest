import Joi from "joi";
import { validator } from "../../../common/validator/validator";

function numberInRange(min: number, max: number){ 
  return Joi.number().integer().min(min).max(max).required();
}

const statsSchema = Joi.object({
  strength: numberInRange(1, 30),
  dexterity: numberInRange(1, 30),
  constitution: numberInRange(1, 30),
  intelligence: numberInRange(1, 30),
  wisdom: numberInRange(1, 30),
  charisma: numberInRange(1, 30)
});

const healthStatsSchema = Joi.object({
  maxHealth: Joi.number().integer().min(1).required(),
  currentHealth: Joi.number().integer().min(1).required(),
  temporalHealth: Joi.number().integer().min(0).required(),
});

const createCharacterSchema = Joi.object({
  name: Joi.string().required(),
  race: Joi.string().required(),
  background: Joi.string().required(),
  stats: statsSchema.required(),
  healthStats: healthStatsSchema.required(),
  armorClass: numberInRange(1, 30),
  classInfo: Joi.object({
    proficiency: Joi.number().integer().min(1).max(10).required(),
    classes: Joi.array().items(
      Joi.object({
        className: Joi.string().min(3).max(30).required(),
        level: Joi.number().integer().min(1).required()
      })
    ).required()
  }).required(),
  speed: Joi.number().integer().min(1).required(),
  initiative: Joi.number().integer().min(-5).max(5).required()
});

const validateCreate = validator(createCharacterSchema);

export { validateCreate };
