import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/types/task.type';

@Component({
  selector: 'app-tasks-list-header',
  templateUrl: './tasks-list-header.component.html'
})
export class TasksListHeaderComponent {
  @Input() showCompleted!: boolean;
  @Input() pendingTasksCount!: number;
  @Input() completedTasksCount!: number;
  @Input() filteredTasks!: Task[];
  @Input() showPendingTasks!: boolean;
  @Output() toggleShowPending = new EventEmitter<void>();

  toggleShowCompleted(){
    this.toggleShowPending.emit();
  }
}
