import React, { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";
import TodoList from "./TodoList";
import TodoAdd from "./TodoAdd";

import "./styles.css";


const init = () => {
  return JSON.parse(localStorage.getItem("todos") || "[]");
};

const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const handleDelete = (todoId) => {
    const action = {
      type: "REMOVE_TODO",
      payload: todoId,
    };

    dispatch(action);
  };

  const handleToggle = (todoId) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: todoId,
    });
  };

  const handleAddTodo = (newTodo) => {
    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
    });
  };

  return (
    <>
      <h1>TodoApp ( {todos.length} )</h1>
      <hr />
      <div className="row">
        <div className="col-7">
          <TodoList
            todos={todos}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        </div>

        <div className="col-5">
          <TodoAdd handleAddTodo={handleAddTodo}  />
        </div>
      </div>
    </>
  );
};

export default TodoApp;
