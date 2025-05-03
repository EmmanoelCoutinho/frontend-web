import { Image, useMediaQuery } from "@chakra-ui/react";

interface IPageHeaderProps {
  title: string | null | undefined;
}

function PageHeader({ title }: IPageHeaderProps) {
  const [isLargerThan840] = useMediaQuery('(min-width: 840px)');

  return (
    <div className="relative">
      <div className="w-full h-[350px] mb-12">
        <Image
          src={'/images/belem-default.jpg'}
          style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
          width={'100%'}
          height={'100%'}
          alt="Imagem de fundo com a cidade de Belém"
        />
      </div>
      <span
        className={`absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex m-auto w-full px-4 md:px-0 md:w-fit justify-center items-center gap-2 text-white font-medium text-5xl text-center ${
          isLargerThan840 ? 'text-nowrap' : ''
        }`}
      >
        <span>{title}</span>
      </span>
    </div>
  );
}

export default PageHeader;