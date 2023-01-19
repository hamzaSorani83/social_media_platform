import React from 'react'
import { IVarient } from '../../FormComponent'
import { Button } from '../../';
import tw from 'twin.macro';

const style = tw`font-normal px-3 py-2 text-sm rounded-lg absolute right-2.5 bottom-2.5 capitalize`

interface IProps {
  varient?: IVarient;
  className?: string;
  parentClassName?: string;
  [rest: string]: any;
}

const Search: React.FC<IProps> = ({ varient="blue", className, parentClassName, ...rest }) => {
  className = ["Form-input py-3", className, varient === 'blue' ? 'Input-Blue' : ''].join(" ");
  parentClassName = ["relative mt-2", parentClassName].join(" ");
  return (
    <div className={parentClassName}>
    <input type="search" {...rest}  />
    <Button type='button' varient={varient} className={style}>Search</Button>
  </div>
  )
}

export default Search