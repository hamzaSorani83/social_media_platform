/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react'
import tw, { TwStyle } from 'twin.macro';
import { IVarient } from '../../Formik/FormComponent';

const TwAlert = tw.a`rounded-lg py-3 px-6 text-base my-2 mx-4`;

const containerVariants: TwStyle = {
  blue: tw`bg-blue-100 text-blue-700`,
  purple: tw`bg-purple-100 text-purple-700`,
  success:  tw`bg-green-100 text-green-700`,
  danger:  tw`bg-red-100 text-red-900`,
  warning:  tw`bg-yellow-100 text-yellow-700`,
  info: tw`bg-blue-100 text-blue-400`,
  light:  tw`bg-gray-100 text-gray-500`,
  dark: tw`bg-gray-300 text-gray-800`,
}

const styles = {
  container: (vairent: IVarient) => [
    containerVariants[vairent],
  ],
}

export interface IAlert {
  varient: IVarient;
  show?: boolean;
  className: TwStyle;
  children: ReactNode;
}

const Alert: React.FC<IAlert> = ({ varient, show = true, className, children }) => {
  if (!show) return <></>;
  
  return (
    <TwAlert
      css={[styles.container(varient), className]}>
      {children}
    </TwAlert>
  )
}

export default Alert