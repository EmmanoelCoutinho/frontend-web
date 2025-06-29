import {
  defaultFiltersSchema,
  TypeFormData,
} from '@/schemas/defaultFiltersSchema';
import { priceMask } from '@/utils/priceMask';
import {
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import DefaultSelect from './deafultSelect';
import DefaultTextInput from './defaultTextInput';
import DefaultButton from './defaultButton';
import { reverseTranslateEnumProperty, translateEnumProperty } from '@/utils/translateEnumProperty';
import { useRouter } from 'next/router';
import { FilterOptions } from '@/types/FilterOptionsType';
import { transformToOptionArray } from '@/utils/tranformToOptionArray';
import { useEffect } from 'react';
import { IoTrashBinSharp } from 'react-icons/io5';

interface IFilterDrawer {
  isOpen: boolean;
  onClose: () => void;
  filterOption: FilterOptions;
  filterOptionsNeighborhoods: string[];
  query: any;
}

function FilterDrawer({
  isOpen,
  onClose,
  filterOption,
  filterOptionsNeighborhoods,
  query
}: IFilterDrawer) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TypeFormData>({ resolver: zodResolver(defaultFiltersSchema) });

  const { financing } = watch();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'minPrice' | 'maxPrice'
  ) => {
    const rawValue = e.target.value.replace(/\./g, '');
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

    onClose();
  };

  function handleChangeFinanceable(value: string) {
    if (financing === value) return setValue('financing', '');

    setValue('financing', value);
  }

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

    onClose();
  };

  useEffect(() => {
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

    setFilterValues(query)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          <span className="text-orange-600">
            Encontre o Imóvel dos seus sonhos
          </span>
        </DrawerHeader>

        <DrawerBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full h-full gap-10 pt-6">
              <DefaultSelect
                options={transformToOptionArray(filterOption?.types)}
                // options={[]}
                placeholder="Tipo de Imóvel"
                register={{ ...register('type') }}
              />
              <DefaultSelect
                options={transformToOptionArray(filterOption?.cities)}
                // options={[]}
                placeholder="Cidade"
                register={{ ...register('city') }}
              />
              <DefaultSelect
                options={transformToOptionArray(filterOptionsNeighborhoods)}
                // options={[]}
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

              <div className="flex flex-col gap-10  w-full h-28">
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
            </div>
          </form>
           <span
              onClick={resetFilters}
              className="flex gap-1 mt-4 justify-center items-center bg-red-600 text-sm py-1 font-medium text-white w-full rounded-lg hover:bg-red-800 cursor-pointer"
            >
              <IoTrashBinSharp className="pt-0.5" />
              <span>Limpar Filtros</span>
            </span>
        </DrawerBody>

        <DrawerFooter>
          <div className="flex w-full justify-around items-center">
            <DefaultButton
              text="Cancelar"
              maxWidth={200}
              onClinkFunc={onClose}
            />
            <DefaultButton
              text="Buscar Imóvel"
              orangeSchema
              maxWidth={200}
              isSearchButton
              onClinkFunc={handleSubmit(onSubmit)}
            />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default FilterDrawer;
