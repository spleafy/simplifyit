// Components
interface FormProps {
  children: any;
  submit: any;
}

/**
 * Form Params
 * @param {Object} props
 * @param {any} props.children The children of the form
 * @param {any} props.submit The submit function for the onSubmit event
 * @returns Element
 */

const Form = ({ children, submit }: FormProps) => {
  return (
    <form className="select-none" onSubmit={submit} data-testid="form">
      {children}
    </form>
  );
};

export default Form;