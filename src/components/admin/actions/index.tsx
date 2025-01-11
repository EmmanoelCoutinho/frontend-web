import { api } from '@/services/axios';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRef } from 'react';

interface ActionsProps {
  propertyId: number;
  page: string;
  reloadFunc: () => void;
}

const Actions = ({ propertyId, page, reloadFunc }: ActionsProps) => {
  const toaster = useToast();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const handleClickDelete = async () => {
    try {
      await api.delete(`/properties/${propertyId}`);

      toaster({
        title: 'Anúncio excluído com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      reloadFunc();
    } catch (error) {
      console.log(error);

      toaster({
        title: 'Erro ao excluir anúncio',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push(`/admin/${page}/${propertyId}`)}
        className="bg-green-500 text-white p-2 rounded-lg"
      >
        Editar
      </button>
      <button onClick={onOpen} className="bg-red-500 text-white p-2 rounded-lg">
        Excluir
      </button>

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
