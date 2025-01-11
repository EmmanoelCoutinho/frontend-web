import { Image } from '@chakra-ui/react';

interface IImageContainer {
  src: string;
  sizeClassname: string;
  showMoreImagesNumbers?: number;
  onClick: () => void;
}

function ImageContainer({
  src,
  sizeClassname,
  showMoreImagesNumbers,
  onClick
}: IImageContainer) {
  return (
    <div
      onClick={onClick}
      className={`relative w-full overflow-hidden ${sizeClassname} cursor-pointer`}
    >
      <Image
        src={src}
        style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
        width={'100%'}
        height={'100%'}
        alt="Imóvel a venda"
        _hover={{
          transform: 'scale(1.1)',
        }}
      />
      {!!showMoreImagesNumbers && showMoreImagesNumbers !== 0 && (
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            transition: 'transform 0.5s ease',
          }}
          className="absolute top-0 left-0 flex justify-center items-center w-full h-full text-white text-xl hover:scale-110"
        >
          +{showMoreImagesNumbers}
        </div>
      )}
    </div>
  );
}

export default ImageContainer;
