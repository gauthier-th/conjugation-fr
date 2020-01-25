# Conjugation-FR
A Node.js module for fast conjugation of french verbs.

This package is based on the Verbiste database.
It contains more than 7000 verbs.
## Usage
### Simple conjugation
Syntaxe: `conjugationFR#conjugate(verb, mode, tense, fGender = false)`
It supports pronominial forms.
By default, gender is masculine. Set `fGender` to `true` to agree to feminine gender.
Example:
```js
const conjugationFR = require("conjugation-fr");
conjugationFR.conjugate("aller", "indicative", "perfect-tense");
// returns:
[
  { pronoun: 'je', pronounIndex: 0, verb: 'suis allé' },
  { pronoun: 'tu', pronounIndex: 1, verb: 'es allé' },
  { pronoun: 'il', pronounIndex: 2, verb: 'est allé' },
  { pronoun: 'nous', pronounIndex: 3, verb: 'sommes allé' },
  { pronoun: 'vous', pronounIndex: 4, verb: 'êtes allé' },
  { pronoun: 'ils', pronounIndex: 5, verb: 'sont allé' }
]
```
### Find conjugation
Syntaxe: `conjugationFR#findTense(verb, input)`
To parse a user input to know which tense and mode are used, a `findTense` function is available and returns the same array as the `conjugate` function.
For instance, all the lines below returns the verb "aller" conjugate with the indicative perfect tense:
```js
conjugationFR.findTense("aller", "indicative perfect-tense");
conjugationFR.findTense("aller", "perfect-tense");
conjugationFR.findTense("aller", "passé-composé indicatif");
conjugationFR.findTense("aller", "passé composé");
```
If there is no mode specified, indicative mode will be used by default.
## Modes and tenses
Below are available modes and tenses with their translation:
- `infinitive`: `infinitif`
  - `infinitive-present`: `infinitif présent`
- `indicative`: `indicatif`
  - `present`: `présent`
  - `imperfect`: `imparfait`
  - `future`: `futur`
  - `simple-past`: `passé simple`
  - `perfect-tense`: `passé composé`
  - `pluperfect`: `plus-que-parfait`
  - `anterior-past`: `passé antérieur`
  - `anterior-future`: `futur antérieur`
- `conditional`: `conditionnel`
  - `present`: `présent`
  - `conditional-past`: `passé conditionnel`
- `subjunctive`: `subjonctif`
  - `present`: `présent`
  - `imperfect`: `imparfait`
  - `subjunctive-past`: `subjonctif passé`
  - `subjunctive-pluperfect`: `subjonctif plus-que-parfait`
- `imperative`: `impératif`
  - `imperative-present`: `impératif présent`
  - `imperative-past`: `impératif passé`
- `participle`: `participe`
  - `present-participle`: `participe présent`
  - `past-participle`: `participe passé`

## Licenses
This package is based on the [Verbiste](http://sarrazip.com/dev/verbiste.html) database, which is distributed under the [GNU General Public License](http://www.gnu.org/copyleft/gpl.html) (version 2 or later).
