import {Direction, ISortableStrategy} from "./ISortableStrategy";
import {Task} from "../models/Task";

export type SortableTaskFields = 'createdAt' | 'finishedTo' | 'priority';

export interface ISortableTaskStrategy extends ISortableStrategy {
    sort: (data: Task[], field: SortableTaskFields, direction: Direction) => Task[]
}