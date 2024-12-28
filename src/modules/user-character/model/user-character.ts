import mongoose, { Schema, Document, Model } from "mongoose";
import { IClass, IHealthStats, IStats } from "../interfaces/user-character.interface";

export interface IUserCharacter {
    name: string;
    race: string;
    background: string;
    stats: IStats;
    healthStats: IHealthStats;
    armorClass: number;
    classInfo: IClass;
    speed: number;
    initiative: number;
}

export interface IUserCharacterModel extends IUserCharacter, Document {}

const statsSubSchema: Schema = new Schema({
    strength: { type: Number, required: true },
    dexterity: { type: Number, required: true },
    constitution: { type: Number, required: true },
    intelligence: { type: Number, required: true },
    wisdom: { type: Number, required: true },
    charisma: { type: Number, required: true },
}, {_id: false});

const healthStatsSubSchema: Schema = new Schema({
    maxHealth: { type: Number, required: true },
    currentHealth: { type: Number, required: true },
    temporalHealth: { type: Number, required: true },
}, {_id: false});

const classesSubSchema: Schema = new Schema({
    className: { type: String, required: true },
    level: { type: Number, required: true },
}, {_id: false});

const classInfoSubSchema: Schema = new Schema({
    proficiency: { type: Number, required: true },
    classes: { type: [classesSubSchema], required: true },
}, {_id: false});

export const userCharacterSchema: Schema = new Schema({
    name: { type: String, required: true },
    race: { type: String, required: true },
    background: { type: String, required: true },
    stats: { type: statsSubSchema, required: true },
    healthStats: { type: healthStatsSubSchema, required: true },
    armorClass: { type: Number, required: true },
    classInfo: { type: classInfoSubSchema, required: true },
    speed: { type: Number, required: true },
    initiative: { type: Number, required: true },
}, {versionKey: false});

export const UserCharacter: Model<IUserCharacterModel> = mongoose.model<IUserCharacterModel>('userCharacter', userCharacterSchema);
