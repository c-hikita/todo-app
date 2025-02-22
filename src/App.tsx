import React, { useState } from "react";
import { useHandleTasks } from "./useHandleTasks";
import "./App.css";

const App: React.FC = () => {
  const { tasks, addTask, removeTask, setTaskDone } = useHandleTasks();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Chore");
  const [filter, setfilter] = useState("");
  const [isDeadline, setIsDeadline] = useState(false);
  const [deadline, setDeadline] = useState(
    new Date().toISOString().slice(0, 10)
  );

  return (
    <>
      <div className="form">
        <div>
          <label>
            Add deadline:
            <input 
              type="checkbox"
              checked={isDeadline}
              onChange={(e) => setIsDeadline(e.target.checked)}
            />
          </label>
          {isDeadline && (
            <input 
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)} 
            />
          )}
        </div>
        <div>
          Category:
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Chore">Chore</option>
            <option value="Work">Work</option>
            <option value="Hobby">Hobby</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="button"
            value="Add"
            onClick={() => {
              addTask({
                title,
                category,
                done: false,
                ...(isDeadline && { deadline}),
              });
              setTitle("");
            }}
          />
        </div>
      </div>
      <div className="filter">
        Filter by category:
        <select value={filter} onChange={(e) => setfilter(e.target.value)}>
          <option value="">Show all</option>
          <option value="Chore">Chore</option>
          <option value="Work">Work</option>
          <option value="Hobby">Hobby</option>
        </select>
      </div>
      <ul>
        {tasks
          .filter((task) => !filter || task.category === filter)
          .sort((a, b) => ((a.deadline ?? "") < (b.deadline ?? "") ? -1 : 1))
          .map((task, i) => (
            <li
              key={i}
              {...(task.deadline && 
                task.deadline < new Date().toISOString().slice(0, 10) && {
                  className: "expired",
                })}
            >
              <label>
                {task.deadline && <p>Deadline: {task.deadline}</p>}
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={(e) => setTaskDone(task, e.target.checked)}
                />
                <span>{task.category}</span>
                {task.title}
              </label>
              <button onClick={() => removeTask(task)}>x</button>
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default App;
