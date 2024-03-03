export interface IFilterable<T, F> {
    filter: (filterObject: F) => T[]
}