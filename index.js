/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const verbs = require("./verbs-fr.json");
const conjugation = require("./conjugation-fr.json");

const structure = {
	infinitive: [
		"infinitive-present"
	],
	indicative: [
		"present",
		"imperfect",
		"future",
		"simple-past",
		"perfect-tense",
		"pluperfect",
		"anterior-past",
		"anterior-future"
	],
	conditional: [
		"present",
		"conditional-past"
	],
	subjunctive: [
		"present",
		"imperfect",
		"subjunctive-past",
		"subjunctive-pluperfect"
	],
	imperative: [
		"imperative-present",
		"imperative-past"
	],
	participle: [
		"present-participle",
		"past-participle"
	]
};
const regexsMode = {
	infinitive: /infiniti(ve|f)/gmi,
	indicative: /indicati(ve|f)/gmi,
	conditional: /condition+(a|e)l(le)?/gmi,
	subjunctive: /subj(u|o)ncti(ve|f)/gmi,
	imperative: /imp(e|é|è|ê)rati(ve|f)/gmi,
	participle: /participl?e/gmi
};
const tensesInfos = {
	"infinitive-present": {
		regex: /(infiniti(ve|f)(-|\s+))?pr(ai|e|é|è|ê)sent/gmi,
	},
	present: {
		regex: /pr(e|é|è|ê)sent/gmi,
		pronouns: [{
			pronoun: "je",
			index: 0
		}, {
			pronoun: "tu",
			index: 1
		}, {
			pronoun: "il",
			index: 2
		}, {
			pronoun: "nous",
			index: 3
		}, {
			pronoun: "vous",
			index: 4
		}, {
			pronoun: "ils",
			index: 5
		}]
	},
	imperfect: {
		regex: /imp(e|a)rf(ect|ai(t|s)?)/gmi,
		pronouns: [{
			pronoun: "je",
			index: 0
		}, {
			pronoun: "tu",
			index: 1
		}, {
			pronoun: "il",
			index: 2
		}, {
			pronoun: "nous",
			index: 3
		}, {
			pronoun: "vous",
			index: 4
		}, {
			pronoun: "ils",
			index: 5
		}]
	},
	future: {
		regex: /future?/gmi,
		pronouns: [{
			pronoun: "je",
			index: 0
		}, {
			pronoun: "tu",
			index: 1
		}, {
			pronoun: "il",
			index: 2
		}, {
			pronoun: "nous",
			index: 3
		}, {
			pronoun: "vous",
			index: 4
		}, {
			pronoun: "ils",
			index: 5
		}]
	},
	"simple-past": {
		regex: /(simple(-|\s+)past|pass+(ai|e|é|è|ê)(-|\s+)simple)/gmi,
		pronouns: [{
			pronoun: "je",
			index: 0
		}, {
			pronoun: "tu",
			index: 1
		}, {
			pronoun: "il",
			index: 2
		}, {
			pronoun: "nous",
			index: 3
		}, {
			pronoun: "vous",
			index: 4
		}, {
			pronoun: "ils",
			index: 5
		}]
	},
	"imperative-present": {
		regex: /((imperati(ve|f)(-|\s+))?pr(ai|e|é|è|ê)sent)/gmi,
		pronouns: [{
			pronoun: "",
			index: 1
		}, {
			pronoun: "",
			index: 3
		}, {
			pronoun: "",
			index: 4
		}]
	},
	"present-participle": {
		regex: /(present(-|\s+)participle|participe(-|\s+)pr(ai|e|é|è|ê)sen)/gmi,
		pronouns: [{
			pronoun: "",
			index: 0
		}]
	},
	"past-participle": {
		regex: /(past(-|\s+)participle|participe(-|\s+)pass+(ai|e|é|è|ê))/gmi,
		pronouns: [{
			pronoun: "",
			index: 0
		}, {
			pronoun: "",
			index: 1
		}]
	}
};
const composedTenses = {
	"perfect-tense": {
		regex: /(perfect(-|\s+)tense|pass+(e|é)(\s+|-)co(m|n)pos(ai|e|é|è|ê))/gmi,
		mode: "indicative",
		tense: "present"
	},
	"pluperfect": {
		regex: /(pluperfect|plus(\s+|-)(qu|k)e(\s+|-)parf(ai|e|é|è|ê)t?)/gmi,
		mode: "indicative",
		tense: "imperfect"
	},
	"anterior-past": {
		regex: /pass+(ai|e|é|è|ê)(-|\s+)ant(ai|e|é|è|ê)rieur/gmi,
		mode: "indicative",
		tense: "simple-past"
	},
	"anterior-future": {
		regex: /future?(-|\s+)ant(ai|e|é|è|ê)rieur/gmi,
		mode: "indicative",
		tense: "future"
	},
	"conditional-past": {
		regex: /(condition(a|e)l(le)?(-|\s+))?pass+(ai|e|é|è|ê)/gmi,
		mode: "conditional",
		tense: "present"
	},
	"subjunctive-past": {
		regex: /(subj(u|o)ncti(ve|f)(-|\s+))?pass+(ai|e|é|è|ê)/gmi,
		mode: "subjunctive",
		tense: "present"
	},
	"subjunctive-pluperfect": {
		regex: /(subj(u|o)ncti(ve|f)(-|\s+))?plus(\s+|-)(qu|k)e(\s+|-)parf(ai|e|é|è|ê)t?/gmi,
		mode: "subjunctive",
		tense: "imperfect"
	},
	"imperative-past": {
		regex: /(imp(ai|e|é|è|ê)ratif?(-|\s+))?pass+(ai|e|é|è|ê)/gmi,
		mode: "imperative",
		tense: "imperative-present"
	}
}
const pronouns = {
	je: 0,
	tu: 1,
	il: 2,
	elle: 2,
	on: 2,
	nous: 3,
	vous: 4,
	ils: 5,
	elles: 5
}
const pronominalForms = [
	"me",
	"te",
	"se",
	"nous",
	"vous",
	"se"
]

