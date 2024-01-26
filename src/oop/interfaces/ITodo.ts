export interface ITodo {
    id: string,
    title: string,
    description: string | null,
    createdAt: number,
    updatedAt: number,
    isCompleted: boolean,
    getId: () => string,
    update: (payload: Partial<ITodo>) => void
}