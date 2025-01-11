import { Search2Icon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

type ButtonType = 'submit' | 'reset' | 'button';

interface IDefaultButton {
  text: string;
  buttonType?: ButtonType;
  maxWidth?: number | 'unset';
  orangeSchema?: boolean;
  onClinkFunc?: () => any;
  disabled?: boolean;
  colorScheme?: string;
  isLoading?: boolean;
  isSearchButton?: boolean;
  leftIcon?: any;
}

function DefaultButton({
  text,
  buttonType,
  maxWidth,
  orangeSchema,
  onClinkFunc,
  disabled = false,
  isLoading,
  isSearchButton,
  colorScheme,
  leftIcon,
}: IDefaultButton) {
  const leftIconConfig = leftIcon ? (
    leftIcon
  ) : isSearchButton ? (
    <Search2Icon />
  ) : (
    <></>
  );

  return (
    <Button
      isDisabled={disabled}
      type={buttonType ?? 'button'}
      onClick={onClinkFunc}
      className={`w-full h-10 ${
        orangeSchema ? 'bg-orange-600 text-white' : 'bg-white text-orange-600'
      } rounded-lg text-sm font-medium hover:bg-[#580CEA] hover:text-white transition duration-300 ease-in-out transform px-4`}
      maxWidth={maxWidth}
      leftIcon={leftIconConfig}
    >
      {text}
    </Button>
  );
}

export default DefaultButton;
