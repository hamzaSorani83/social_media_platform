import React, { ReactNode } from 'react'
import { Form } from 'formik'
import tw from 'twin.macro';

const TwForm = tw(Form)`xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12  md:mb-0`;

export interface IForm {
  varient: IVarient;
  className?: string;
  children?: ReactNode;
  [rest: string]: any;
}

export type IVarient = "blue" | "purple" | "success" | "danger" | "warning" | "info" | 'light' | 'dark';

const FormComponent: React.FC<IForm> = ({ className, children, varient, ...rest }) => {
  const formVarient = "Form-" + varient[0].toUpperCase() + varient.substring(1);
  className = ['Form',formVarient , className].join(" ");
  
  return (
    <TwForm className={className} {...rest}>
      {children}
    </TwForm>
  )
}

export default FormComponent