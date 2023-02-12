import { FC, useState } from "react";
import { Tooltip } from "@prismane/core";
import {
  House,
  ChartLine,
  CheckSquareOffset,
  Bell,
  GearSix,
  Plus,
  CaretRight,
  Stack,
} from "phosphor-react";
// Components
import SitNavItem from "../../components/navigation/SitNavItem";
// Types
import { SitComponent } from "../../types";

const SitNav: FC<SitComponent> = ({ className, style }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const projects = [
    {
      name: "Default Project",
      color: "#ef4444",
    },
    {
      name: "Complex Project",
      color: "#f97316",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
    {
      name: "Team Project",
      color: "#22c55e",
    },
  ];

  return (
    <nav
      className={`flex flex-col justify-between items-center h-full transition-all border-r border-base-200 gap-20 ${
        expanded
          ? "w-[240px] min-w-[240px] p-5"
          : "w-[64px] : min-w-[64px] py-5"
      } ${className ? className : ""}`}
      style={style}
    >
      <div className="flex flex-col gap-5 w-full items-center">
        <SitNavItem
          to="home"
          icon={<House size={24} />}
          expanded={expanded}
          tooltip="Home"
        >
          Home
        </SitNavItem>
        <SitNavItem
          to="dashboard"
          icon={<ChartLine size={24} />}
          expanded={expanded}
          tooltip="Dashboard"
        >
          Dashboard
        </SitNavItem>
        <SitNavItem
          to="tasks"
          icon={<CheckSquareOffset size={24} />}
          expanded={expanded}
          tooltip="Tasks | 12"
        >
          <div className="flex justify-between items-center">
            Tasks{" "}
            <div className="flex items-center justify-center w-6 aspect-square bg-primary-500 text-white rounded-md text-xs">
              12
            </div>
          </div>
        </SitNavItem>
        <SitNavItem
          to="notifications"
          icon={<Bell size={24} />}
          expanded={expanded}
          tooltip="Notifications | 48"
        >
          <div className="flex justify-between items-center">
            Notifications
            <div className="flex items-center justify-center w-6 aspect-square bg-primary-500 text-white rounded-md text-xs">
              48
            </div>
          </div>
        </SitNavItem>
        <SitNavItem
          to="settings"
          icon={<GearSix size={24} />}
          expanded={expanded}
          tooltip="Settings"
        >
          Settings
        </SitNavItem>
      </div>
      <div className="flex w-full flex-col gap-16 justify-end items-center grow">
        <div className="flex flex-col gap-3 w-full items-center">
          <div
            className={`flex w-full items-center ${
              expanded ? "justify-between" : " justify-center"
            }`}
          >
            {expanded && (
              <span className="text-sm text-base-900">Projects</span>
            )}
            <div
              className={`flex items-center justify-center aspect-square rounded border border-base-200 cursor-pointer ${
                expanded ? "w-6" : "w-10"
              }`}
            >
              <Plus size={16} />
            </div>
          </div>
          <div className="flex flex-col w-full gap-3 max-h-[324px] overflow-y-scroll items-center">
            {projects.map((project: any) => (
              <SitNavItem
                to={`projects/${project.name}`}
                icon={
                  <div
                    className="w-2 aspect-square rounded-full"
                    style={{ backgroundColor: project.color }}
                  ></div>
                }
                expanded={expanded}
                tooltip={project.name}
              >
                <span className="text-inherit text-sm overflow-hidden overflow-ellipsis">
                  {project.name}
                </span>
              </SitNavItem>
            ))}
          </div>
        </div>
        <div
          className={`flex items-center rounded-lg text-primary-500 hover:bg-primary-100 justify-center aspect-square w-10 cursor-pointer transition-all ${
            expanded ? "self-end" : "self-center"
          }`}
          onClick={toggleExpanded}
        >
          <CaretRight
            size={20}
            weight="bold"
            className={`transition-all ${expanded ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
    </nav>
  );
};

export default SitNav;
