import { useState, FC } from "react";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";

interface ToggleSwitchProps {
  getValues: UseFormGetValues<any>;
  name: string;
  register: UseFormRegister<any>;
}

/**
 * TextFormField Params
 * @param {Object} props
 * @param {string} props.name The name the field will be registered with
 * @param {any} props.register The useForm hook register function
 * @param {any} props.getValues The useForm hook getValue function to toggle the "toggled" style of the component
 * @returns Element
 */

const ToggleSwitch: FC<ToggleSwitchProps> = ({ name, register, getValues }) => {
  /**
   * Toggled State
   * @description Creating a useState variable, so we can toggle the "toggled" style of the component.
   */

  const [toggled, setToggled] = useState(getValues(name));

  return (
    <label
      className={`${
        toggled
          ? "bg-theme-500 dark:bg-theme-600"
          : "bg-slate-400 dark:bg-slate-500"
      } ${
        toggled
          ? "hover:bg-theme-600 dark:hover:bg-theme-700"
          : "hover:bg-slate-500 dark:hover:bg-slate-600"
      } flex justify-center items-center transition-colors rounded-2xl h-[20px] w-[40px] cursor-pointer relative`}
      htmlFor={name}
      onClick={() => {
        setToggled(!getValues(name));
      }}
    >
      <input {...register(name)} id={name} type="checkbox" className="hidden" />
      <span
        className={`absolute h-[14px] aspect-square rounded-full bg-white transition-all left-[3px] ${
          toggled ? "!left-[23px]" : ""
        }`}
      ></span>
    </label>
  );
};

export default ToggleSwitch;
