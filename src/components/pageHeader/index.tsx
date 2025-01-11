import { randomPicture } from "@/utils/randomPicture";
import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface IPageHeaderProps {
  title: string;
}

function PageHeader({ title }: IPageHeaderProps) {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    setImageSrc(randomPicture())
  }, []);
  return (
    <div className="relative">
      <div className="w-full h-[350px] mb-12">
        <Image
          src={imageSrc}
          style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
          width={'100%'}
          height={'100%'}
          alt="Imagem de fundo com a cidade de Belém"
        />
      </div>
      <span className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex m-auto w-fit justify-center items-center gap-2 text-white font-medium text-5xl text-nowrap">
        <span>{title}</span>
      </span>
    </div>
  );
}

export default PageHeader;