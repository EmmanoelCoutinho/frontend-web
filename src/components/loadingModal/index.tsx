import { Image } from '@chakra-ui/react';
import { useEffect } from 'react';

const LoadingModal = ({ isLoading }: { isLoading: boolean }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center w-full h-screen bg-white absolute top-0 left-0 overflow-hidden z-[100]">
          <span className="w-[250px] h-[250px] border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
          <Image
            src={'/logo-si.png'}
            style={{
              position: 'absolute',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            width={200}
            height={200}
            alt="Logo Carregamento"
          />
        </div>
      )}
    </>
  );
};

export default LoadingModal;
