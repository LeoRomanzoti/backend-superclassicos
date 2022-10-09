import Point from "../entity/Point";

export default interface PointRepository {
    list(): Promise<Point[] | undefined>;
}
