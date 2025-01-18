import DefaultSelect from '@/components/deafultSelect';
import DefaultButton from '@/components/defaultButton';
import DefaultTextInput from '@/components/defaultTextInput';
import {
  condoFeatures,
  numbersOptions,
  propertyFeatures,
} from '@/constants/addFeaturesOptions';
import {
  propertySubtypes,
  propertyTypes,
} from '@/constants/propertyTypesOptions';
import AdminLayout from '@/layout/adminPageInnerLayout';
import {
  defaultProperySchema,
  TypeFormData,
} from '@/schemas/defaultPropertySchema';
import { FaCamera } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spinner,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { use, useEffect, useRef, useState } from 'react';
import { api } from '@/services/axios';
import { priceMask } from '@/utils/priceMask';
import { PropertySubtype, PropertyType } from '@/types/enums/propertyEnum';
import { useRouter } from 'next/router';
import axios from 'axios';
import { get } from 'http';
import { extractpublicId } from '@/utils/extractPublicId';

type ImageType = {
  publicId: string;
  url: string;
};

type CoverImageType = {
  publicId: string;
  index: number;
};

const defaultPropertyFeatures = {
  serviceArea: false,
  bedroomClosets: false,
  kitchenCabinets: false,
  furnished: false,
  airConditioning: false,
  barbecueGrill: false,
  balcony: false,
  gym: false,
  swimmingPool: false,
  serviceRoom: false,
};

const defaultCondoFeatures = {
  gatedCommunity: false,
  elevator: false,
  security24h: false,
  concierge: false,
  petsAllowed: false,
  gym: false,
  swimmingPool: false,
  partyHall: false,
};

const messageCharLimit = 600;

