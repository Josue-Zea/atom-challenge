export interface Task {
    id?: string;       // ID de la tarea (opcional para documentos Firestore)
    title: string;     // Título de la tarea
    description: string; // Descripción de la tarea
    completed: boolean; // Estado de la tarea
}