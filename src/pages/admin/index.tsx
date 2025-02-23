import DefaultButton from '@/components/defaultButton';
import DefaultTextInput from '@/components/defaultTextInput';
import { defaultLoginSchema, TypeFormData } from '@/schemas/defaultLoginSchema';
import { LoginAuth } from '@/services/auth';
import { cookieStorageManager, Image, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { get } from 'http';
import { setCookie } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';

interface HandleLoginProps {
  data: TypeFormData;
}

function Admin() {
  const toaster = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<TypeFormData>({ resolver: zodResolver(defaultLoginSchema) });

  const onSubmit: SubmitHandler<TypeFormData> = async (data) => {
    try {
      const { data: loginData } = await LoginAuth(data);

      setCookie(null, 'santos_imoveis.access_token', loginData.access_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      toaster({
        title: 'Login efetuado com sucesso',
        description: 'Você será redirecionado para a página de administração',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });

      setTimeout(() => {
        window.location.href = '/admin/anuncios';
      }, 500);

    } catch (error) {
      toaster({
        title: 'Algo deu errado',
        description: "Verifique se os dados estão corretos",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("/images/belem-default-docas.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="flex justify-center items-center w-full h-screen overflow-y-hidden"
    >
      <div className="flex flex-col w-[500px] h-[300px] bg-gray-200 rounded-lg p-4">
        <span className="flex justify-center items-center w-full h-16">
          <Image
            src={'/logo-si.png'}
            style={{ objectFit: 'cover' }}
            width={'64px'}
            height={'64px'}
            alt="Logo SantosImóveis"
          />
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center gap-6 w-full h-full">
            <DefaultTextInput
              placeholder="Email"
              register={{
                ...register('email'),
              }}
            />
            <DefaultTextInput
            inputType='password'
              placeholder="Senha"
              register={{
                ...register('password'),
              }}
            />
            <DefaultButton
              buttonType="submit"
              text="Entrar"
              orangeSchema
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin;
