import CardProperties from '@/components/cardProperties';
import CustomTooltip from '@/components/customTooltip';
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
    neighborhoodsByCity: [],
    allNeighborhoods: [],
    cities: [],
    types: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSearchCode, setShowSearchCode] = useState<boolean>(false);

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
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
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
        <div
          className={`${
            showSearchCode
              ? 'mb-[180px] md:mb-[160px]'
              : 'mb-[420px] md:mb-[300px]'
          } w-full h-[650px] `}
        >
          <Image
            src={'/images/belem-default-docas.jpg'}
            style={{ objectFit: 'cover' }}
            width={'100%'}
            height={'100%'}
            alt="Imagem de fundo com a cidade de Belém"
          />
        </div>
        <div
          className={`absolute top-[550px] left-[50%] transform -translate-x-1/2 flex flex-col mx-auto items-center py-3 px-4 w-full h-fit lg:max-w-[950px] ${
            showSearchCode ? 'lg:h-[250px]' : 'lg:h-[380px]'
          }  bg-orange-600/90 text-[#FBFBFA] md:rounded-lg`}
        >
          <span className="text-xl font-medium mt-4 text-nowrap md:text-3xl">
            Encontre o Imóvel dos seus sonhos
          </span>
          {showSearchCode && (
            <form className="w-full" onSubmit={handleSubmit(searchByCode)}>
              <span className="flex flex-col gap-3 items-end justify-between w-full py-4 mt-10 md:flex-row">
                <div className="flex flex-col w-full gap-2">
                  <span className="font-medium text-lg">
                    Busque pelo Código do Imóvel
                  </span>
                  <DefaultTextInput
                    className="w-full bg-white text-zinc-600 placeholder:text-zinc-600"
                    placeholder="Digite o Código"
                    register={{
                      ...register('code'),
                    }}
                  />
                </div>
                <DefaultButton
                  buttonType="submit"
                  text="Buscar pelo código do Imóvel"
                  isSearchButton
                />
              </span>
            </form>
          )}
          {!showSearchCode && (
            <form className="w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid
                className="w-full mt-4"
                columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
                spacingY={3}
                spacingX={3}
              >
                <div className="flex flex-col w-full gap-2">
                  <span className="flex items-center gap-2">
                    <span className="font-medium text-lg">Tipo de Imóvel</span>
                    <CustomTooltip
                      label="Escolha entre Apartamento, Casa,Terreno ou Comercial. Deixe vazio para não filtrar."
                      size={3.5}
                    />
                  </span>

                  <DefaultSelect
                    options={transformToOptionArray(filterOption?.types)}
                    placeholder="Selecione"
                    register={{ ...register('type') }}
                  />
                </div>

                <div className="flex flex-col w-full gap-2">
                  <span className="flex items-center gap-2">
                    <span className="font-medium text-lg">Cidade</span>
                    <CustomTooltip
                      label="Selecione uma cidade específica para filtrar os imóveis disponíveis naquela localidade. Deixe em branco para visualizar opções em todas as cidades cadastradas."
                      size={3.5}
                    />
                  </span>

                  <DefaultSelect
                    options={transformToOptionArray(filterOption?.cities)}
                    placeholder="Selecione"
                    register={{ ...register('city') }}
                  />
                </div>
              </SimpleGrid>
              <SimpleGrid
                className="w-full mt-4"
                columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
                spacingX={5}
              >
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2">
                    <span className="font-medium text-lg">
                      Selecione a faixa de Preço
                    </span>
                    <CustomTooltip
                      label="Defina o valor mínimo e máximo para filtrar os imóveis dentro do seu orçamento. Deixe um ou ambos os campos em branco para não aplicar limite."
                      size={3.5}
                    />
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
                  <div className="flex flex-col h-full w-full md:justify-center gap-2">
                    <span className="flex items-center gap-2">
                      <span className="font-medium text-lg">Financiavéis</span>
                      <CustomTooltip
                        label='Selecione "Sim" para filtrar apenas imóveis que podem ser financiados, "Não" para mostrar apenas imóveis que não permitem financiamento ou deixe em branco para incluir ambos os tipos nos resultados.'
                        size={3.5}
                      />
                    </span>
                    <DefaultSelect
                      options={[
                        { title: 'Sim', value: 'true' },
                        { title: 'Não', value: 'false' },
                      ]}
                      placeholder="Selecione"
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
          )}
        </div>

        <span
          onClick={() => setShowSearchCode(!showSearchCode)}
          className={`${
            showSearchCode
              ? 'top-[830px] lg:top-[810px]'
              : 'top-[1080px] md:top-[940px]'
          } absolute left-[50%] transform -translate-x-1/2 text-orange-600 font-medium cursor-pointer text-nowrap`}
        >
          {showSearchCode
            ? 'Voltar para o Filtro Principal'
            : 'Buscar pelo Código do Imóvel'}
        </span>

        <div className="flex flex-col w-full h-full items-center">
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
