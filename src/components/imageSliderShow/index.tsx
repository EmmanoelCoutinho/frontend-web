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
import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';
import ImageContainer from '../imageContainer';

const smallSize = 'max-h-[252px] min-h-[252px] max-w-[252px]';
const space = 89;

interface IImageSliderShow {
  images: string[];
  totalImages: number;
}

function ImageSliderShow({ images, totalImages }: IImageSliderShow) {
  const [isLargerThan840] = useMediaQuery('(min-width: 840px)');
  const extraImagensNumber = totalImages - 5;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<number>(0)
  const [thumbnailPosition, setThumbnailPosition] = useState<number>(-3);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChangeImage = (index: number) => {
    setCurrentImage(index);
  };

  const handleOpen = (index: number) => {
    setCurrentImage(index);
    setCurrentPosition(index * space)
    onOpen();
  };

  const handleClose = () => {
    setThumbnailPosition(-3);
    setCurrentPosition(0);
    onClose();
  };

  const handlePrev = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );

    setCurrentPosition((prevState) =>
      prevState === 0 ? (images.length - 1) * space : prevState - space
    );
  };

  const handleNext = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );

    setCurrentPosition((prevState) =>
      prevState === (images.length - 1) * space ? 0 : prevState + space
    );
  };


  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
  });

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

  const handleGestureStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      event.preventDefault();
    }
  };

  const handleGestureMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      const distance =
        Math.hypot(
          event.touches[0].pageX - event.touches[1].pageX,
          event.touches[0].pageY - event.touches[1].pageY
        ) / 200; // Adjust scaling factor
      setScale(Math.min(Math.max(1, distance), 3)); // Limit zoom between 1x and 3x
    }
  };

  const handleGestureEnd = () => {
    setScale(1); // Reset zoom on gesture end
  };

 useEffect(() => {
   const handleKeyDown = (event: KeyboardEvent) => {
     if (event.key === 'ArrowLeft') {
       handlePrev();
     } else if (event.key === 'ArrowRight') {
       handleNext();
     }
   };

   window.addEventListener('keydown', handleKeyDown);
   return () => {
     window.removeEventListener('keydown', handleKeyDown);
   };
 }, []);


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
        {isLargerThan840 &&
          (totalImages === 2 || totalImages === 3 || totalImages === 4) && (
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
                showMoreImagesNumbers={extraImagensNumber}
              />
            )}
          </SimpleGrid>
        )}
      </div>
      <Modal
        onClose={handleClose}
        size={'full'}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <span className="absolute top-4 left-10 text-lg">
              {currentImage + 1}/{totalImages}
            </span>
            <div className="flex flex-col h-[96vh] w-full my-auto md:h-[80vh]">
              <div
                {...swipeHandlers}
                className="flex h-full w-full justify-between items-center my-auto"
              >
                <Button
                  onClick={handlePrev}
                  className="hidden justify-center items-center rounded-full w-12 h-12 hover:bg-orange-600 hover:text-white md:flex"
                >
                  <FaChevronLeft />
                </Button>
                <div
                  ref={containerRef}
                  onTouchStart={handleGestureStart}
                  onTouchMove={handleGestureMove}
                  onTouchEnd={handleGestureEnd}
                  style={{
                    transform: `scale(${scale})`,
                    transition: 'transform 0.2s ease-out',
                  }}
                  className="w-full max-h-[500px] max-w-[500px] bg-blue-500 overflow-hidden"
                >
                  <Image
                    src={images[currentImage]}
                    style={{
                      objectFit: 'contain',
                    }}
                    width={'100%'}
                    height={'100%'}
                    alt={`Imagem do imóvel #${currentImage}`}
                  />
                </div>
                <Button
                  onClick={handleNext}
                  className="hidden justify-center items-center rounded-full w-12 h-12 hover:bg-orange-600 hover:text-white md:flex"
                >
                  <FaChevronRight />
                </Button>
              </div>
            </div>

            <div className="hidden h-full w-full justify-center overflow-hidden md:flex">
              <div
                style={{
                  position: 'absolute',
                  bottom: 40,
                  left: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'fit-content',
                  height: 'fit-content',
                  padding: '10px 10px',
                  transform: `translateX(-${currentPosition}px)`,
                  transition: 'transform 0.3s ease',
                  overflow: 'hidden',
                }}
              >
                <span className="flex w-full items-center">
                  {images?.map((image, index) => {
                    const selectedItem = index === currentImage;
                    return (
                      <div
                        key={index}
                        onClick={() => handleChangeImage(index)}
                        className={`transition-transform duration-300 ease-in-out ${
                          selectedItem
                            ? 'h-[100px] w-[100px]S'
                            : 'h-[80px] w-[80px]'
                        } rounded-lg overflow-hidden cursor-pointer`}
                        style={{
                          marginRight: '12px', // Gap between thumbnails
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
                </span>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageSliderShow;
