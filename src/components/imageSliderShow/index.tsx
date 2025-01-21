import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import ImageContainer from '../imageContainer';
import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const smallSize = 'max-h-[252px] min-h-[252px] max-w-[252px]';

interface IImageSliderShow {
  images: string[];
  totalImages: number;
}

function ImageSliderShow({ images, totalImages }: IImageSliderShow) {
  const [isLargerThan840] = useMediaQuery('(min-width: 840px)');
  const extraImagensNumber = totalImages - 5;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [thumbnailPosition, setThumbnailPosition] = useState<number>(-3);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const handleChangeImage = (index: number) => {
    setCurrentImage(index);
  };

  const handleOpen = (index: number) => {
    setCurrentImage(index);
    onOpen();
  };

  const handleClose = () => {
    setThumbnailPosition(-3);
    onClose();
  };

  const handlePrev = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const thumbnails = thumbnailContainerRef.current;
      const activeThumbnail = thumbnails.children[currentImage] as HTMLElement;

      if (activeThumbnail) {
        const newThumbnailPosition = -3 - currentImage * 6;

        setThumbnailPosition(newThumbnailPosition);
      }
    }
  }, [currentImage, images.length]);

  return (
    <>
      <div className="flex w-fit h-fit justify-center gap-2">
        <ImageContainer
          src={images[0]}
          sizeClassname={`${
            isLargerThan840 ? 'max-w-[505px]' : ''
          } max-h-[520px]`}
          onClick={() => handleOpen(0)}
        />
        {isLargerThan840 && (totalImages === 2 || totalImages === 3 || totalImages === 4) && (
          <ImageContainer
            src={images[1]}
            sizeClassname={`${
              isLargerThan840 ? 'max-w-[505px]' : ''
            } max-h-[520px]`}
            onClick={() => handleOpen(1)}
          />
        )}
        {isLargerThan840 && totalImages === 3 && (
          <ImageContainer
            src={images[2]}
            sizeClassname={`${
              isLargerThan840 ? 'max-w-[505px]' : ''
            } max-h-[520px]`}
            onClick={() => handleOpen(2)}
          />
        )}
        {isLargerThan840 && totalImages === 4 && (
          <SimpleGrid w={600} columns={1} spacingX={2} spacingY={2}>
            {images[1] && (
              <ImageContainer
                src={images[1]}
                sizeClassname={smallSize}
                onClick={() => handleOpen(1)}
              />
            )}
            {images[2] && (
              <ImageContainer
                src={images[2]}
                sizeClassname={smallSize}
                onClick={() => handleOpen(2)}
              />
            )}
          </SimpleGrid>
        )}
        {isLargerThan840 && totalImages >= 5 && (
          <SimpleGrid columns={2} spacingX={2} spacingY={2}>
            {images[1] && (
              <ImageContainer
                src={images[1]}
                sizeClassname={smallSize}
                onClick={() => handleOpen(1)}
              />
            )}
            {images[2] && (
              <ImageContainer
                src={images[2]}
                sizeClassname={smallSize}
                onClick={() => handleOpen(2)}
              />
            )}
            {images[3] && (
              <ImageContainer
                src={images[3]}
                sizeClassname={smallSize}
                onClick={() => handleOpen(3)}
              />
            )}
            {images[4] && (
              <ImageContainer
                src={images[4]}
                sizeClassname={smallSize}
                onClick={() => handleOpen(4)}
              />
            )}
          </SimpleGrid>
        )}
      </div>
      <Modal onClose={handleClose} size={'full'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <span className="absolute top-4 left-10 text-lg">
              {currentImage + 1}/{totalImages}
            </span>
            <div className="flex flex-col h-[96vh] w-full my-auto">
              <div className="flex h-full w-full justify-between items-center my-auto">
                <Button
                  onClick={handlePrev}
                  className="flex justify-center items-center rounded-full w-12 h-12 hover:bg-orange-600 hover:text-white"
                >
                  <FaChevronLeft />
                </Button>
                <div className="w-full max-h-[500px] max-w-[500px] overflow-hidden">
                  <div
                    style={{
                      display: 'flex',
                      height: 500,
                      width: '100%',
                      transform: `translateX(-${currentImage * 100}%)`,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {images.map((image, index) => (
                      <div
                        key={index}
                        style={{
                          minWidth: '100%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Image
                          src={image}
                          style={{
                            objectFit: 'contain',
                          }}
                          width={'100%'}
                          height={'100%'}
                          alt={`Imagem do imóvel #${index}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={handleNext}
                  className="flex justify-center items-center rounded-full w-12 h-12 hover:bg-orange-600 hover:text-white"
                >
                  <FaChevronRight />
                </Button>
              </div>
              <div
                className="relative flex items-center h-full max-h-[120px] overflow-hidden"
                style={{ width: '100%' }}
              >
                <div
                  ref={thumbnailContainerRef}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    left: '50%',
                    transform: `translateX(${thumbnailPosition}%)`,
                    transition: 'transform 0.3s ease-in-out',
                  }}
                >
                  {images?.map((image, index) => {
                    const selectedItem = index === currentImage;

                    return (
                      <div
                        key={index}
                        onClick={() => handleChangeImage(index)}
                        className={`transition-transform duration-300 ease-in-out ${
                          selectedItem
                            ? 'h-[100px] w-[100px] scale-110'
                            : 'h-[80px] w-[80px]'
                        } rounded-lg overflow-hidden cursor-pointer`}
                        style={{
                          marginRight: '8px', // Gap between thumbnails
                        }}
                      >
                        <Image
                          src={image}
                          style={{
                            objectFit: 'fill',
                          }}
                          width={'100%'}
                          height={'100%'}
                          alt="Imóvel a venda"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageSliderShow;