function findTense(verb, input, fGender = false) {
	verb = verb.toLowerCase();
	input = input.toLowerCase();
	let mode = "";
	Object.keys(regexsMode).some(rgx => {
		if (input.match(regexsMode[rgx])) {
			mode = rgx;
			return true;
		}
	});
	let tense;
	if (mode === "") {
		try {
			tense = findTenseByMode("indicative", input);
		}
		catch (e) {
			throw new UnknownModeError("Unable to find conjugation mode.");
		}
		mode = "indicative";
	}
	else
		tense = findTenseByMode(mode, input);
	return conjugate(verb, mode, tense, fGender);
}

function findTenseByMode(cMode, input) {
	let tense = "";
	Object.keys(composedTenses).some(cTense => {
		if (composedTenses[cTense].mode === cMode && input.match(composedTenses[cTense].regex))
			tense = cTense;
	});
	if (tense === "") {
		Object.keys(tensesInfos).some(rgx => {
			if (structure[cMode].includes(rgx) && input.match(tensesInfos[rgx].regex)) {
				tense = rgx;
				return true;
			}
		});
	}
	if (tense === "")
		throw new Error("Unable to find conjugation tense.");
	else
		return tense;
}

function conjugate(cVerb, cMode, cTense, fGender = false) {
	let pronominal = /^s'\s*([aâàäeéèêëiîïoöôuùûüyÿ].*)$/gi.exec(cVerb);
	if (pronominal) {
		cVerb = pronominal[1];
		pronominal = !!pronominal;
	}

	if (!(cVerb in verbs))
		throw new UnknownVerbError("Unable to find verb \"" + cVerb + "\".");
	if (!(cMode in structure))
		throw new UnknownModeError("Unable to find mode \"" + cMode + "\".");
	if (!structure[cMode].includes(cTense))
		throw new UnknownTenseError("Unable to find tense \"" + cTense + "\".");

	const result = [];

	let verb = cVerb;
	let ant = "";
	let mode = cMode;
	let tense = cTense;
	let suffix = "";

	if (cTense in composedTenses) {
		if (pronominal)
			verb = "être";
		else
			verb = verbs[cVerb].aux;
		tense = composedTenses[cTense].tense;
		mode = composedTenses[cTense].mode;

		let cT = verbs[cVerb].t;
		let cAnt = "";
		if (cT.match("[^:]+:[^:]+"))
			cAnt += cVerb.replace(new RegExp(cT.split(":")[1] + "$"), "");

		suffix = " " + cAnt + conjugation[cT].participle["past-participle"][0].i;

		if (verb === "être" && fGender)
			suffix += "e";
	}
	let t = verbs[verb].t;
	if (t.match("[^:]+:[^:]+"))
		ant += verb.replace(new RegExp(t.split(":")[1] + "$"), "");

	let countTerm = 0;
	if (!Array.isArray(conjugation[t][mode][tense])) {
		console.log("!!");
		Object.keys(conjugation[t][mode][tense]).forEach(pronoun => {
			if (pronominal) {
				result.push({
					pronoun,
					pronounIndex: pronouns[pronoun] !== undefined ? pronouns[pronoun] : -1,
					verb: replacePronominal(ant + conjugation[t][mode][tense][pronoun], pronominalForms[0])
				});
			}
			else {
				result.push({
					pronoun,
					pronounIndex: pronouns[pronoun] !== undefined ? pronouns[pronoun] : -1,
					verb: ant + conjugation[t][mode][tense][pronoun]
				});
			}
			if (tense === "past-participle") {
				let pVerb;
				if (pronominal)
					pVerb = "être";
				else
					pVerb = verbs[cVerb].aux;
				const participleAnt = conjugation[verbs[pVerb].t]["participle"]["present-participle"].i;
				const pronominalAnt = pronominal ? "s'" : "";
				result.push({
					pronoun,
					pronounIndex: pronouns[pronoun] !== undefined ? pronouns[pronoun] : -1,
					verb: pronominalAnt + participleAnt + " " + ant + conjugation[t][mode][tense][pronoun]
				});
			}
		});
	}
	else {
		if (tense === "past-participle") {
			const term = !fGender ? conjugation[t][mode][tense][0] : conjugation[t][mode][tense][2];
			if (!pronominal) {
				if (Array.isArray(term.i))
					result.push({ pronoun: 'i', pronounIndex: -1, verb: ant + term.i[0] });
				else
					result.push({ pronoun: 'i', pronounIndex: -1, verb: ant + term.i });
			}
			let pVerb;
			if (pronominal)
				pVerb = "être";
			else
				pVerb = verbs[cVerb].aux;
			const participleAnt = conjugation[verbs[pVerb].t]["participle"]["present-participle"].i;
			const pronominalAnt = pronominal ? "s'" : "";
			if (Array.isArray(term.i))
				result.push({ pronoun: 'i', pronounIndex: -1, verb: pronominalAnt + participleAnt + " " + ant + term.i[0] });
			else
				result.push({ pronoun: 'i', pronounIndex: -1, verb: pronominalAnt + participleAnt + " "+ ant + term.i });
		}
		else {
			conjugation[t][mode][tense].forEach(term => {
				let pronoun = tensesInfos[tense].pronouns[countTerm].pronoun;
				const pronounIndex = tensesInfos[tense].pronouns[countTerm].index !== undefined ? tensesInfos[tense].pronouns[countTerm].index : -1;
				let conjugVerb = "";
				if ("i" in term) {
					if (Array.isArray(term.i))
						conjugVerb = ant + term.i.join("/" + ant);
					else if (typeof term.i === "string")
						conjugVerb = ant + term.i;
				}
				else {
					pronoun = Object.keys(term)[0];
					if (Array.isArray(term[pronoun]))
						conjugVerb = ant + term[pronoun].join("/" + ant);
					else if (typeof term[pronoun] === "string")
						conjugVerb = ant + term[pronoun];
				}
				if (conjugVerb !== "") {
					if (pronoun === "je" && ["a", "e", "i", "o", "u", "y"].includes(conjugVerb.substring(0, 1)))
						pronoun = "j'";
					if (mode === "subjunctive") {
						if (["a", "e", "i", "o", "u", "y"].includes(pronoun.substring(0, 1)))
							pronoun = "qu'" + pronoun;
						else
							pronoun = "que " + pronoun;
					}
					if (fGender)
						pronoun = pronoun.replace("il", "elle");
					if (pronominal) {
						result.push({
							pronoun,
							pronounIndex,
							verb: replacePronominal(conjugVerb + suffix + ((suffix != "" && verb === "être" && pronounIndex > 2) ? "s" : ""), pronominalForms[pronounIndex])
						});
					}
					else {
						result.push({
							pronoun,
							pronounIndex,
							verb: conjugVerb + suffix + ((suffix != "" && verb === "être" && pronounIndex > 2) ? "s" : "")
						});
					}
				}
				countTerm++;
			});
		}
	}
	return result;
}
function replacePronominal(verb, pronominalForm) {
	if (pronominalForm.match(/[aâàäeéèêëiîïoöôuùûüyÿ]$/gi) && verb.match(/^[aâàäeéèêëiîïoöôuùûüyÿ]/gi)) {
		return pronominalForm.substring(0, pronominalForm.length - 1)
			+ pronominalForm.substring(pronominalForm.length - 1, pronominalForm.length).replace(/^[aâàäeéèêëiîïoöôuùûüyÿ]/i, "'")
			+ verb;
	}
	else
		return pronominalForm + " " + verb;
}


class UnknownVerbError extends Error {
	constructor(message) {
		super(message);
		this.name = "UnknownVerbError";
	}
}
class UnknownModeError extends Error {
	constructor(message) {
		super(message);
		this.name = "UnknownModeError";
	}
}
class UnknownTenseError extends Error {
	constructor(message) {
		super(message);
		this.name = "UnknownTenseError";
	}
}


module.exports.conjugate = conjugate;
module.exports.findTense = findTense;
module.exports.UnknownVerbError = UnknownVerbError;
module.exports.UnknownModeError = UnknownModeError;
module.exports.UnknownTenseError = UnknownTenseError;