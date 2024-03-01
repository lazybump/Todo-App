import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { TodoType } from "../App";

interface TodoItemProps {
  todo: TodoType;
  handleToggle: (id: number) => void;
  handleEdit: (todo: TodoType) => void;
  removeTodo: (id: number) => void;
}

const TodoItem = ({
  todo,
  handleToggle,
  handleEdit,
  removeTodo,
}: TodoItemProps) => {
  return (
    <li className="flex">
      <input
        type="checkbox"
        className="mr-3"
        checked={todo.completed}
        onChange={() => handleToggle(todo.id)}
      />
      <p className={todo.completed ? "line-through" : ""}>{todo.text}</p>
      <button
        className="ml-auto text-blue-600"
        onClick={() => handleEdit(todo)}
      >
        <FaEdit />
      </button>
      <button className="ml-4 text-red-500" onClick={() => removeTodo(todo.id)}>
        <FaTrashAlt />
      </button>
    </li>
  );
};

export default TodoItem;