function NovoAnuncio() {
  const { id } = useRouter().query;

  const toaster = useToast();
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [temporaryImages, setTemporaryImages] = useState<ImageType[]>([]);
  const [mainImage, setMainImage] = useState<CoverImageType | null>(null);
  const [realtorList, setRealtorList] = useState([]);
  const [propertyAddress, setPropertyAddress] = useState(null);

  //loading
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TypeFormData>({ resolver: zodResolver(defaultProperySchema) });
  const message = watch('description');

  const handleButtonClick = () => {
    // @ts-ignore
    fileInputRef.current.click();
  };

  const getPropertyData = async () => {
    try {
      const { data } = await api.get(`/properties/${id}`);

      setValue('title', data.title);
      setValue('description', data.description);
      setValue(
        'Property_type',
        PropertyType[data.Property_type as keyof typeof PropertyType].toString()
      );
      if (data?.Property_subtype) {
        setValue(
          'Property_subtype',
          PropertySubtype[
            data.Property_subtype as keyof typeof PropertySubtype
          ].toString()
        );
      }
      setValue('bedroom', data.bedroom.toString());
      setValue('bathroom', data.bathroom.toString());
      setValue('total_area', data.total_area ? data.total_area.toString() : null);
      setValue(
        'useful_area',
        data.useful_area ? data.useful_area.toString() : null
      );
      setValue('parking_spaces', data.parking_spaces.toString());
      setValue(
        'condon_price',
        data.condon_price ? data.condon_price.toString() : null
      );
      setValue('iptu', data.iptu ? data.iptu.toString() : null);
      setValue('financeable', data.financeable.toString());
      setValue('price', priceMask(data.price.toString()));
      setValue('address', data.address?.cep.toString());
      setPropertyAddress(data.address);
      setValue('realtorId', data.Realtor.id.toString());
      setValue('videotour_url', data.videotour_url ? data.videotour_url : null);

      setValue(
        'property_features.serviceArea',
        data.property_features.serviceArea
      );
      setValue(
        'property_features.bedroomClosets',
        data.property_features.bedroomClosets
      );
      setValue(
        'property_features.kitchenCabinets',
        data.property_features.kitchenCabinets
      );
      setValue('property_features.furnished', data.property_features.furnished);
      setValue(
        'property_features.airConditioning',
        data.property_features.airConditioning
      );
      setValue(
        'property_features.barbecueGrill',
        data.property_features.barbecueGrill
      );
      setValue('property_features.balcony', data.property_features.balcony);
      setValue('property_features.gym', data.property_features.gym);
      setValue(
        'property_features.swimmingPool',
        data.property_features.swimmingPool
      );
      setValue(
        'property_features.serviceRoom',
        data.property_features.serviceRoom
      );

      setValue(
        'condo_features.gatedCommunity',
        data.condo_features.gatedCommunity
      );
      setValue('condo_features.elevator', data.condo_features.elevator);
      setValue('condo_features.security24h', data.condo_features.security24h);
      setValue('condo_features.concierge', data.condo_features.concierge);
      setValue('condo_features.petsAllowed', data.condo_features.petsAllowed);
      setValue('condo_features.gym', data.condo_features.gym);
      setValue('condo_features.swimmingPool', data.condo_features.swimmingPool);
      setValue('condo_features.partyHall', data.condo_features.partyHall);

      setTemporaryImages(
        data.images.map((image: any) => ({
          publicId: extractpublicId(image),
          url: image,
        }))
      );
      setMainImage({
        publicId: extractpublicId(data?.images[data.ad_image_cover]),
        index: data.ad_image_cover,
      });

      console.log(data);
    } catch (error) {
      console.error('Erro ao buscar propriedades:', error);
    }
  };

  const handleSendImages = async (files: FileList) => {
    try {
      setLoadingUpdate(true);

      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });

      const response = await api.post('upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setTemporaryImages((prev) => [...prev, ...response?.data]);
    } catch (error) {
      console.error('Erro ao enviar imagens:', error);

      toaster({
        title: 'Erro ao enviar imagens',
        description: 'Favor informar o Cezar',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleSendImages(files);
    }
  };

  const onSubmit: SubmitHandler<TypeFormData> = (data) => {
    const formattedData = {
      ...data,
      images: temporaryImages.map((image) => image.url),
      ad_image_cover: mainImage?.index,
      financeable: data.financeable === 'true',
      bedroom: parseInt(data.bedroom),
      bathroom: parseInt(data.bathroom),
      parking_spaces: parseInt(data.parking_spaces),
      useful_area: data.useful_area ? parseInt(data.useful_area) : null,
      total_area: data?.total_area ? parseInt(data.total_area) : null,
      condon_price: data.condon_price ? parseInt(data.condon_price) : null,
      iptu: data.iptu ? parseInt(data.iptu) : null,
      realtorId: parseInt(data.realtorId),
      price: parseInt(data.price.replace(/\./g, ''), 10),
      videotour_url: data?.videotour_url ? data?.videotour_url : null,
      address: propertyAddress,
      Property_type:
        PropertyType[data.Property_type as keyof typeof PropertyType],
      Property_subtype: data.Property_subtype
        ? PropertySubtype[data.Property_subtype as keyof typeof PropertySubtype]
        : null,
      property_features: {
        ...defaultPropertyFeatures,
        ...data.property_features,
      },
      condo_features: {
        ...defaultCondoFeatures,
        ...data.condo_features,
      },
    };

    try {
      api.patch(`/properties/${id}`, formattedData);

      toaster({
        title: 'Anúncio enviado com sucesso',
        description: 'Seu anúncio foi publicado com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });

      router.push('/admin/anuncios');
    } catch (error: any) {
      console.error('Erro ao enviar anúncio:', error);

      toaster({
        title: 'Erro ao enviar anúncio',
        description: error?.response?.data?.message || 'Favor informar o Cezar',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  console.log(errors)

  const handleDeleteImage = async (publicId: string) => {
    try {
      setLoadingDelete(true);

      if (mainImage?.publicId === publicId) {
        setMainImage(null);
      }

      const formattedPublicId = publicId.split('/')[2].split('.')[0];

      const { data } = await api.delete(`upload/${formattedPublicId}`);

      const newImages = temporaryImages.filter(
        (image) => image.publicId !== publicId
      );

      setTemporaryImages(newImages);

      toaster({
        title: 'Sucesso!',
        description: data?.message,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error: any) {
      console.error('Erro ao deletar imagem:', error);
      toaster({
        title: 'Erro ao deletar imagem',
        description: error?.response?.data?.message || 'Favor informar o Cezar',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setLoadingDelete(false);
    }
  };

  const ImageContainer = ({
    publicId,
    src,
  }: {
    publicId: string;
    src: string;
  }) => {
    const isMainImage = mainImage?.publicId === publicId;

    const handleSetMainImage = () => {
      const index = temporaryImages.findIndex(
        (image) => image.publicId === publicId
      );

      setMainImage({ publicId, index });
    };

    const mainImageStyle = isMainImage ? 'border-4 border-purple-600' : '';

    return (
      <div className="relative">
        <div
          key={publicId}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className={`flex w-full max-w-40 h-32 rounded-xl shadow-neutral-200 relative cursor-pointer ${mainImageStyle}`}
          onClick={handleSetMainImage}
        >
          {loadingDelete && (
            <div className="absolute w-full h-full bg-black bg-opacity-50 flex justify-center items-center rounded-xl">
              <Spinner size="lg" color="purple" />
            </div>
          )}
          {isMainImage && (
            <div className="flex flex-col uppercase font-bold text-xl text-purple-600 w-full h-full justify-center items-center">
              <span>capa</span>
              <span>selecionada</span>
            </div>
          )}
        </div>
        <span
          onClick={() => handleDeleteImage(publicId)}
          className="absolute -top-2 right-6 cursor-pointer rounded-full bg-gray-700 p-1"
        >
          <IoMdClose color="white" size={18} />
        </span>
      </div>
    );
  };

  const handleMonetaryInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: 'price' | 'condon_price' | 'iptu'
  ) => {
    const input = event.target.value.replace(/\D/g, '');
    const formattedPrice = priceMask(input);
    setValue(field, formattedPrice);
  };

  const getAddress = async (zipCode: string) => {
    try {
      const { data } = await axios.get(
        'https://viacep.com.br/ws/' + zipCode + '/json/'
      );

      setPropertyAddress(data);

      toaster({
        title: 'Endereço encontrado',
        description: 'Endereço encontrado com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);

      toaster({
        title: 'Erro ao buscar endereço',
        description: 'Favor informar o Cezar',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    if (value.length === 9) {
      getAddress(value);
    }

    setValue('address', value);
  };

  useEffect(() => {
    const getRealtors = async () => {
      try {
        const { data } = await api.get('/realtor/list');

        const formattedRealtors = data.map((realtor: any) => ({
          title: realtor.name,
          value: realtor.id,
        }));

        setRealtorList(formattedRealtors);
      } catch (error) {
        console.error('Erro ao buscar corretores:', error);
      }
    };

    getRealtors();
  }, []);

  useEffect(() => {
    if (id) {
      getPropertyData();
    }
  }, [id]);

  return (
    <AdminLayout title="Novo Anúncio" infinity>
      <div className="flex flex-col justify-center items-center gap-6 w-full h-full pt-4 overflow-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full h-full py-10 max-w-[800px]"
        >
          <FormControl isRequired isInvalid={!!errors.title}>
            <FormLabel>Título</FormLabel>
            <DefaultTextInput register={{ ...register('title') }} />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.description}>
            <FormLabel>Descrição</FormLabel>
            <Textarea
              className="bg-white h-40"
              maxLength={messageCharLimit}
              resize={'none'}
              {...register('description')}
            />
            <span
              className={`flex justify-end w-full text-xs ${
                message?.length === messageCharLimit && 'text-red-700 text-base'
              }`}
            >
              {message?.length ?? 0}/{messageCharLimit}
            </span>
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.Property_type}>
            <FormLabel>Tipo</FormLabel>
            <DefaultSelect
              placeholder="Selecione"
              options={propertyTypes}
              register={{ ...register('Property_type') }}
            />
            <FormErrorMessage>
              {errors.Property_type && errors.Property_type.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.Property_subtype}>
            <FormLabel>Subtipo</FormLabel>
            <DefaultSelect
              placeholder="Selecione"
              options={propertySubtypes}
              register={{ ...register('Property_subtype') }}
            />
            <FormErrorMessage>
              {errors.Property_subtype && errors.Property_subtype.message}
            </FormErrorMessage>
          </FormControl>
          {/* <FormControl isRequired isInvalid={!!errors.property_subtype}>
            <FormLabel>Compra ou venda?</FormLabel>
            <RadioGroup>
              <Stack direction="row">
                <Radio {...register('property_subtype')} value={PropertySubtype.Comprar}>
                  Comprar
                </Radio>
                <Radio {...register('property_subtype')} value="2">
                  vender
                </Radio>
              </Stack>
            </RadioGroup>
            <FormErrorMessage>
              {errors.property_subtype && errors.property_subtype.message}
            </FormErrorMessage>
          </FormControl> */}
          <FormControl isRequired isInvalid={!!errors.bedroom}>
            <FormLabel>Número de quartos</FormLabel>
            <DefaultSelect
              placeholder="Selecione"
              options={numbersOptions}
              register={{ ...register('bedroom') }}
            />
            <FormErrorMessage>
              {errors.bedroom && errors.bedroom.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.bathroom}>
            <FormLabel>Número de banheiros</FormLabel>
            <DefaultSelect
              placeholder="Selecione"
              options={numbersOptions}
              register={{ ...register('bathroom') }}
            />
            <FormErrorMessage>
              {errors.bathroom && errors.bathroom.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.total_area}>
            <FormLabel>Área Total (m²)</FormLabel>
            <DefaultTextInput register={{ ...register('total_area') }} />
            <FormErrorMessage>
              {errors.total_area && errors.total_area.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.useful_area}>
            <FormLabel>Área Útil (m²)</FormLabel>
            <DefaultTextInput register={{ ...register('useful_area') }} />
            <FormErrorMessage>
              {errors.useful_area && errors.useful_area.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.parking_spaces}>
            <FormLabel>Vagas de Garagem</FormLabel>
            <DefaultSelect
              placeholder="Selecione"
              options={numbersOptions}
              register={{ ...register('parking_spaces') }}
            />
            <FormErrorMessage>
              {errors.parking_spaces && errors.parking_spaces.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.condon_price}>
            <FormLabel>Condomínio (R$)</FormLabel>
            <DefaultTextInput
              register={{ ...register('condon_price') }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleMonetaryInputChange(e, 'condon_price')
              }
            />
            <FormErrorMessage>
              {errors.condon_price && errors.condon_price.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.iptu}>
            <FormLabel>IPTU (R$)</FormLabel>
            <DefaultTextInput
              register={{ ...register('iptu') }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleMonetaryInputChange(e, 'iptu')
              }
            />
            <FormErrorMessage>
              {errors.iptu && errors.iptu.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.financeable}>
            <FormLabel>É Financiável?</FormLabel>
            <RadioGroup value={watch('financeable')}>
              <Stack direction="column">
                <Radio
                  colorScheme="orange"
                  {...register('financeable')}
                  value="true"
                >
                  Sim
                </Radio>
                <Radio
                  colorScheme="orange"
                  {...register('financeable')}
                  value="false"
                >
                  Não
                </Radio>
              </Stack>
            </RadioGroup>
            <FormErrorMessage>
              {errors.financeable && errors.financeable.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.property_features}>
            <FormLabel>Detalhes do Imóvel</FormLabel>
            <SimpleGrid
              className="w-full"
              columns={{ sm: 1, md: 1, lg: 2, xl: 2 }}
              spacingY={2}
              spacingX={1}
            >
              {propertyFeatures.map((feature) => (
                <Checkbox
                  key={feature.value}
                  value={feature.value}
                  onChange={(e) => {
                    setValue('property_features', {
                      ...watch('property_features'),
                      [feature.value]: e.target.checked,
                    });
                  }}
                  colorScheme="orange"
                  isChecked={
                    watch('property_features')?.[
                      feature.value as keyof typeof defaultPropertyFeatures
                    ] ?? false
                  }
                >
                  {feature.title}
                </Checkbox>
              ))}
            </SimpleGrid>
          </FormControl>
          <FormControl isInvalid={!!errors.condo_features}>
            <FormLabel>Detalhes do condomínio</FormLabel>
            <SimpleGrid
              className="w-full"
              columns={{ sm: 1, md: 1, lg: 2, xl: 2 }}
              spacingY={2}
              spacingX={1}
            >
              {condoFeatures.map((feature) => (
                <Checkbox
                  key={feature.value}
                  value={feature.value}
                  onChange={(e) => {
                    setValue('condo_features', {
                      ...watch('condo_features'),
                      [feature.value]: e.target.checked,
                    });
                  }}
                  colorScheme="orange"
                  isChecked={
                    watch('condo_features')?.[
                      feature.value as keyof typeof defaultCondoFeatures
                    ] ?? false
                  }
                >
                  {feature.title}
                </Checkbox>
              ))}
            </SimpleGrid>
          </FormControl>

          {/* start image upload contariner */}
          <div className="flex flex-col my-10">
            <strong>Fotos</strong>
            <span>
              Adicione até <strong>20 fotos</strong>
            </span>
            <SimpleGrid
              className="w-full mt-4 max-w-[400px]"
              columns={{ sm: 1, md: 1, lg: 2, xl: 2 }}
              spacingY={4}
              spacingX={1}
            >
              <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                multiple
                onChange={handleFileChange}
              />
              <div
                onClick={handleButtonClick}
                className="flex flex-col justify-center items-center w-full max-w-40 h-32 rounded-xl cursor-pointer shadow-neutral-200 border-dashed border border-orange-600 text-orange-600"
              >
                {loadingUpdate ? (
                  <Spinner size="lg" color="#EA580C" />
                ) : (
                  <>
                    <FaCamera color="#EA580C" size={30} />
                    <span className="font-semibold text-lg">
                      Adicionar Fotos
                    </span>
                    <span className="text-xs"> JPG, GIF e PNG somente </span>
                  </>
                )}
              </div>
              {temporaryImages.map((image, index) => (
                <ImageContainer
                  key={index}
                  publicId={image.publicId}
                  src={image.url}
                />
              ))}
            </SimpleGrid>
          </div>

          {/* end image upload contariner */}

          <FormControl isInvalid={!!errors.videotour_url}>
            <FormLabel>URL Tour virtual</FormLabel>
            <DefaultTextInput register={{ ...register('videotour_url') }} />
            <FormErrorMessage>
              {errors.videotour_url && errors.videotour_url.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.price}>
            <FormLabel>Preço (R$)</FormLabel>
            <DefaultTextInput
              register={{ ...register('price') }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleMonetaryInputChange(e, 'price')
              }
            />
            <FormErrorMessage>
              {errors.price && errors.price.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.address}>
            <FormLabel>Localização (CEP)</FormLabel>
            <DefaultTextInput
              register={{ ...register('address') }}
              onChange={handleZipCodeChange}
            />
            <FormErrorMessage>
              {errors.address && errors.address.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.realtorId}>
            <FormLabel>Corretor Responsável</FormLabel>
            <DefaultSelect
              placeholder="Selecione"
              options={realtorList}
              register={{ ...register('realtorId') }}
            />
            <FormErrorMessage>
              {errors.realtorId && errors.realtorId.message}
            </FormErrorMessage>
          </FormControl>

          <DefaultButton
            disabled={mainImage === null}
            text="Enviar anúncio"
            orangeSchema
            buttonType="submit"
          />
        </form>
      </div>
    </AdminLayout>
  );
}

export default NovoAnuncio;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies['santos_imoveis.access_token'];

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
