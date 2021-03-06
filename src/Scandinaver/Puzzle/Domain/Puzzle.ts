import { Entity } from '~/src/Scandinaver/Core/Domain/Contract/Entity.ts'
import Piece from '~/src/Scandinaver/Puzzle/Domain/Piece'
import PieceCollection from '~/src/Scandinaver/Puzzle/Domain/PieceCollection'

export class Puzzle extends Entity {
  id!: number
  active: boolean
  success!: boolean
  text!: string
  translate: any
  pieces: PieceCollection

  getId (): number | string {
    return this.id
  }

  generate (): Puzzle {
    const slices = this.translate.split(' ')
    const pieces: Piece[] = []
    slices.forEach((item: string) => {
      pieces.push(new Piece(item))
    })
    this.pieces = new PieceCollection(pieces)
    return this
  }

  get count (): number {
    return this.pieces.count()
  }

  setActive (active: boolean) {
    this.active = active
    return this
  }
}
