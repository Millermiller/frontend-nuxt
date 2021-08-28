import { Inject, Service } from 'typedi'
import { Language } from '@/Scandinaver/Language/Domain/Language'
import LanguageRepository from '../Infrastructure/language.repository'

@Service()
export default class LanguageService {
  private readonly languageRepository: LanguageRepository = new LanguageRepository()

  public async getAll(): Promise<Language[]> {
    return this.languageRepository.all()
  }
}
