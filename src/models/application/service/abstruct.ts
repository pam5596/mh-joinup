export default abstract class AbsService<ReqT, ResT> {
    abstract execute(request: ReqT): Promise<ResT>;
}