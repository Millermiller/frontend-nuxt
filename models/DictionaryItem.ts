import { Type } from 'class-transformer'
import { ColorGenerator } from '../services/color.generator'
import Synonym from './Synonym'

export default class DictionaryItem {
  id: number
  text: string|null
  value: string|null
  /**
   * generated array of possible translates
   * */
  values: string[]
  color: string
  sentenceNum: number
  coordinates: number[][]
  textId: number
  private _synonyms: Synonym[] = []

  constructor() {
    this.values = []
    this.color = ColorGenerator.generate()
  }

  getValue(): string {
    // @ts-ignore
    return this.value
  }

  get synonyms(): Synonym[] {
    return this._synonyms
  }

  @Type(() => Synonym)
  set synonyms(value: Synonym[]) {
    this._synonyms = value
  }

  public toDTO() {
    return {
      id: this.id,
      text: this.text,
      value: this.value,
      sentenceNum: this.sentenceNum,
      coordinates: this.coordinates,
      synonyms: this._synonyms.map((synonym: Synonym) => synonym.toDTO())
    }
  }
}
