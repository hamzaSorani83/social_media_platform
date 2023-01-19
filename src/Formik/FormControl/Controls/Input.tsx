import { Field } from "formik";
import tw, { TwStyle } from "twin.macro";

const TwInput = tw(Field)`block text-gray-700 bg-white rounded w-full px-4 py-2 text-xl font-normal bg-clip-padding border-2 border-solid border-gray-300  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-2`

interface IProps {
  name: string;
  [rest: string]: any;
  className?: TwStyle
}

const Input: React.FC<IProps> = ({ name, className, ...rest }) => {
  return (
    <TwInput name={name} id={name} {...rest} className={["Form-input", className].join(' ')} />
  )
}

export default Input;