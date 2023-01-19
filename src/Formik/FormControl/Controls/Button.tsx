/** @jsxImportSource @emotion/react */

import React, { ReactNode } from 'react'
import { IVarient } from '../../FormComponent';
import tw, { TwStyle } from 'twin.macro'

const TwButton = tw.button`inline-block px-6 py-2.5 font-medium leading-tight uppercase rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out focus:outline-none text-xs focus:ring-0`;

export interface IButton {
  varient: IVarient ; 
  className?: TwStyle;
  children: ReactNode;
  [rest: string]: any;
}

const varients: TwStyle = {
  blue: tw`bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800`,
  purple: tw`bg-purple-600 text-white hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800`,
  success:  tw`bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 active:bg-green-700`,
  danger:  tw`bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800`,
  warning:  tw`bg-yellow-500 text-white hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-700`,
  info: tw`bg-blue-400 text-white hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-600`,
  light:  tw`bg-gray-800 text-white hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900`,
  dark: tw`bg-gray-200 text-gray-700 hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400`,
}


const Button: React.FC<IButton> = ({ varient, className='', children, ...rest }) => {
  return (
    <TwButton
      css={[varients[varient], className]}
      {...rest}> 
      {children}
    </TwButton>
  )
}

export default Button