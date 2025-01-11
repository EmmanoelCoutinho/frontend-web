import { Select } from '@chakra-ui/react';

interface IOptions {
  title: string,
  value: any
}

interface IDefaultSelect {
  placeholder?: string;
  options: IOptions[];
  maxWidth?: number;
  register?: any;
  defaultValue?: any;
}

function DefaultSelect({
  placeholder,
  options,
  register,
  defaultValue,
  ...props
}: IDefaultSelect) {
  
  return (
    <Select
      id="type"
      className="w-full h-10 rounded-lg pl-4 cursor-pointer text-zinc-600 outline-none bg-white"
      icon={<></>}
      placeholder={placeholder}
      defaultValue={defaultValue ?? null}
      {...register}
      {...props}
    >
      {options?.map((option: IOptions, index) => (
        <option key={index} className="cursor-pointer" value={option?.value}>
          {option?.title}
        </option>
      ))}
    </Select>
  );
}

export default DefaultSelect;
