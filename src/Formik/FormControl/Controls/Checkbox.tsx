import React from 'react'
import { Field } from 'formik'
import Label from './Label'


interface ICheckbox {
  name: string;
  label?: string;
  options?: ICheckboxOptions[];
  [rest: string]: any;
}

export interface ICheckboxOptions {
  key: string;
  value: string;
}

const CheckboxGroup: React.FC<ICheckbox> = ({name, label, options, ...rest}) => {
  return (
    <div>
      <label>{label}</label>
      <Field name={name}>
        {({ field }: any) => (
          options && options.map( (option) => {
            return (
              <div key={option.key} className='flex gap-2'>
                <input
                  className='Form-checkbox'
                  type='checkbox'
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                />
                <Label name={option.value} label={option.key} className="normal-case" />
              </div>
            )
          })
          )}
      </Field>
    </div>
  )
}

export default CheckboxGroup

// const Input: React.FC<IProps> = ({ name, label, className, ...rest }) => {
//   return (
//     <Field name={name} id={name} {...rest} className="form-input" />
//   )
// }