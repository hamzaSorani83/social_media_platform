import { Field } from "formik";
import tw from "twin.macro";

const TwSelect = tw(Field)`bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus-visible:outline-none block w-full p-2.5 pl-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white `

export interface ISelect {
  name: string;
  options?: string[];
  [rest: string]: any;
}


const Input: React.FC<ISelect> = ({ name, options,...rest }) => {
  return (
    <TwSelect as="select" name={name} id={name} {...rest} className="Form-select" >
      <option
        value={''}
        className='capitalize'>
        {'-- Select One --'}
      </option>
      {
        options && options.map(option => {
          return(
            <option
              value={option}
              key={option}
              className='capitalize'>
              {option}
            </option>
          )
        })
      }
    </TwSelect>
  )
}

export default Input;