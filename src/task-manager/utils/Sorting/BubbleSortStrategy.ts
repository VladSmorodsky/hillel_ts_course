import {Direction} from "../../interfaces/ISortableStrategy";
import {Task} from "../../models/Task";
import {ISortableTaskStrategy, SortableTaskFields} from "../../interfaces/ISortableTaskStrategy";

export class BubbleSortTaskStrategy implements ISortableTaskStrategy {
    public sort(data: Task[], field: SortableTaskFields, direction: Direction): Task[] {
        const tasksCount = data.length;

        for (let i = 0; i < tasksCount; i++) {
            for (let j = 0; j < tasksCount - i - 1; j++) {
                if (field === 'createdAt' || field === 'finishedTo') {
                    if (this.compareInOrder(direction, data[j][field].getTime(), data[j + 1][field].getTime())) {
                    // if (data[j][field].getTime() < data[j + 1][field].getTime()) {
                        [data[j], data[j + 1]] = [data[j + 1], data[j]];
                    }
                } else {
                    if (this.compareInOrder(direction, data[j][field], data[j + 1][field])) {
                        [data[j], data[j + 1]] = [data[j + 1], data[j]];
                    }
                }
            }
        }

        return data;
    }

    private compareInOrder(direction: Direction, valueA: any, valueB: any): boolean {
        return direction === 'desc' ? valueA < valueB : valueA > valueB;
    }
}