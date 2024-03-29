// Actions
import ProjectsActions from "./actions/ProjectsActions";
import TasksActions from "./actions/TasksActions";

const SitAppActions = () => {
  return (
    <div className="fixed top-0 left-0 flex w-fit h-fit z-10">
      <ProjectsActions />
      <TasksActions />
      <div className="flex flex-col-reverse absolute bottom-5 right-5"></div>
    </div>
  );
};

export default SitAppActions;
