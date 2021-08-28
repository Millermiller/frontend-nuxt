export abstract class BaseRepository<D> {
  public abstract all(): Promise<D[]>
  public abstract one(id: number): Promise<D>
  public abstract save(entity: D): Promise<D>
  public abstract delete(entity: D): Promise<any>
}
