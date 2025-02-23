import { api } from '@/services/axios';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';

interface ActionsProps {
  propertyId: number;
  page: string;
  reloadFunc: () => void;
  isFeatured: boolean;
}

const Actions = ({
  propertyId,
  page,
  reloadFunc,
  isFeatured,
}: ActionsProps) => {
  const toaster = useToast();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const handleClickDelete = async () => {
    try {
      await api.delete(`/properties/${propertyId}`);

      toaster({
        title: 'Anúncio excluído com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      reloadFunc();
    } catch (error) {
      console.log(error);

      toaster({
        title: 'Erro ao excluir anúncio!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClickeStar = async () => {
    try {
      await api.patch(`/properties/${propertyId}/featured`, {
        featured: !isFeatured,
      });

      toaster({
        title: 'Anúncio destacado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      reloadFunc();
    } catch (error) {
      console.log(error);

      toaster({
        title: 'Erro ao destacar o anúncio!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Tooltip hasArrow placement="top" label="Editar">
        <button
          onClick={() => router.push(`/admin/${page}/${propertyId}`)}
          className="bg-green-500 text-white p-2 rounded-lg"
        >
          <MdEdit />
        </button>
      </Tooltip>
      <Tooltip hasArrow placement="top" label="Excluir">
        <button
          onClick={onOpen}
          className="bg-red-500 text-white p-2 rounded-lg"
        >
          <MdDeleteForever />
        </button>
      </Tooltip>
      <Tooltip hasArrow placement="top" label="Destacar">
        <button
          onClick={handleClickeStar}
          className="bg-orange-500 text-white p-2 rounded-lg"
        >
          {isFeatured ? <TiStarFullOutline /> : <TiStarOutline />}
        </button>
      </Tooltip>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Anúncio
            </AlertDialogHeader>

            <AlertDialogBody>
              <div className="flex flex-col">
                Tem certeza que deseja deletar essa anúncio?
                <span className="text-red-500 font-bold">
                  essa ação não pode ser desfeita!
                </span>
              </div>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleClickDelete} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default Actions;
