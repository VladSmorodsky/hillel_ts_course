export interface ISearchable<T> {
    search(value: string): T[]
}