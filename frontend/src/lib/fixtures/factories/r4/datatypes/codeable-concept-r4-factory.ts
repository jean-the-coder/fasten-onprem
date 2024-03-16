import { Factory } from 'fishery';

class CodableConceptR4Factory extends Factory<{}> {
  text(value?: string) {
    return this.params({
      text: value || 'Glucose [Moles/volume] in Blood'
    })
  }

  coding(display?: string) {
    return this.params({
      text: null,
      coding: [
        {
          system: 'http://loinc.org',
          code: '15074-8',
          display: display || 'Glucose [Moles/volume] in Blood'
        }
      ]
    })
  }
}


export const codeableConceptR4Factory = CodableConceptR4Factory.define(() => (
  {
    text: 'Glucose [Moles/volume] in Blood'
  }
));
