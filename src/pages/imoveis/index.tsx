import CardProperties from '@/components/cardProperties';
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultFiltersSchema,
  TypeFormData,
} from '@/schemas/defaultFiltersSchema';
import { priceMask } from '@/utils/priceMask';
import PageHeader from '@/components/pageHeader';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/services/axios';
import { Property } from '@/types/propertiesType';
import LoadingModal from '@/components/loadingModal';
import { useRouter } from 'next/router';
import Pagination from '@/components/pagination';
import DefaultButton from '@/components/defaultButton';
import DefaultTextInput from '@/components/defaultTextInput';
import DefaultSelect from '@/components/deafultSelect';
import {
  reverseTranslateEnumProperty,
  translateEnumProperty,
} from '@/utils/translateEnumProperty';
import { FilterOptions } from '@/types/FilterOptionsType';
import { transformToOptionArray } from '@/utils/tranformToOptionArray';
import { IoFilterSharp, IoTrashBinSharp } from 'react-icons/io5';
import FilterDrawer from '@/components/filtersDrawer';

type Pagination = {
  limit: string | number;
  page: string | number;
  total: number;
  totalPages: number;
};

function Imoveis() {
  const router = useRouter();
  const query = router.query;

  const [properties, setProperties] = useState<Property[]>([]);
  const [paginationInfos, setPaginationInfos] = useState<Pagination>();
  const [filterOption, setFilterOptions] = useState<FilterOptions>({
    neighborhoodsByCity: [],
    allNeighborhoods: [],
    cities: [],
    types: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TypeFormData>({ resolver: zodResolver(defaultFiltersSchema) });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { financing, city } = watch();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'minPrice' | 'maxPrice'
  ) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = priceMask(rawValue);

    setValue(field, formattedValue);
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
        ...(data.financing && { financeable: data.financing }),
        ...(data?.city && { city: data.city }),
        ...(data?.type && { type: formattedData.type }),
        ...(data?.neighborhood && { neighborhood: data.neighborhood }),
      },
    });
  };

  async function getProperties(searchParams: any) {
    setIsLoading(true);
    try {
      const [filteredResponse, optionsResponse] = await Promise.all([
        api.get('properties/filter', {
          params: {
            ...searchParams,
            limit: 9,
          },
        }),
        api.get('properties/filter-options'),
      ]);

      const data = filteredResponse?.data?.data;

      const getAllNeighborhoods = (neighborhoodsByCity: {
        [key: string]: string[];
      }): string[] => {
        return Object.values(neighborhoodsByCity).flatMap((bairros) => bairros);
      };

      const translatedTypes = optionsResponse?.data?.types?.flatMap(
        (item: string) => {
          return translateEnumProperty(item);
        }
      );

      setProperties(data);
      delete filteredResponse.data.data;
      setPaginationInfos(filteredResponse?.data);
      setFilterOptions({
        ...optionsResponse.data,
        types: translatedTypes,
        allNeighborhoods: getAllNeighborhoods(
          optionsResponse.data.neighborhoodsByCity
        ),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const filterOptionsNeighborhoods = useMemo(() => {
    if (city) {
      const normalizedCity = city.toLowerCase();

      const cityKey = Object.keys(filterOption.neighborhoodsByCity).find(
        (key) => key.toLowerCase() === normalizedCity
      );

      //@ts-ignore
      return cityKey ? filterOption.neighborhoodsByCity[cityKey] : [];
    }

    return filterOption.allNeighborhoods || [];
  }, [city, filterOption]);

  const handlePageChange = (page: number) => {
    router.push({
      pathname: 'imoveis',
      query: {
        ...query,
        page,
      },
    });
  };

  function handleChangeFinanceable(value: string) {
    if (financing === value) return setValue('financing', '');

    setValue('financing', value);
  }

  const setFilterValues = (query: any) => {
    if (query?.type) {
      setValue('type', translateEnumProperty(query.type));
    }
    if (query?.city) {
      setValue('city', query.city);
    }
    if (query?.neighborhood) {
      setValue('neighborhood', query.neighborhood);
    }
    if (query?.minPrice) {
      setValue('minPrice', priceMask(query.minPrice));
    }
    if (query?.maxPrice) {
      setValue('maxPrice', priceMask(query.maxPrice));
    }
    if (query?.financeable) {
      setValue('financing', query.financeable);
    }
  };

  const resetFilters = () => {
    reset({
      type: '',
      city: '',
      neighborhood: '',
      minPrice: '',
      maxPrice: '',
      financing: '',
    });

    router.push({
      pathname: 'imoveis',
      query: { page: 1 },
    });
  };

  const hasFilters = (query: any) => {
    const ignoredKeys = ['page'];
    return Object.keys(query).some((key) => !ignoredKeys.includes(key));
  };

  useEffect(() => {
    if (query) {
      getProperties(query);
      setTimeout(() => {
        setFilterValues(query);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    const handleScroll = () => {
      if (properties.length === 0) {
        setIsFixed(false);
        return;
      }

      if (window.scrollY > 465) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [properties]);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <PageHeader title="Imóveis a venda" />
        <div className="flex flex-col md:flex-row w-full h-full">
          <div
            className={`${isFixed ? 'flex' : 'hidden'} w-full max-w-[250px]`}
          />
          <div
            className={`hidden md:flex flex-col w-full max-w-[250px] h-fit shadow-lg bg-white rounded-r-lg overflow-x-hidden ${
              isFixed ? 'fixed top-0' : ''
            }`}
          >
            <span className="flex justify-center items-center font-medium text-zinc-600 bg-gray-300 w-full h-10">
              Buscar por Categorias
            </span>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col w-full h-full gap-2 pt-6 px-2 pb-4">
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
                <DefaultSelect
                  options={transformToOptionArray(filterOptionsNeighborhoods)}
                  placeholder="Bairro"
                  register={{ ...register('neighborhood') }}
                />

                <div className="flex flex-col w-full gap-4">
                  <span className="font-medium text-lg text-zinc-600">
                    Financiavéis
                  </span>
                  <span className="w-full gap-4 flex">
                    <span
                      onClick={() => handleChangeFinanceable('true')}
                      className={`${
                        financing === 'true'
                          ? 'bg-orange-600 text-white'
                          : 'bg-white text-orange-600'
                      } px-5 py-1 rounded-2xl  border border-orange-600 cursor-pointer`}
                    >
                      Sim
                    </span>
                    <span
                      onClick={() => handleChangeFinanceable('false')}
                      className={`${
                        financing === 'false'
                          ? 'bg-orange-600 text-white'
                          : 'bg-white text-orange-600'
                      } px-5 py-1 rounded-2xl  border border-orange-600 cursor-pointer`}
                    >
                      Não
                    </span>
                  </span>
                </div>

                <div className="flex flex-col gap-4  w-full h-28">
                  <span className="font-medium text-lg text-zinc-600">
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
                <div className="flex flex-col gap-2">
                  <DefaultButton
                    buttonType="submit"
                    text="Perquisar"
                    orangeSchema
                    isSearchButton
                  />
                  {hasFilters(query) && (
                    <span
                      onClick={resetFilters}
                      className="flex gap-1 justify-center items-center bg-red-600 text-sm py-1 font-medium text-white w-full rounded-lg hover:bg-red-800 cursor-pointer"
                    >
                      <IoTrashBinSharp className="pt-0.5" />
                      <span>Limpar Filtros</span>
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>

          <span
            onClick={onOpen}
            className="fixed bottom-6 right-6 z-10 flex justify-center items-center font-medium text-white bg-orange-600 w-14 h-14 rounded-full md:hidden"
          >
            <IoFilterSharp size={28} />
          </span>
          {properties?.length !== 0 ? (
            <div className="flex flex-col w-full px-4">
              <SimpleGrid
                columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}
                spacingY={10}
                spacingX={3}
              >
                {properties?.map((item, index) => (
                  <CardProperties key={index} propertyDetails={item} />
                ))}
              </SimpleGrid>
              <Pagination
                totalPages={paginationInfos?.totalPages ?? 0}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <span className="flex-1 flex flex-col justify-center items-center text-zinc-600 text-3xl">
              <span>Infelizmente ainda não temos um Imóvel</span>
              <span>com essas características 😔</span>
            </span>
          )}
        </div>
      </div>

      <FilterDrawer
        isOpen={isOpen}
        onClose={onClose}
        filterOption={filterOption}
        filterOptionsNeighborhoods={filterOptionsNeighborhoods}
        query={query}
      />
      <LoadingModal isLoading={isLoading} />
    </>
  );
}

export default Imoveis;
