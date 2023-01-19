import { Input, Textarea, Select, Radio, Checkbox, Label, ErrorMessage } from '../'
import tw, { TwStyle } from 'twin.macro';

const TwFlex = tw.div`flex flex-col`

interface IProps{
  control: 'input' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';
  name: string;
  label?: string;
  className?: TwStyle;
  [rest:string]: any;
}

const FormControl: React.FC<IProps> = ({ control, className, name, label, ...rest }) => {
  let formControl;
  switch (control) {
    case 'input':
      formControl = <Input className={className} name={name} {...rest}  />
      break;
    case 'textarea':
      formControl = <Textarea className={className} name={name} {...rest}  />
      break;
    case 'select':
      formControl = <Select className={className} name={name} {...rest}  />
      break;
    case 'radio':
      formControl = <Radio className={className} name={name} {...rest}  />
      break;
    case 'checkbox':
      formControl = <Checkbox className={className} name={name} {...rest}  />
      break;
  }
  return (
    <div>
    { label ? <Label name={name} label={label}/>: <></> }
    <TwFlex>
      {formControl}
      <ErrorMessage name={name} />
    </TwFlex>
  </div>
  )
}

export default FormControl;