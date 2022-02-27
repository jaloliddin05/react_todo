import "./todo_item.css";

function TodoItem({ todo, handleCheck, onDelete }) {
  return (
    <li className="todo-item">
      <p className="todo-desc">{todo?.title}</p>
      <label className="checkbox-label">
        <input
          className="check visually-hidden"
          onChange={(e) => {
            handleCheck(e, todo.id);
          }}
          checked={todo?.isCompleted}
          type="checkbox"
        />
        <span className="check_design"></span>
      </label>
      <button
        onClick={() => {
          onDelete(todo.id);
        }}
        className="delete-btn"
      >
        delete
      </button>
    </li>
  );
}

export default TodoItem;
