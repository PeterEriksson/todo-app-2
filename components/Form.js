import React, { useState } from "react";
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
      } w-11/12 desktopBreakpoint:w-largerWidthTest mt-5 mb-2 rounded-md`}
    >
      {newIsChecked ? (
        <CheckIcon
          onClick={() => toggleNewChecked()}
          className="w-5 h-5 text-gray-200 border-transparent ml-4 cursor-pointer bg-gradient-to-br from-checkColorFrom to-checkColorTo rounded-full"
        />
      ) : (
        <div
          onClick={() => toggleNewChecked()}
          className="cursor-pointer ml-4 border-borderWidthCircle border-gray-600 h-5 w-5 bg-transparent rounded-full"
        />
      )}
      <input
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        required
        pattern="([^\s][A-z0-9À-ž\s]+)"
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
