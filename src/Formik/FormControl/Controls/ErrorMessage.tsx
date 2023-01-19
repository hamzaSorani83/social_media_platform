import tw from "twin.macro";
import { ErrorMessage } from "formik";

const TwAlert = tw.a`font-medium mt-3 underline rounded-lg py-3 px-6 text-base my-2 bg-red-100 text-red-900`;

interface IProps {
  name: string;
}

const Input: React.FC<IProps> = ({ name }) => {

  return (
    <ErrorMessage name={name} >
      {
        message => {
          return <TwAlert href={'#' + name}>
            {message}
          </TwAlert>
        }
      }
    </ErrorMessage>
  )
}

export default Input;