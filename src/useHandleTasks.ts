import { useState, useEffect } from "react";

export type Task = {
  title: string;
  done: boolean;
  category: string;
  deadline?: string;
};

export const useHandleTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setIsLoaded] = useState(false);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  useEffect(() => {
    const tasksJson = localStorage.getItem("tasks");
    if (tasksJson) {
      setTasks(JSON.parse(tasksJson));
    } else {
      setTasks([
        {
          title: "shopping",
          done: true,
          category: "Chore",
        },
        {
          title: "reply email",
          done: false,
          category: "Work",
        },
        {
          title: "submit report",
          done: false,
          category: "work",
        },
      ]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [loaded, tasks]);

  const removeTask = (task: Task) => {
    setTasks(tasks.filter((_) => _ !== task));
  };

  const setTaskDone = (task: Task, done: boolean) => {
    setTasks(
      tasks.map((_) =>
        _ !== task
          ? _
          : {
              ...task,
              done,
            }
      )
    );
  };

  return {
    tasks,
    addTask,
    removeTask,
    setTaskDone,
  };
};
