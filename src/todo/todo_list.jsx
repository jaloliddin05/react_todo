import "./todo_list.css";
import { useState } from "react";
import TodoItem from "./todo_item";
import { getAll, setItem } from "./local_storage_todo";
import { useRef } from "react";

function TodoList() {
  const [todos, setTodos] = useState(
    JSON.parse(window.localStorage.getItem("todos"))
  );

  //.............
  const addTodo = (e) => {
    e.preventDefault();
    let titleInput = document.querySelector(".todolist__input__field");

    const todo = {
      id: todos[todos.length - 1]?.id + 1 || 0,
      title: titleInput.value,
      isCompleted: false,
    };

    setTodos((state) => {
      const newTodos = [...state, todo];
      setItem(newTodos);
      return newTodos;
    });
    titleInput.value = "";
  };
  //..............
  const checkedBtn = (e, id) => {
    setTodos((state) => {
      const newTodos = state.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isCompleted: e.target.checked,
          };
        }
        return item;
      });
      setItem(newTodos);
      return newTodos;
    });
  };
  //...............
  const deleteTodo = (id) => {
    setTodos((state) => {
      const newTodos = state.filter((item) => item.id !== id) || [];
      setItem(newTodos);
      return newTodos;
    });
  };

  const unCompletedTodo = () => {
    const localTodos = getAll();
    const unCompleted = localTodos.filter((todo) => !todo.isCompleted);
    setTodos(unCompleted);
  };
  //.............
  const completedTodo = () => {
    const localTodos = getAll();
    const completed = localTodos.filter((todo) => todo.isCompleted);
    setTodos(completed);
  };
  //.............
  const allTodo = () => {
    const localTodos = getAll();
    setTodos(localTodos);
  };

  return (
    <div className="container">
      <form onSubmit={addTodo} className="todolist__input input-box">
        <div className="shadow"></div>
        <input
          className="todolist__input__field input input-plane"
          type="text"
          placeholder="rejani kiriting"
          required
        />
        <button type="submit" className="add"></button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              handleCheck={checkedBtn}
            />
          );
        })}
      </ul>
      <div className="todolist__filters">
        <button onClick={allTodo} className="sort_buttons all-todos">
          All
        </button>
        <button
          onClick={unCompletedTodo}
          className="sort_buttons completed-todos"
        >
          UnCompleted
        </button>
        <button
          onClick={completedTodo}
          className="sort_buttons uncompleted-todos"
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default TodoList;
