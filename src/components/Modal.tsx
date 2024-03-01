import { IoMdClose } from "react-icons/io";
import { TodoType } from "../App";
import { useEffect, FormEvent } from "react";

interface ModalType {
  editingTodo: TodoType | null;
  setEditingTodo: React.Dispatch<React.SetStateAction<TodoType | null>>;
  updatedTodoText: string;
  setUpdatedTodoText: React.Dispatch<React.SetStateAction<string>>;
  handleUpdate: (event: FormEvent) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({
  editingTodo,
  setEditingTodo,
  updatedTodoText,
  setUpdatedTodoText,
  handleUpdate,
  setIsModalOpen,
}: ModalType) => {
  const cancelEdit = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  useEffect(() => {
    // check if editingTodo exists before setting the value
    setUpdatedTodoText(editingTodo ? editingTodo.text : "");
  }, [editingTodo]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form className="bg-white p-4 relative" onSubmit={handleUpdate}>
        <input
          className="border p-2 w-full"
          value={updatedTodoText}
          onChange={(e) => setUpdatedTodoText(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-2 rounded-md mt-2"
          type="submit"
        >
          Update
        </button>
        <button type="button" onClick={cancelEdit}>
          <IoMdClose className="text-2xl text-red-500 bg-white rounded-full border absolute top-0 right-0 -translate-y-1/2" />
        </button>
      </form>
    </div>
  );
};

export default Modal;
