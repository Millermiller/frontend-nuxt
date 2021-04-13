import { Inject, Service } from 'typedi'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import CardRepository from '@/Scandinaver/Asset/Infrastructure/card.repository'
import FavouriteRepository from '@/Scandinaver/Asset/Infrastructure/favourite.repository'
import { BaseService } from '@/Scandinaver/Core/Application/base.service'

@Service()
export default class CardService extends BaseService<Card> {
  @Inject()
  private cardRepository: CardRepository

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create (input: any): Card {
    throw new Error('Method not implemented.')
  }

  @Inject()
  private favouriteRepository: FavouriteRepository
}
