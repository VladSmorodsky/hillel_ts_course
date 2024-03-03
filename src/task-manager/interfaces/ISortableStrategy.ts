export type Direction = 'asc' | 'desc'

export interface ISortableStrategy {
    sort: (data: object[], field: string, direction: Direction) => object[]
}