import Head from "next/head";
import Image from "next/image";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { /* CheckCircleIcon, */ CheckIcon } from "@heroicons/react/outline";
import desktDark from "../todo-app-resources/images/bg-desktop-dark.jpg";
import desktLight from "../todo-app-resources/images/bg-desktop-light.jpg";
import bgMobileDark from "../todo-app-resources/images/bg-mobile-dark.jpg";
import bgMobileLight from "../todo-app-resources/images/bg-mobile-light.jpg";
import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import Form from "../components/Form";
import TodosFooter from "../components/TodosFooter";
import TodosFooterMobile from "../components/TodosFooterMobile";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [newIsChecked, setNewIsChecked] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [activeState, setActiveState] = useState("all");
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const [widthState, setWidthState] = useState(0);

  /* For handling mobile design */
  useEffect(() => {
    function handleResize() {
      setWidthState(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
    /* https://www.pluralsight.com/guides/re-render-react-component-on-window-resize */
  });

  const toggleNewChecked = () => {
    setNewIsChecked((prev) => !prev);
  };

  const newTodoHandler = (e) => {
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
    /* console.log(i); */
  };

  const itemsLeft = () => {
    const itemsLeftArray = todos.filter((item) => !item.completed);
    return itemsLeftArray.length;
  };

  const clearCompleted = () => {
    const updatedArr = todos.filter((item) => !item.completed);
    setTodos(updatedArr);
  };

  useEffect(() => {
    const newActiveArr = todos.filter((item) => !item.completed);
    setActiveTodos(newActiveArr);
    const newCompletedArr = todos.filter((item) => item.completed);
    setCompletedTodos(newCompletedArr);
  }, [todos]);

  const desktopDesignMinWidth = 585;

  return (
    <div
      className={`flex flex-col ${
        lightTheme ? "bg-gray-200" : "bg-backgroundColorDark"
      }  min-h-screen font-mainFont`}
    >
      <Head>
        <title>Todo App nr2</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* UPPER BACKGROUND */}
      {/* Logic for displaying uppe background depending on screen size and dark/light theme */}
      {!lightTheme && widthState < desktopDesignMinWidth && (
        <Image src={bgMobileDark} />
      )}
      {!lightTheme && widthState > desktopDesignMinWidth - 1 && (
        <Image src={desktDark} />
      )}

      {lightTheme && widthState < desktopDesignMinWidth && (
        <Image src={bgMobileLight} />
      )}
      {lightTheme && widthState > desktopDesignMinWidth - 1 && (
        <Image src={desktLight} />
      )}

      {/* DIV for ENTIRE TODO SECTION */}
      <div className="flex flex-col justify-center items-center desktopBreakpoint:w-96 w-80 -mt-32 z-50 relative ml-auto mr-auto">
        {/* TODO header + sun/moon image (light/dark theme) */}
        <div className="flex flex-row items-center text-3xl desktopBreakpoint:w-96 w-80 justify-between">
          <h1 className="font-semibold text text-white">TODO...{widthState}</h1>
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
        />

        {/* TODOS */}
        {/* create new state for active todos and completed todos */}
        {/* when todos is changed a useEffect handles setting new state for active & completed arrays. */}
        {/* a condition is checked so that the todoArray the user asked for can be mapped out below. */}

        {activeState === "all" &&
          todos.map((todoItem, i) => (
            <Todo
              key={i}
              item={todoItem}
              toggleCompleted={toggleCompleted}
              removeTodo={removeTodo}
              priority={i}
              lightTheme={lightTheme}
            />
          ))}

        {activeState === "active" &&
          activeTodos.map((todoItem, i) => (
            <Todo
              key={i}
              item={todoItem}
              toggleCompleted={toggleCompleted}
              removeTodo={removeTodo}
              priority={i}
              lightTheme={lightTheme}
            />
          ))}

        {activeState === "completed" &&
          completedTodos.map((todoItem, i) => (
            <Todo
              key={i}
              item={todoItem}
              toggleCompleted={toggleCompleted}
              removeTodo={removeTodo}
              priority={i}
              lightTheme={lightTheme}
            />
          ))}

        {/* BELOW TODOS SECTION/TODOSFOOTER. Depending on widthState 
        either mobile footer or desktop footer is rendered */}
        {widthState > desktopDesignMinWidth - 1 ? (
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
      </div>
    </div>
  );
}
