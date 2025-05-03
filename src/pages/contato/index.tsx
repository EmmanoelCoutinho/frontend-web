import DefaultSelect from '@/components/deafultSelect';
import DefaultButton from '@/components/defaultButton';
import DefaultTextInput from '@/components/defaultTextInput';
import PageHeader from '@/components/pageHeader';
import {
  defaultContactSchema,
  TypeFormData,
} from '@/schemas/defaultContactSchema';
import { InterestEnum } from '@/types/enums/interestEnum';
import { phoneMask } from '@/utils/phoneMask';
import { redirectWhatsapp } from '@/utils/redirectWhatsapp';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LuPhoneCall } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';
import { IoLogoInstagram } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const messageCharLimit = 256;

function Contato() {
  const router = useRouter();
  const { sell } = router.query;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TypeFormData>({ resolver: zodResolver(defaultContactSchema) });
  const message = watch('message');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, '');
    const formattedValue = phoneMask(rawValue);
    setValue('phone', formattedValue);
  };

  const onSubmit: SubmitHandler<TypeFormData> = (data) => {
    sendMessage(data);
  };

  const sendMessage = (messageData: TypeFormData) => {
    const message = `Olá meu nome é ${messageData?.name}, meu telefone é ${messageData?.phone}, Tenho interesse em ${messageData.interest}, ${messageData?.message}`;

    redirectWhatsapp(message);
  };

  function makeCall() {
    const phoneNumber = '+5591981999538';
    var uri = 'tel:' + encodeURIComponent(phoneNumber);
    window.location.href = uri;
  }

  useEffect(() => {
    if (!!sell) {
      setValue('interest', InterestEnum.sell);
    }
  }, [sell]);

  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader title="Contatos" />
      <div className="flex flex-col md:flex-row w-full h-full justify-center items-start m-auto gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[500px]"
        >
          <div className="flex flex-col w-full max-w-[500px] gap-6 p-6">
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Infomorme seu nome:</FormLabel>
              <DefaultTextInput
                placeholder="Nome"
                register={{ ...register('name') }}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.phone}>
              <FormLabel>Infomorme seu telefone:</FormLabel>
              <DefaultTextInput
                placeholder="Telefone (xx) xxxx-xxxx"
                register={{
                  ...register('phone', {
                    onChange: (e) => handleInputChange(e),
                  }),
                }}
                maxLength={15}
              />
              <FormErrorMessage>
                {errors.phone && errors.phone.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.interest}>
              <FormLabel>Infomorme seu interesse:</FormLabel>
              <DefaultSelect
                placeholder="Interesse"
                options={[
                  { title: 'Comprar', value: InterestEnum.buy },
                  { title: 'Vender', value: InterestEnum.sell },
                ]}
                register={{
                  ...register('interest'),
                }}
              />
              <FormErrorMessage>
                {errors.interest && errors.interest.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.message}>
              <FormLabel>Digite sua mensagem:</FormLabel>
              <Textarea
                placeholder="Sua mensagem"
                className="bg-white"
                maxLength={messageCharLimit}
                resize={'none'}
                {...register('message')}
              />
              <span
                className={`flex justify-end w-full text-xs ${
                  message?.length === messageCharLimit &&
                  'text-red-700 text-base'
                }`}
              >
                {message?.length ?? 0}/{messageCharLimit}
              </span>
              <FormErrorMessage>
                {errors.message && errors.message.message}
              </FormErrorMessage>
            </FormControl>
            <span className="flex justify-start w-full md:justify-end">
              <DefaultButton
                buttonType="submit"
                text="Enviar Mensagem"
                orangeSchema
                maxWidth={250}
              />
            </span>
          </div>
        </form>
        <div className="flex flex-col w-full max-w-[250px] h-full justify-start items-start pt-6 ml-6 gap-4 md:ml-0 md:gap-0">
          <span className="text-lg font-medium">Contato direto:</span>

          <span className="flex flex-row gap-2">
            <div
              onClick={makeCall}
              className="flex justify-center items-center w-12 h-12 text-white bg-gray-800 rounded-lg hover:bg-orange-600 cursor-pointer"
            >
              <LuPhoneCall size={22} />
            </div>
            <div
              onClick={() => redirectWhatsapp()}
              className="flex justify-center items-center w-12 h-12 text-white bg-gray-800 rounded-lg hover:bg-orange-600 cursor-pointer"
            >
              <FaWhatsapp size={22} />
            </div>
            <div
              onClick={() => {
                window.open(
                  'https://www.instagram.com/santos_imobiliaria07',
                  '_blank'
                );
              }}
              className="flex justify-center items-center w-12 h-12 text-white bg-gray-800 rounded-lg hover:bg-orange-600 cursor-pointer"
            >
              <IoLogoInstagram size={22} />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Contato;
