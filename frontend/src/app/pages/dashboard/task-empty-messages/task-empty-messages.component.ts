import { Component, Input } from '@angular/core';
import { Task } from 'src/app/types/task.type';

@Component({
  selector: 'app-task-empty-messages',
  templateUrl: './task-empty-messages.component.html'
})
export class TaskEmptyMessagesComponent {
  @Input() showCompleted!: boolean;
  @Input() filteredTasks!: Task[]
}
