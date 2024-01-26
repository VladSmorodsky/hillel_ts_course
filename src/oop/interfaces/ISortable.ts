export type SortDirection = 'desc' | 'asc';

export interface ISortable<T, K extends keyof T> {
    sort(key: K, direction: SortDirection): T[]
}