import React from "react";
import { ServerTodo } from "../../apiClient";
import Todo from "../Todo";

interface TodoListProps {
  todos: ServerTodo[];
  onCheckedChange(todo: ServerTodo): void;
  onDelete(todo: ServerTodo): void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onCheckedChange, onDelete }) => (
  <>
    {todos.map((todo) => (
      <Todo
        key={todo.id}
        todo={todo}
        onCheckedChange={() => onCheckedChange(todo)}
        onDelete={() => onDelete(todo)}
      />
    ))}
  </>
);

export default TodoList;
