import Head from "next/head";
import Image from "next/image";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { /* CheckCircleIcon, */ CheckIcon } from "@heroicons/react/outline";
import desktDark from "../todo-app-resources/images/bg-desktop-dark.jpg";
import desktLight from "../todo-app-resources/images/bg-desktop-light.jpg";
import bgMobileDark from "../todo-app-resources/images/bg-mobile-dark.jpg";
import bgMobileLight from "../todo-app-resources/images/bg-mobile-light.jpg";
import { useEffect, useState, useLayoutEffect } from "react";
import Todo from "../components/Todo";
import Form from "../components/Form";
import TodosFooter from "../components/TodosFooter";
import TodosFooterMobile from "../components/TodosFooterMobile";
import { /* CheckIcon, */ XIcon } from "@heroicons/react/outline";
/* import FlipMove from "react-flip-move"; */

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

/* https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md */
import { resetServerContext } from "react-beautiful-dnd";
/* import { renderToString } from "react-dom/server"; */

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [newIsChecked, setNewIsChecked] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [activeState, setActiveState] = useState("all");
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [widthState, setWidthState] = useState(null);

  /* https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md */
  resetServerContext();

  /* https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react */
  /* function useWindowSize() {
    const [size, setSize] = useState(0);
    useEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  } */

  /* https://www.pluralsight.com/guides/re-render-react-component-on-window-resize */
  useEffect(() => {
    setWidthState(window.innerWidth);

    console.log("attach listener(performance check)");
    function handleResize() {
      setWidthState(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    /* return (_) => {
        window.removeEventListener("resize", handleResize);
      }; */
  }, []);

  useEffect(() => {
    const newActiveArr = todos.filter((item) => !item.completed);
    setActiveTodos(newActiveArr);
    const newCompletedArr = todos.filter((item) => item.completed);
    setCompletedTodos(newCompletedArr);
  }, [todos]);

  const toggleNewChecked = () => {
    setNewIsChecked((prev) => !prev);
  };

  const newTodoHandler = (e) => {
    /* user can't add a todo that matches an existing todo -> */
    const matched = todos.some((item) => item.text === todo);
    if (matched) {
      e.preventDefault();
      alert("that todo already exists");
    } else {
      e.preventDefault();
      const newTodos = [
        ...todos,
        { text: todo, completed: false, index: getRandomInt() },
      ];
      const newTodosWithChecked = [
        ...todos,
        { text: todo, completed: true, index: getRandomInt() },
      ];
      newIsChecked ? setTodos(newTodosWithChecked) : setTodos(newTodos);

      setTodo("");

      setNewIsChecked(false);
    }
  };

  //Utility function for getting a unique index
  function getRandomInt() {
    return Math.floor(Math.random() * 5000);
  }

  const toggleCompleted = (i) => {
    const updatedTodos = todos.map((item) => {
      if (item.index === i) {
        return { ...item, completed: !item.completed };
      } else {
        return item;
      }
    });
    setTodos(updatedTodos);
  };

  const removeTodo = (i) => {
    const updatedTodos = todos.filter((item) => item.index !== i);
    setTodos(updatedTodos);
  };

  const itemsLeft = () => {
    const itemsLeftArray = todos.filter((item) => !item.completed);
    return itemsLeftArray.length;
  };

  const clearCompleted = () => {
    const updatedArr = todos.filter((item) => !item.completed);
    setTodos(updatedArr);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  const handleOnDragEndActive = (result) => {
    if (!result.destination) return;
    const items = Array.from(activeTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setActiveTodos(items);
  };

  const handleOnDragEndCompleted = (result) => {
    if (!result.destination) return;
    const items = Array.from(completedTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCompletedTodos(items);
  };

  /* Make sure synced with desktopBreakpoint in tailwind.config.js*/
  const _desktopBreakpoint = 625;

  return (
    <div
      className={`flex flex-col ${
        lightTheme ? "bg-gray-200" : "bg-backgroundColorDark"
      }  min-h-screen font-mainFont transform transition duration-200 ease-in `}
    >
      <Head>
        <title>Todo App by Peter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* UPPER BACKGROUND */}
      {!lightTheme && widthState < _desktopBreakpoint && (
        <Image src={bgMobileDark} alt="" />
      )}
      {!lightTheme && widthState >= _desktopBreakpoint && (
        <Image src={desktDark} alt="" />
      )}

      {lightTheme && widthState < _desktopBreakpoint && (
        <Image src={bgMobileLight} alt="" />
      )}
      {lightTheme && widthState >= _desktopBreakpoint && (
        <Image src={desktLight} alt="" />
      )}

      {/* DIV for ENTIRE TODO SECTION */}
      <div className="flex flex-col justify-center items-center w-11/12 desktopBreakpoint:w-largerWidthTest -mt-32 z-50 relative ml-auto mr-auto">
        {/* TODO header + sun/moon icon (light/dark theme) */}
        <div className="flex flex-row items-center text-3xl w-11/12  desktopBreakpoint:w-largerWidthTest justify-between">
          <h1 className="font-semibold text text-white">TODO</h1>
          {lightTheme ? (
            <MoonIcon
              onClick={() => setLightTheme((prev) => !prev)}
              className="h-5 w-5 text-white cursor-pointer"
            />
          ) : (
            <SunIcon
              onClick={() => setLightTheme((prev) => !prev)}
              className="h-5 w-5 text-white cursor-pointer"
            />
          )}
        </div>

        {/*NEW TODO FORM */}
        <Form
          newTodoHandler={newTodoHandler}
          lightTheme={lightTheme}
          newIsChecked={newIsChecked}
          toggleNewChecked={toggleNewChecked}
          setTodo={setTodo}
          todo={todo}
          /* todoInputRef="todoInputRef" */
        />

        {/* TODOS */}
        {activeState === "all" && (
          <div className="flex flex-col w-11/12 desktopBreakpoint:w-largerWidthTest">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="todos">
                {(provided) => (
                  <div
                    className=""
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {todos.map((todoItem, i) => {
                      return (
                        <Draggable
                          key={todoItem.text}
                          draggableId={todoItem.text}
                          index={i}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className=""
                            >
                              <Todo
                                /* key={todoItem.text} */
                                item={todoItem}
                                toggleCompleted={toggleCompleted}
                                removeTodo={removeTodo}
                                priority={i}
                                lightTheme={lightTheme}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}

        {activeState === "active" && (
          <div className="flex flex-col w-11/12 desktopBreakpoint:w-largerWidthTest">
            <DragDropContext onDragEnd={handleOnDragEndActive}>
              <Droppable droppableId="activetodos">
                {(provided) => (
                  <div
                    className=""
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {activeTodos.map((todoItem, i) => {
                      return (
                        <Draggable
                          key={todoItem.text}
                          draggableId={todoItem.text}
                          index={i}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className=""
                            >
                              <Todo
                                item={todoItem}
                                toggleCompleted={toggleCompleted}
                                removeTodo={removeTodo}
                                priority={i}
                                lightTheme={lightTheme}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}

        {activeState === "completed" && (
          <div className="flex flex-col w-11/12 desktopBreakpoint:w-largerWidthTest">
            <DragDropContext onDragEnd={handleOnDragEndCompleted}>
              <Droppable droppableId="completedtodos">
                {(provided) => (
                  <div
                    className=""
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {completedTodos.map((todoItem, i) => {
                      return (
                        <Draggable
                          key={todoItem.text}
                          draggableId={todoItem.text}
                          index={i}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className=""
                            >
                              <Todo
                                item={todoItem}
                                toggleCompleted={toggleCompleted}
                                removeTodo={removeTodo}
                                priority={i}
                                lightTheme={lightTheme}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}

        {/* BELOW TODOS SECTION/TODOSFOOTER. Depending on widthState 
        either mobile footer or desktop footer is rendered */}
        {widthState >= _desktopBreakpoint ? (
          <TodosFooter
            lightTheme={lightTheme}
            itemsLeft={itemsLeft}
            clearCompleted={clearCompleted}
            activeState={activeState}
            setActiveState={setActiveState}
          />
        ) : (
          <TodosFooterMobile
            lightTheme={lightTheme}
            itemsLeft={itemsLeft}
            clearCompleted={clearCompleted}
            activeState={activeState}
            setActiveState={setActiveState}
          />
        )}

        <h2 className="text-gray-600 text-lg mt-2 mb-3">
          Drag n drop to reorder list
        </h2>
        <p className="text-gray-600 text-xs font-serif mb-2">by peter</p>
      </div>
    </div>
  );
}
