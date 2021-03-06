import React from "react";

function TodosFooter({
  lightTheme,
  itemsLeft,
  clearCompleted,
  activeState,
  setActiveState,
}) {
  return (
    <div
      className={`flex flex-row font-normal ${
        lightTheme ? "bg-white text-gray-700" : "bg-gray-800 text-gray-300"
      }  text-xxs justify-between items-center p-3 w-11/12 desktopBreakpoint:w-largerWidthTest rounded-sm mb-5 `}
    >
      <p className="ml-3 w-16">
        {" "}
        {itemsLeft()}{" "}
        {`${itemsLeft() === 0 || itemsLeft() > 1 ? "items left" : "item left"}`}
      </p>

      <div className="flex flex-row space-x-3">
        <p
          className={`cursor-pointer ${
            activeState === "all" && "text-mainBlueState"
          } px-2 rounded-full transition duration-100 transform ${
            lightTheme ? "hover:bg-lightGrayishBlueHover" : "hover:bg-gray-700"
          } `}
          onClick={() => setActiveState("all")}
        >
          All
        </p>
        <p
          className={`cursor-pointer ${
            activeState === "active" && "text-mainBlueState"
          } px-2 rounded-full transition duration-100 transform ${
            lightTheme ? "hover:bg-lightGrayishBlueHover" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveState("active")}
        >
          Active
        </p>
        <p
          className={`cursor-pointer ${
            activeState === "completed" && "text-mainBlueState"
          } px-2 rounded-full transition duration-100 transform ${
            lightTheme ? "hover:bg-lightGrayishBlueHover" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveState("completed")}
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
