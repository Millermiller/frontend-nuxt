import AssetRepository from '@/Scandinaver/Asset/Infrastructure/asset.repository'
import { Inject, Service } from 'typedi'

@Service()
export default class AssetService {
  @Inject()
  private repository: AssetRepository
}
