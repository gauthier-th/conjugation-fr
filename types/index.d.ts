export type Conjugation = {
    pronoun: string;
    pronounIndex: number;
    verb: string;
};
/**
 * @param {string} cVerb Verb to conjugate
 * @param {string} cMode Mode for the conjugation
 * @param {string} cTense Tense for the conjugation
 * @param {boolean} [fGender] Whether to agree with the feminine gender (optionnal)
 * @param {string} [forceAux] Force a specific auxiliary
 * @returns {Conjugation[]}
 */
export function conjugate(cVerb: string, cMode: string, cTense: string, fGender?: boolean, forceAux?: string): Conjugation[];
/**
 * @param {string} verb Verb to conjugate
 * @param {string} input Tense and mode to find conjugation
 * @param {boolean} [fGender] Whether to agree with the feminine gender (optionnal)
 * @param {string} [forceAux] Force a specific auxiliary
 * @returns {Conjugation[]}
 */
export function findTense(verb: string, input: string, fGender?: boolean, forceAux?: string): Conjugation[];
/**
 * Error triggered when a word is not found in the dictionary
 */
export class UnknownVerbError extends Error {
    /** @param {string} message The error message */
    constructor(message: string);
}
/**
 * Error triggered when a mode is not found in the dictionary
 */
export class UnknownModeError extends Error {
    /** @param {string} message The error message */
    constructor(message: string);
}
/**
 * Error triggered when a tense is not found in the dictionary
 */
export class UnknownTenseError extends Error {
    /** @param {string} message The error message */
    constructor(message: string);
}
