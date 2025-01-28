import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';
import { useGesture } from '@use-gesture/react';

const smallSize = 'max-h-[252px] min-h-[252px] max-w-[252px]';

interface IImageSliderShow {
  images: string[];
  totalImages: number;
}

function ImageSliderShow({ images, totalImages }: IImageSliderShow) {
  const [isLargerThan840] = useMediaQuery('(min-width: 840px)');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1); // Zoom inicial
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Deslocamento
  const imageRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    resetZoom();
  };

  const handleNext = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    resetZoom();
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleClose = () => {
    resetZoom();
    onClose();
  };

  // Gesture handling for pinch-to-zoom
  useGesture(
    {
      onPinch: ({ offset: [scale] }) => {
        setZoom(scale);
      },
      onDrag: ({ offset: [x, y] }) => {
        setOffset({ x, y });
      },
    },
    {
      target: imageRef,
      drag: {
        from: () => [offset.x, offset.y],
        filterTaps: true,
      },
      pinch: {
        scaleBounds: { min: 1, max: 4 }, // Limite do zoom (1x a 4x)
        rubberband: true,
      },
    }
  );

  return (
    <>
      <div className="flex w-fit h-fit justify-center gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => {
              setCurrentImage(index);
              onOpen();
            }}
            className="cursor-pointer"
          >
            <Image
              src={image}
              alt={`Imagem #${index}`}
              className="max-w-[200px]"
            />
          </div>
        ))}
      </div>

      <Modal onClose={handleClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <span className="absolute top-4 left-10 text-lg">
              {currentImage + 1}/{totalImages}
            </span>
            <div
              {...swipeHandlers}
              className="flex h-full w-full justify-between items-center"
            >
              <Button
                onClick={handlePrev}
                className="flex justify-center items-center rounded-full w-12 h-12 hover:bg-orange-600 hover:text-white"
              >
                <FaChevronLeft />
              </Button>
              <div
                ref={imageRef}
                className="relative overflow-hidden w-[80%] h-[80%] flex justify-center items-center"
                style={{
                  touchAction: 'none', // Necessário para suportar gestures
                }}
              >
                <Image
                  src={images[currentImage]}
                  alt={`Imagem ampliada`}
                  style={{
                    transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
                    transition: zoom > 1 ? 'none' : 'transform 0.3s ease',
                    objectFit: 'contain',
                  }}
                  className="w-full h-full"
                />
              </div>
              <Button
                onClick={handleNext}
                className="flex justify-center items-center rounded-full w-12 h-12 hover:bg-orange-600 hover:text-white"
              >
                <FaChevronRight />
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageSliderShow;
