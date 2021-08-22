import "./App.css";
import { useState, useEffect } from "react";
import apis from "../apis/api";

const App = () => {
  const [toDo, setToDo] = useState("");
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    const getToDos = async () => {
      const data = await apis.getAllToDos();
      setToDoList(data);
    };
    getToDos();
  }, [toDoList]);

  function addToDo() {
    apis.insertToDo({ toDoName: toDo });
    setToDo("");
  }

  return (
    <div className="app">
      <div className="content">
        <ul className="inputPlace">
          <input
            placeholder={'Enter "To Do" here!'}
            className="textInput"
            value={toDo}
            type="text"
            name="TODO"
            onChange={(e) => setToDo(e.target.value)}
          />
          <button className="button" type="submit" onClick={addToDo}>
            Add To Do
          </button>
        </ul>
      </div>
      <div className="content">
        <h1 className="listTitle">To Do List</h1>
        <ul className="toDoList">
          {toDoList.length >> 0 ? (
            toDoList.map((item) => {
              return (
                <li className="listItem" key={item}>
                  {item}
                </li>
              );
            })
          ) : (
            <h1 className="listTitle">No items to show</h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
