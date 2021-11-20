import React from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

function Todo({ item, toggleCompleted, removeTodo, priority, lightTheme }) {
  return (
    <div
      className={`group flex flex-row items-center p-3 ${
        lightTheme ? "bg-white " : "bg-gray-800 "
      }  rounded-sm border-b-2 ${
        lightTheme ? "border-gray-300" : "border-gray-700"
      } cursor-pointer `}
    >
      {item.completed ? (
        /* Wrapp around a div -> prevents icon from reshaping size */
        <div>
          <CheckIcon
            onClick={() => toggleCompleted(item.index)}
            className="w-5 h-5 border-transparent ml-4 cursor-pointer text-gray-200 bg-gradient-to-br from-checkColorFrom to-checkColorTo rounded-full"
          />
        </div>
      ) : (
        /* Wrapp around a div -> prevents icon from reshaping size */

        <div>
          <div
            onClick={() => toggleCompleted(item.index)}
            className="cursor-pointer hover:border-checkColorFrom ml-4 border-borderWidthCircle border-gray-600  h-5 w-5 bg-transparent rounded-full"
          />
        </div>
      )}

      <p
        className={`${
          item.completed && !lightTheme
            ? "line-through text-gray-700"
            : "text-gray-300"
        } ${item.completed && lightTheme && "line-through text-gray-500"} ${
          !item.completed && lightTheme && "text-gray-900"
        } truncate cursor-pointer bg-transparent flex-grow outline-none ml-4 text-mediumLarge`}
      >
        {item.text}
      </p>
      {/* Wrapp div around an icon -> prevents icon from reshaping size when overflowing todo-text */}
      <div>
        <XIcon
          onClick={() => removeTodo(item.index)}
          className="h-4 w-4 opacity-0 group-hover:opacity-100 text-gray-700 cursor-pointer ml-5 transition duration-100 transform hover:scale-125"
        />
      </div>
    </div>
  );
}

export default Todo;
