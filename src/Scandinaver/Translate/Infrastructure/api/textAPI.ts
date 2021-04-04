import { AxiosResponse } from 'axios'
import { Service } from 'typedi'
import { Translate } from '../../Domain/Translate'
import request from '~/utils/request'

export namespace API {
  @Service()
  export class TextAPI {
    getText (id: number): Promise<AxiosResponse> {
      return request.get(`/text/${id}`)
    }

    nextLevel (text: Translate): Promise<AxiosResponse<Translate>> {
      return request.post('/nextTLevel', { id: text.id })
    }
  }
}
