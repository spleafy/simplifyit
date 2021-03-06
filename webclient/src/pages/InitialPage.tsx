import { useEffect, FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
// Components
import Card from "../components/basic/Card";
import Form from "../components/form/Form";
import TextFormField from "../components/form/TextFormField";
import Button from "../components/basic/Button";
import ColorPicker from "../components/form/ColorPicker";
// Utils
import { validateRequired } from "../utils/validators";
import { submitForm } from "../utils/form";
import { updateUserData } from "../utils/user";
import { authToken } from "../utils/api";
// Redux
import { updateUser } from "../redux/userSlice";
import { updateActiveWorkspace } from "../redux/workspaceSlice";

const InitialSetupPage: FC = () => {
  /**
   * Navigate method
   * @description Creating a navigate method from the useNavigate hook, so we can navigate through the app
   */
  const navigate = useNavigate();

  /**
   * Dispatch method
   * @description Crating a dispatch method from the useDispatch hook, so we can update the redux store
   */
  const dispatch = useDispatch();

  /**
   * useForm deconstruction
   * @description Deconstructing the useForm hook
   */
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  /**
   * Submit method
   * @description Creating a submit method for the form onSubmit method
   */
  const submit = async (values: FieldValues) => {
    // Getting the token from the local storage
    const token = localStorage.getItem("X-Auth-Token");

    // Submitting the form and awaiting the response
    const response = await submitForm(values, "user/initial", token);

    // If the response is 200, update the user and update the workspace in the redux store, then navigate the user to the home page of the app
    if (response.status === 200) {
      dispatch(updateUser(response.data.user));
      dispatch(updateActiveWorkspace(response.data.workspace));
      navigate("/app/home");
    }
  };

  /**
   * Logged user
   * @description Getting the logged user from the redux store
   */
  const loggedUser = useSelector((state: RootStateOrAny) => state.user.user);

  /**
   * useEffect hook
   * @description Creating a useEffect hook
   */
  useEffect(() => {
    // Resetting the form values, when we get the user back from the redux store
    reset({
      name: loggedUser.username ? `${loggedUser.username}'s workspace` : "",
      color: "slate",
    });
  }, [reset, loggedUser]);

  /**
   * useEffect hook
   * @description Creating a useEffect hook
   */
  useEffect(() => {
    const effect = async () => {
      // Authenticating the token
      const response = await authToken();

      // If the token is not valid, we navigate the user to the authentication pages, if it is valid we update the user data
      if (response.status !== 200) {
        navigate("/auth");
      } else {
        await updateUserData();
      }
    };

    effect();
  }, [navigate]);

  /**
   * useEffect hook
   * @description Creating a useEffect hook
   */
  useEffect(() => {
    // If the logged user has passed the initial setup, he will be navigated to the home page
    if (loggedUser.settings && loggedUser.settings.initialSetup) {
      navigate("/app/home");
    }
  }, [loggedUser, navigate]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card variant="popup" heading="Let's setup your workspace" width="480px">
        <Form submit={handleSubmit(submit)}>
          <TextFormField
            register={register}
            label="Workspace name:"
            name="name"
            placeholder="Enter your workspace name:"
            error={errors.name}
            validators={{
              required: (v: string) => validateRequired(v),
            }}
          />
          <span className="mb-5 text-slate-700 text-sm flex items-center justify-between dark:text-slate-100">
            Workspace color:
          </span>
          <div className="flex w-full flex-wrap gap-5 mb-8">
            <ColorPicker
              name="color"
              register={register}
              getValues={getValues}
              setValue={setValue}
              reset={reset}
              variant="rounded"
              animate="scale"
              active="dot"
              size="xs"
            />
          </div>
          <Button variant="primary" submit full>
            Create
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default InitialSetupPage;
