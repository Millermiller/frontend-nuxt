import { Service } from 'typedi'
import { Inject } from 'vue-typedi'
import TextRepository from '@/Scandinaver/Translate/Infrastructure/text.repository'
import { Translate } from '../Domain/Translate'

@Service()
export default class TextService {
  @Inject()
  private repository: TextRepository

  public getText (id: number) {
    return this.repository.one(id)
  }

  public async nextLevel (text: Translate): Promise<Translate> {
    const newtext = await this.repository.nextLevel(text)
    return newtext
  }
}
