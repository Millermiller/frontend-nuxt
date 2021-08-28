import { Entity } from '~/models/Entity'

export class Language extends Entity {
  private _id: number
  private _title: string
  private _description: string
  private _image: string
  private _letter: string
  private _flag: string

  getId(): number | string {
    // @ts-ignore
    return undefined
  }

  get id(): number {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }

  get title(): string {
    return this._title
  }

  set title(value: string) {
    this._title = value
  }

  get description (): string {
    return this._description
  }

  set description (value: string) {
    this._description = value
  }

  get image (): string {
    return this._image
  }

  set image (value: string) {
    this._image = value
  }

  get letter(): string {
    return this._letter
  }

  set letter(value: string) {
    this._letter = value
  }

  get flag(): string {
    return this._flag
  }

  set flag(value: string) {
    this._flag = value
  }
}
