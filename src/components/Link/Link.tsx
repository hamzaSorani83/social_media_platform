/** @jsxImportSource @emotion/react */

import tw, { TwStyle } from 'twin.macro';
import { NavLink, useLocation } from 'react-router-dom';
import { selectVarient } from '../../features/main/mainSlice';
import { useAppSelector } from '../../app/hooks/hooks';
import { IVarient } from '../../Formik/FormComponent';

const TwLink = tw(NavLink)`flex mb-8 justify-center items-center xl:justify-start capitalize transition-colors duration-200 `;
export const TwText = tw.span`hidden xl:block xl:ml-4 text-xl`;

interface IProps {
  to: string;
  text: string;
  Icon: any;
  className?: TwStyle;
  varient?: IVarient;
}

const styles = {
  active: tw`font-bold`,
  activeVarients: {
    blue: tw`text-blue-600`,
    purple: tw`text-purple-600`,
    success:  tw`text-green-500`,
    danger:  tw`text-red-600`,
    warning:  tw`text-yellow-500`,
    info: tw`text-blue-400`,
    light:  tw`text-gray-200`,
    dark: tw`text-gray-800`,
  },
  varients: {
    blue: tw`hover:text-blue-600`,
    purple: tw`hover:text-purple-600`,
    success:  tw`hover:text-green-500`,
    danger:  tw`hover:text-red-600`,
    warning:  tw`hover:text-yellow-500`,
    info: tw`hover:text-blue-400`,
    light:  tw`hover:text-gray-200`,
    dark: tw`hover:text-gray-800`,
  }
}



const Link: React.FC<IProps> = ({ to, text, Icon, className }) => {
  const pathname = useLocation().pathname;
  const varient = useAppSelector(selectVarient);
  
  return (
    <TwLink to={to}
      css={
        [className,
          pathname === to ? styles.active : null,
          pathname === to ? styles.activeVarients[varient] : null,
          styles.varients[varient],
          'Link']
      }>
      {
        Icon !== undefined &&
        <Icon/>
      }
      <TwText>{text}</TwText>
    </TwLink>
  )
}

export default Link