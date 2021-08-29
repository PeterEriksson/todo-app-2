import React from "react";

function TodosFooter({ lightTheme, itemsLeft, clearCompleted }) {
  return (
    <div
      className={`flex flex-row font-normal ${
        lightTheme ? "bg-white text-gray-700" : "bg-gray-800 text-gray-300"
      }  text-xxs justify-between items-center p-3  w-96 rounded-sm `}
    >
      <p className="ml-3 w-16">
        {" "}
        {itemsLeft()}{" "}
        {`${itemsLeft() === 0 || itemsLeft() > 1 ? "items left" : "item left"}`}
      </p>

      <div className="flex flex-row space-x-3">
        <p
          className={`cursor-pointer px-2 rounded-full transition duration-100 transform ${
            lightTheme ? "hover:bg-lightGrayishBlueHover" : "hover:bg-gray-700"
          } `}
        >
          All
        </p>
        <p
          className={`cursor-pointer px-2 rounded-full transition duration-100 transform ${
            lightTheme ? "hover:bg-lightGrayishBlueHover" : "hover:bg-gray-700"
          }`}
        >
          Active
        </p>
        <p
          className={`cursor-pointer px-2 rounded-full transition duration-100 transform ${
            lightTheme ? "hover:bg-lightGrayishBlueHover" : "hover:bg-gray-700"
          }`}
        >
          Completed
        </p>
      </div>
      <p
        onClick={clearCompleted}
        className="mr-3 cursor-pointer transition duration-100 transform hover:scale-105"
      >
        Clear Completed
      </p>
    </div>
  );
}

export default TodosFooter;
