import { AxiosResponse } from 'axios'
import { Service } from 'typedi'
import { Responses } from '../../Domain/Contract/Responses'
import request from '~/utils/request'

export namespace API {
  @Service()
  export class CommonAPI {
    static getState (): Promise<AxiosResponse<Responses.GetStateResponse>> {
      return request.get('/state')
    }
  }
}
