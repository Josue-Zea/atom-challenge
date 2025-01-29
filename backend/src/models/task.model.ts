export interface Task {
    taskId?: string;        // ID de la tarea (opcional para documentos Firestore)
    title: string;          // Título de la tarea
    description: string;    // Descripción de la tarea
    creation_date: Date;    // Fecha de creación de la tarea
    completed: boolean;     // Estado de la tarea
}