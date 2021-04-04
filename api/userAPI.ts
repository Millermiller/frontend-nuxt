import { AxiosResponse } from 'axios'
import request from '~/utils/request'
import ILoginForm from '~/models/ILoginForm'
import IState from '~/models/State'
import IRegistrationForm from '~/models/IRegistrationForm'

export interface ILoginData {
  state: IState
  message: string
}

export default {
  login (data: ILoginForm): Promise<AxiosResponse<ILoginData>> {
    return request.post('/login', data)
  },
  logout (): Promise<AxiosResponse> {
    return request.post('/logout')
  },
  signup (form: IRegistrationForm): Promise<AxiosResponse> {
    return request.post('/signup', form)
  }
}
