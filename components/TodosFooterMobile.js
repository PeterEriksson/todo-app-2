import React from "react";

function TodosFooterMobile({
  lightTheme,
  itemsLeft,
  clearCompleted,
  activeState,
  setActiveState,
}) {
  return (
    /* Total container for TodosFooterMobile */
    <div className="flex flex-col w-11/12">
      {/* Items left + Clear completed mobile container */}
      <div
        className={`flex flex-row font-normal ${
          lightTheme ? "bg-white text-gray-700" : "bg-gray-800 text-gray-300"
        }  text-xs justify-between items-center p-3  rounded-sm mb-3 `}
      >
        <p className="ml-3 w-16">
          {" "}
          {itemsLeft()}{" "}
          {`${
            itemsLeft() === 0 || itemsLeft() > 1 ? "items left" : "item left"
          }`}
        </p>

        <p
          onClick={clearCompleted}
          className="mr-3 cursor-pointer transition duration-100 transform hover:scale-105"
        >
          Clear Completed
        </p>
      </div>
      {/* Container for All Active Completed */}
      <div
        className={`flex flex-row ${
          lightTheme ? "bg-white text-gray-700" : "bg-gray-800 text-gray-300"
        }  text-xxs items-center p-3    rounded-sm mb-5`}
      >
        {/* additional container to center <p> tags. */}
        <div className="flex flex-row space-x-5 font-semibold ml-auto mr-auto text-mobileBottomSectionSize">
          <p
            className={`cursor-pointer ${
              activeState === "all" && "text-mainBlueState"
            } px-2 rounded-full transition duration-100 transform ${
              lightTheme
                ? "hover:bg-lightGrayishBlueHover"
                : "hover:bg-gray-700"
            } `}
            onClick={() => setActiveState("all")}
          >
            All
          </p>
          <p
            className={`cursor-pointer ${
              activeState === "active" && "text-mainBlueState"
            } px-2 rounded-full transition duration-100 transform ${
              lightTheme
                ? "hover:bg-lightGrayishBlueHover"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveState("active")}
          >
            Active
          </p>
          <p
            className={`cursor-pointer ${
              activeState === "completed" && "text-mainBlueState"
            } px-2 rounded-full transition duration-100 transform ${
              lightTheme
                ? "hover:bg-lightGrayishBlueHover"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveState("completed")}
          >
            Completed
          </p>
        </div>
      </div>
    </div>
  );
}

export default TodosFooterMobile;
