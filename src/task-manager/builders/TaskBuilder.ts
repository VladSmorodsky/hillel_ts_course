import {Task} from "../models/Task";
import {IdGenerator} from "../utils/IdGenerator";
import {TaskTypeEnum} from "../enums/TaskTypeEnum";
import {PriorityEnum} from "../enums/PriorityEnum";

export class TaskBuilder {
    public createTaskItem(title: string, description: string, priority: PriorityEnum, type: TaskTypeEnum): Task {
        switch (type) {
            case TaskTypeEnum.TASK:
                return this.createTask(title, description, priority);
            case TaskTypeEnum.BUG:
                return this.createBug(title, description, priority);
            case TaskTypeEnum.STORY:
                return this.createStory(title, description, priority);
            default:
                return this.createTask(title, description, priority);
        }
    }

    private createTask(title: string, description: string, priority: PriorityEnum): Task {
        return new Task(
            IdGenerator.generateTaskId(),
            title,
            description,
            TaskTypeEnum.TASK,
            priority,
            new Date()
        );
    }

    private createBug(title: string, description: string, priority: PriorityEnum): Task {
        return new Task(
            IdGenerator.generateTaskId(),
            title,
            description,
            TaskTypeEnum.BUG,
            priority,
            new Date()
        );
    }

    private createStory(title: string, description: string, priority: PriorityEnum): Task {
        return new Task(
            IdGenerator.generateTaskId(),
            title,
            description,
            TaskTypeEnum.STORY,
            priority,
            new Date()
        );
    }
}