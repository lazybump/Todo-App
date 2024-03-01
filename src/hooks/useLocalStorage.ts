import { useEffect, useState } from "react";
import { TodoType } from "../App";

export default function useLocalStorage(key: string) {
  // 'values' represents the todos
  const [values, setValues] = useState<TodoType[]>(() => {
    const storedTodos = localStorage.getItem(key);
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    // Save todos to localStorage whenever they change
    localStorage.setItem(key, JSON.stringify(values));
  }, [key, values]);

  return [values, setValues] as const;
}
