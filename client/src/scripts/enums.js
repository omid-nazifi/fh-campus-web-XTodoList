const DashboardPages = {
  CREATE_TASK: "create_task",
  BOARD: "board",
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
  SETTINGS: "settings"
};

const TaskStatus = {
  TODO: 1,
  IN_PROGRESS: 2,
  SUSPENDED: 3,
  DONE: 4
}

const TaskPriority = {
  HIGH: 1,
  NORMAL: 2,
  LOW: 3
}

export { DashboardPages, TaskStatus, TaskPriority };