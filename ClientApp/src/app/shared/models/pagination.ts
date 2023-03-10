
export interface Pagination<T> {
    products: T;
    total: number;
    skip: number;
    limit: number;
}