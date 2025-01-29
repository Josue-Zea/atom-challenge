import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/types/task.type';

@Component({
  selector: 'app-tasks-list-header',
  templateUrl: './tasks-list-header.component.html'
})
export class TasksListHeaderComponent {
  @Input() showCompleted!: boolean;
  @Input() filteredTasks!: Task[];
  @Input() showPendingTasks!: boolean;
  @Output() toggleShowPending = new EventEmitter<void>();

  toggleShowCompleted(){
    this.toggleShowPending.emit();
  }

  get pendingTasksCount(): number {
    return this.filteredTasks.filter(task => !task.completed).length;
  }

  get completedTasksCount(): number {
    return this.filteredTasks.filter(task => task.completed).length;
  }
}
