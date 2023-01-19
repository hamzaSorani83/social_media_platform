/** @jsxImportSource @emotion/react */
import React from "react";
import { Field } from "formik";
import Label from './Label'
import tw from "twin.macro";

interface IRadio {
  name: string;
  options?: IRadioOption[];
  [rest: string]: any;
}

export interface IRadioOption {
  key: string;
  value: string;
}

const TwRadio = tw(Field)`mr-2 w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500`;

const Input: React.FC<IRadio> = ({ name, options, ...rest }) => { 
  return (
    <Field name={name} id={name} {...rest} >
      {
        ({ field }: any) => {
          return (
            options && options.map(option => {
              return(
                <div key={option.value} tw="flex items-center mb-2" >
                  <TwRadio
                    type="radio" id={option.value}
                    {...field}
                    tw="ring-blue-600"
                    value={option.value} className="Form-radio"
                    checked={field.value === option.value}
                  />
                  <Label name={option.value} label={option.key} />
                </div>
              )
            })
          )
        }
      }
    </Field>
  )
}

export default Input;
