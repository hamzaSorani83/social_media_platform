import tw from 'twin.macro'

const TwLabel = tw.label`font-bold capitalize text-gray-600`

interface IProps {
  name: string;
  label: any;
  className?: string;
}

const Label: React.FC<IProps> = ({ name, label, className }) => {
  return (
    <TwLabel htmlFor={name}
      className={className}>
      { label }
    </TwLabel>
  )
}

export default Label;