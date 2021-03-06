import { useState, FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Phone, VideoCamera, Info } from "phosphor-react";
// Components
import Button from "../components/basic/Button";
import ProfilePicture from "../components/basic/ProfilePicture";
import TopNavigation from "../components/navigation/TopNavigation";
// Redux
import { RootStateOrAny, useSelector } from "react-redux";
// Socket IO
import io from "socket.io-client";

const MessagesPage: FC = () => {
  /**
   * Document title
   * @description Updating the document title
   */
  document.title = `Messages / ${process.env.REACT_APP_TITLE}`;

  /**
   * Messages state
   * @description Creating a useState variable, so we can update the messages upon receiving them
   */
  const [messages, setMessages] = useState<string[]>([""]);

  /**
   * Socket
   * @description Creating a socket with the "io" method
   */
  const socket = io(
    `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}:5000`
  );

  /**
   * Socket get message
   * @description When the socket receives a message, the message will be pushed in the array of the messages and the state would be updated
   */
  socket.on("broadcast-message", (data: string) => {
    setMessages([...messages, data]);
  });

  /**
   * useForm deconstruction
   * @description Deconstructing the useForm hook
   */
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  /**
   * Submit method
   * @description Creating a submit method for the onSubmit form event
   */
  const submit = async (values: FieldValues) => {
    // Emit the message to the socket, so it can be broadcasted to the other listeners
    socket.emit("send-message", values.message);
  };

  /**
   * Logged user state
   * @description Getting the logged user state from the redux store
   */
  const loggedUser = useSelector((state: RootStateOrAny) => state.user.user);

  return (
    <>
      <div className="flex flex-col w-[400px] min-w-[400px] h-full gap-5 px-4 pt-8 bg-white border-r-[1px] border-slate-200 dark:border-slate-600 dark:bg-slate-900">
        <div className="flex items-center justify-between w-full gap-5 cursor-pointer px-3 py-1 rounded-lg">
          <div className="flex gap-5">
            <div className="w-[50px] aspect-square">
              <ProfilePicture
                color={loggedUser.settings.profile.profileColor}
                name={loggedUser.fullname}
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <h2>Martin Petrov</h2>
              <div className="flex gap-2">
                <h3 className="text-sm whitespace-nowrap overflow-ellipsis max-w-[170px] overflow-hidden">
                  Martin Petrov sent a message
                </h3>
                <span className="text-slate-400 text-sm">4h</span>
              </div>
            </div>
          </div>
          <div className="w-[10px] h-[10px] aspect-square rounded-full bg-blue-400"></div>
        </div>
        <div className="flex items-center justify-between w-full gap-5 cursor-pointer px-3 py-2 rounded-lg">
          <div className="flex gap-5">
            <div className="w-[50px] aspect-square">
              <ProfilePicture
                color={loggedUser.settings.profile.profileColor}
                name={loggedUser.fullname}
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base">Martin Petrov</span>
              <div className="flex gap-2">
                <span className="text-sm">Martin Petrov sent a message</span>
                <span className="text-slate-400 text-sm">4h</span>
              </div>
            </div>
          </div>
          {/* <div className="w-[10px] h-[10px] aspect-square rounded-full bg-blue-400"></div> */}
        </div>
        <div className="flex items-center justify-between w-full gap-5 cursor-pointer px-3 py-1 bg-slate-200 rounded-lg">
          <div className="flex gap-5">
            <div className="w-[50px] aspect-square">
              <ProfilePicture
                color={loggedUser.settings.profile.profileColor}
                name={loggedUser.fullname}
                size="sm"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base">Martin Petrov</span>
              <div className="flex gap-2">
                <span className="text-sm">Martin Petrov sent a message</span>
                <span className="text-slate-400 text-sm">4h</span>
              </div>
            </div>
          </div>
          {/* <div className="w-[10px] h-[10px] aspect-square rounded-full bg-blue-400"></div> */}
        </div>
      </div>
      <div className="w-full">
        <TopNavigation>
          <div className="flex gap-5 items-center">
            <div className="w-9 h-9 flex gap-5">
              <ProfilePicture
                color={loggedUser.settings.profile.profileColor}
                name={loggedUser.fullname}
                size="sm"
              />
            </div>
            <span>Martin Petrov</span>
          </div>
          <div className="flex gap-5 text-xl text-theme-500">
            <Button
              variant="action"
              color="theme"
              className="tooltip"
              tooltip="Start an audio call"
            >
              <Phone />
            </Button>
            <Button
              variant="action"
              color="theme"
              className="tooltip"
              tooltip="Start a video call"
            >
              <VideoCamera />
            </Button>
            <Button
              variant="action"
              color="theme"
              className="tooltip tooltip-bl"
              tooltip="Conversation information"
            >
              <Info />
            </Button>
          </div>
        </TopNavigation>
        <div className="overflow-auto">
          {messages.map((message: string, index: number) => (
            <div className="my-2 text-white" key={index}>
              {message}
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="bottom-5 absolute flex gap-5"
        >
          <input
            id="message"
            placeholder="Enter message:"
            type="text"
            className="text-sm py-2 rounded-lg border-2 border-slate-200 px-4 placeholder:text-slate-200 focus-within:border-slate-300 transition-colors items-center dark:border-slate-500"
            {...register("message")}
          />
          <div className="w-fit">
            <Button variant="primary" submit>
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MessagesPage;
