import Head from "next/head";
import Image from "next/image";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/outline";
import desktDark from "../todo-app-resources/images/bg-desktop-dark.jpg";
import { useState } from "react";
import Todo from "../components/Todo";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const [newIsChecked, setNewIsChecked] = useState(false);

  const toggleNewChecked = () => {
    setNewIsChecked((prev) => !prev);
  };

  const newTodoHandler = (e) => {
    if (todo !== "") {
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
    } else {
      e.preventDefault();
    }

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

  return (
    <div className="flex flex-col bg-background_color min-h-screen font-mainFont">
      <Head>
        <title>Todo App nr2</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* BACKGROUND */}
      <Image src={desktDark} />
      {/* DIV for ENTIRE TODO SECTION */}
      <div className="flex flex-col justify-center items-center w-96 -mt-32 z-50 relative ml-auto mr-auto">
        {/* TODO text + sun/moon image */}
        <div className="flex flex-row items-center text-3xl w-96 justify-between">
          <h1 className="font-semibold text text-white">TODO</h1>
          <SunIcon className="h-5 w-5 text-white cursor-pointer" />
          {/* <MoonIcon className="h-5 w-5 text-white" /> */}
        </div>

        {/*NEW TODO CONTAINER */}
        <form
          onSubmit={(e) => newTodoHandler(e)}
          className="flex flex-row items-center p-3 bg-gray-800 w-96 mt-5 mb-2 rounded-md"
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
          {/* <div className="cursor-pointer ml-4 border-2 border-gray-600 h-5 w-5 bg-transparent rounded-full" /> */}
          <input
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            type="text"
            placeholder="Create a new todo..."
            className="bg-transparent flex-grow outline-none ml-4 text-white text-m"
          />
        </form>
        {/* TODOS */}
        {todos.map((todoItem, i) => (
          <Todo
            key={i}
            item={todoItem}
            toggleCompleted={toggleCompleted}
            removeTodo={removeTodo}
            priority={i}
          />
        ))}
        {/* BELOW TODOS SECTION */}
        <div className="flex flex-row font-normal text-gray-300 text-xxs justify-between items-center p-3 bg-gray-800 w-96 rounded-sm ">
          <p className="ml-3 w-16">
            {" "}
            {itemsLeft()}{" "}
            {`${
              itemsLeft() === 0 || itemsLeft() > 1 ? "items left" : "item left"
            }`}
          </p>

          <div className="flex flex-row space-x-3">
            <p className="cursor-pointer px-1 transition duration-100 transform hover:text-blue-400">
              All
            </p>
            <p className="cursor-pointer px-1 transition duration-100 transform hover:text-blue-400">
              Active
            </p>
            <p className="cursor-pointer px-1 transition duration-100 transform hover:text-blue-400">
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
      </div>
    </div>
  );
}
