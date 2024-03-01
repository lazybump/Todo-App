import { useState, FormEvent } from "react";
import Modal from "./components/Modal";
import TodoItem from "./components/TodoItem";
import useLocalStorage from "./hooks/useLocalStorage";

export interface TodoType {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [todos, setTodos] = useLocalStorage("todos");
  const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedTodoText, setUpdatedTodoText] = useState("");

  const handleToggle = (id: number) => {
    setTodos((prev) => {
      return prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    });
  };

  const addTodo = (event: FormEvent) => {
    event.preventDefault();
    setTodos((prev) => {
      if (currentTodo === "") return prev;
      return [
        ...prev,
        {
          id: prev.length + 1,
          text: currentTodo,
          completed: false,
        },
      ];
    });
    setCurrentTodo("");
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };

  // Open the modal and set the todo being edited
  const handleEdit = (todo: TodoType) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  // Update the todo text and close the modal
  const handleUpdate = (event: FormEvent) => {
    event.preventDefault();
    setTodos((prev) => {
      if (updatedTodoText === "") return prev;
      return prev.map((todo) =>
        todo.id === editingTodo!.id ? { ...todo, text: updatedTodoText } : todo
      );
    });
    setIsModalOpen(false);
    setUpdatedTodoText("");
    setEditingTodo(null);
  };

  return (
    <div className=" bg-slate-300 h-screen px-3 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">To-do List</h1>
      <div className="w-4/5 max-w-96">
        <form onSubmit={(e) => addTodo(e)} className="flex justify-between">
          <input
            className="px-1 grow"
            placeholder="Add new to-do"
            value={currentTodo}
            onChange={(e) => setCurrentTodo(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-2 hover:bg-blue-500">
            Add
          </button>
        </form>

        <ul className="w-full py-4 space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleToggle={handleToggle}
              handleEdit={handleEdit}
              removeTodo={removeTodo}
            />
          ))}
        </ul>

        {todos.length > 0 && (
          <div className="flex justify-center">
            <button
              className="bg-red-500 text-white px-2 rounded-sm"
              onClick={() => setTodos([])}
            >
              Clear all
            </button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          editingTodo={editingTodo}
          updatedTodoText={updatedTodoText}
          setUpdatedTodoText={setUpdatedTodoText}
          handleUpdate={handleUpdate}
          setIsModalOpen={setIsModalOpen}
          setEditingTodo={setEditingTodo}
        />
      )}
    </div>
  );
}

export default App;
