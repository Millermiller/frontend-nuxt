import { Inject, Service } from 'typedi'
import { plainToClass } from 'class-transformer'
import { BaseRepository } from '~/src/Scandinaver/Core/Infrastructure/base.repository'
import { Language } from '~/src/Scandinaver/Language/Domain/Language'
import { API } from '~/src/Scandinaver/Language/Infrastructure/api/language.api'
import LanguageAPI = API.LanguageAPI

@Service()
export default class LanguageRepository extends BaseRepository<Language> {
  @Inject()
  protected readonly api: LanguageAPI = new LanguageAPI()

  async all (): Promise<Language[]> {
    return this.api.all().then(response => plainToClass(Language, response.data))
  }

  async delete (entity: Language): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async one (id: number): Promise<Language> {
    throw new Error('Method not implemented.')
  }

  async save (entity: Language): Promise<Language> {
    throw new Error('Method not implemented.')
  }
}
