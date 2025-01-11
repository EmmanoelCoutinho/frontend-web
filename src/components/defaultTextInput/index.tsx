import { PhoneIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

type InputTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

interface IDefaultTextInput {
  inputType?: InputTypes;
  placeholder?: string | any;
  maxWidth?: number | string | 'unset';
  maxLength?: number;
  register?: any;
  [key: string]: any;
}

function DefaultTextInput({
  inputType,
  placeholder,
  maxWidth,
  maxLength,
  register,
  ...rest
}: IDefaultTextInput) {
  return (
    <Input
      type={inputType ?? 'text'}
      maxLength={maxLength}
      className="w-full h-10 rounded-lg pl-4 text-zinc-600 outline-none placeholder:text-zinc-600 bg-white"
      maxWidth={maxWidth}
      placeholder={placeholder}
      {...register}
      {...rest}
    />
  );
}

export default DefaultTextInput;
