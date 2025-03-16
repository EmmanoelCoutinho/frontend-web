import CardProperties from '@/components/cardProperties';
import DefaultSelect from '@/components/deafultSelect';
import DefaultButton from '@/components/defaultButton';
import DefaultTextInput from '@/components/defaultTextInput';
import LoadingModal from '@/components/loadingModal';
import {
  defaultFiltersSchema,
  TypeFormData,
} from '@/schemas/defaultFiltersSchema';
import { api } from '@/services/axios';
import { FilterOptions } from '@/types/FilterOptionsType';
import { Property } from '@/types/propertiesType';
import { priceMask } from '@/utils/priceMask';
import { randomPicture } from '@/utils/randomPicture';
import { transformToOptionArray } from '@/utils/tranformToOptionArray';
import {
  reverseTranslateEnumProperty,
  translateEnumProperty,
} from '@/utils/translateEnumProperty';
import {
  AbsoluteCenter,
  Divider,
  Image,
  Link,
  SimpleGrid,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TbHomeDollar } from 'react-icons/tb';

export default function Home() {
  const toaster = useToast();
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [filterOption, setFilterOptions] = useState<FilterOptions>({
    neighborhoods: [],
    cities: [],
    types: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TypeFormData>({ resolver: zodResolver(defaultFiltersSchema) });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'minPrice' | 'maxPrice'
  ) => {
    const rawValue = e.target.value.replace(/\./g, '');
    const formattedValue = priceMask(rawValue);
    setValue(field, formattedValue);
  };

  const searchByCode: SubmitHandler<TypeFormData> = async (data) => {
    try {
      const response = await api.get('properties/filter', {
        params: {
          code: data.code,
        },
      });

      if (response?.data?.data?.length > 0) {
        router.push({ pathname: 'imoveis', query: { code: data?.code } });
        return;
      }

      toaster({
        description: 'Verifique se o Código do Imóvel está correto!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
    }
  };

  //  page=1&
  // limit=10&
  // city=Belém&
  // type=APARTMENT&
  // minPrice=100000&
  // maxPrice=500000&
  // bedrooms=2&
  // bathrooms=2&
  // code=123&
  // financeable=true

  const onSubmit: SubmitHandler<TypeFormData> = (data) => {
    const formattedData = {
      ...data,
      minPrice: data.minPrice?.replace(/\./g, '') ?? '',
      maxPrice: data.maxPrice?.replace(/\./g, '') ?? '',
      type: reverseTranslateEnumProperty(data.type),
    };

    router.push({
      pathname: 'imoveis',
      query: {
        page: 1,
        ...(data?.code && { code: data.code }),
        ...(formattedData?.minPrice && { minPrice: formattedData.minPrice }),
        ...(formattedData?.maxPrice && { maxPrice: formattedData.maxPrice }),
        ...(data.financing !== '' && { financeable: data.financing }),
        ...(data?.city && { city: data.city }),
        ...(data?.type && { type: formattedData.type }),
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [featuredResponse, optionsResponse] = await Promise.all([
          api.get('properties/featured'),
          api.get('properties/filter-options'),
        ]);

        const translatedTypes = optionsResponse?.data?.types?.flatMap(
          (item: string) => {
            return translateEnumProperty(item);
          }
        );

        setProperties(featuredResponse.data);
        setFilterOptions({ ...optionsResponse.data, types: translatedTypes });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        {/* mb-[700px] md:mb-[400px] lg:mb-[400px] */}
        <div className="w-full h-[650px] mb-[700px] md:mb-[400px] lg:mb-[400px] ">
          <Image
            src={randomPicture()}
            style={{ objectFit: 'cover' }}
            width={'100%'}
            height={'100%'}
            alt="Imagem de fundo com a cidade de Belém"
          />
        </div>
        <div className="absolute top-[550px] left-[50%] transform -translate-x-1/2 flex flex-col mx-auto items-center py-3 px-4 w-full h-fit lg:max-w-[950px] lg:h-[500px] bg-orange-600/90 text-[#FBFBFA] md:rounded-lg">
          <span className="text-xl font-medium mt-4 text-nowrap md:text-3xl">
            Encontre o Imóvel dos seus sonhos
          </span>
          <form className="w-full" onSubmit={handleSubmit(searchByCode)}>
            <span className="flex flex-col gap-3 justify-between w-full py-4 mt-10 md:flex-row">
              <DefaultTextInput
                className="w-full bg-white text-zinc-600 placeholder:text-zinc-600"
                placeholder="Código do Imóvel"
                register={{
                  ...register('code'),
                }}
              />
              <DefaultButton
                buttonType="submit"
                text="Buscar pelo código do Imóvel"
                isSearchButton
              />
            </span>
          </form>
          <span className="relative w-full my-10">
            <Divider className="w-[45%]" />
            <AbsoluteCenter px="4">OU</AbsoluteCenter>
            <Divider className="absolute right-0 w-[45%]" />
          </span>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid
              className="w-full mt-4"
              columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
              spacingY={10}
              spacingX={3}
            >
              <DefaultSelect
                options={transformToOptionArray(filterOption?.types)}
                placeholder="Tipo de Imóvel"
                register={{ ...register('type') }}
              />
              <DefaultSelect
                options={transformToOptionArray(filterOption?.cities)}
                placeholder="Cidade"
                register={{ ...register('city') }}
              />
            </SimpleGrid>
            <SimpleGrid
              className="w-full mt-4"
              columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
              spacingX={5}
            >
              <div className="flex flex-col gap-2">
                <span className="font-medium text-lg">
                  Selecione a faixa de Preço
                </span>
                <div className="flex justify-center items-center gap-4">
                  <DefaultTextInput
                    placeholder="Min."
                    register={{
                      ...register('minPrice', {
                        onChange: (e) => handleInputChange(e, 'minPrice'),
                      }),
                    }}
                  />
                  <DefaultTextInput
                    placeholder="Max."
                    register={{
                      ...register('maxPrice', {
                        onChange: (e) => handleInputChange(e, 'maxPrice'),
                      }),
                    }}
                  />
                </div>
              </div>
              <div className="flex mt-2 md:mt-0">
                <div className="flex flex-col h-full md:justify-center gap-2">
                  <span className="font-medium text-lg">Financiavéis</span>
                  <DefaultSelect
                    options={[
                      { title: 'Sim', value: 'true' },
                      { title: 'Não', value: 'false' },
                    ]}
                    placeholder="Selecione uma opção"
                    register={{ ...register('financing') }}
                  />
                </div>
              </div>
            </SimpleGrid>
            <span className="flex justify-end pt-8 w-full h-full">
              <DefaultButton
                buttonType="submit"
                text="Buscar Imóvel"
                isSearchButton
              />
            </span>
          </form>
        </div>
        <div className="flex flex-col w-full h-full items-center mt-10">
          <span className="flex justify-center items-center gap-2 text-zinc-600 font-medium text-3xl border-b-2 border-zinc-600 pb-2 px-4">
            <TbHomeDollar />
            <span>Imóveis em Destaque</span>
          </span>
          <SimpleGrid
            className="w-full mt-10 px-4"
            columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            spacingY={10}
            spacingX={3}
          >
            {properties?.map((item, index) => (
              <CardProperties key={index} propertyDetails={item} />
            ))}
          </SimpleGrid>
          <Link
            href="/imoveis?page=1"
            className="text-orange-600 font-medium text-xl pt-16"
          >
            Ver todos os imóveis
          </Link>
        </div>
      </div>
      <LoadingModal isLoading={isLoading} />
    </>
  );
}
