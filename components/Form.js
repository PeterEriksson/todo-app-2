import React from "react";
import { /* CheckCircleIcon, */ CheckIcon } from "@heroicons/react/outline";

function Form({
  newTodoHandler,
  lightTheme,
  newIsChecked,
  toggleNewChecked,
  setTodo,
  todo,
}) {
  return (
    <form
      onSubmit={(e) => newTodoHandler(e)}
      className={`flex flex-row items-center p-3 ${
        lightTheme ? "bg-white" : "bg-gray-800"
      }  w-96 mt-5 mb-2 rounded-md`}
    >
      {newIsChecked ? (
        <CheckIcon
          onClick={() => toggleNewChecked()}
          className="w-5 h-5 border-2 border-transparent ml-4 cursor-pointer bg-blue-400 rounded-full"
        />
      ) : (
        <div
          onClick={() => toggleNewChecked()}
          className="cursor-pointer ml-4 border-2 border-gray-600 h-5 w-5 bg-transparent rounded-full"
        />
      )}
      <input
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        type="text"
        placeholder="Create a new todo..."
        className={`bg-transparent flex-grow outline-none ${
          lightTheme ? "text-gray-800" : "text-gray-300"
        } ml-4 text-m`}
      />
    </form>
  );
}

export default Form;
