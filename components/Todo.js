import React from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

function Todo({ item, toggleCompleted, removeTodo, priority }) {
  return (
    <div className="flex flex-row items-center p-3 bg-gray-800 w-96 rounded-sm border-b-2 border-gray-700">
      {item.completed ? (
        /* Wrapp around a div -> prevents icon from reshaping size */
        <div>
          <CheckIcon
            onClick={() => toggleCompleted(item.index)}
            className="w-5 h-5 border-2 border-transparent ml-4 cursor-pointer bg-blue-400 rounded-full"
          />
        </div>
      ) : (
        /* Wrapp around a div -> prevents icon from reshaping size */
        <div>
          <div
            onClick={() => toggleCompleted(item.index)}
            className="cursor-pointer ml-4 border-2 border-gray-600  h-5 w-5 bg-transparent rounded-full"
          />
        </div>
      )}

      <p
        className={`${
          item.completed ? "line-through text-gray-700" : "text-gray-300"
        } truncate cursor-pointer bg-transparent flex-grow outline-none ml-4 text-m`}
      >
        {item.text}
      </p>
      {/* Wrapp div around an icon -> prevents from reshaping size when overflowing todo text */}
      <div>
        <XIcon
          onClick={() => removeTodo(item.index)}
          className="h-4 w-4 text-gray-700 cursor-pointer ml-5 transition duration-100 transform hover:scale-125"
        />
      </div>
    </div>
  );
}

export default Todo;
