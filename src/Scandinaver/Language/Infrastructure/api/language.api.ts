import { Service } from 'typedi'
import { AxiosResponse } from 'axios'
import { Language } from '@/Scandinaver/Language/Domain/Language'
import request from '~/utils/request'

export namespace API {
  @Service()
  export class LanguageAPI {
    public async all(): Promise<AxiosResponse<Language[]>> {
      return request.get('/language')
    }
  }
}
