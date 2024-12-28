export interface IStats{
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
}
export interface IClass{
    proficiency: number,
    classes: {
        className: string,
        level: number
    }[]
    }

export interface IHealthStats{
    maxHealth: number,
    currentHealth: number,
    temporalHealth: number,
}
