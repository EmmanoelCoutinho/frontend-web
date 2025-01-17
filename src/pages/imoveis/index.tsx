import CardProperties from '@/components/cardProperties';
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultFiltersSchema,
  TypeFormData,
} from '@/schemas/defaultFiltersSchema';
import { IoFilterSharp } from 'react-icons/io5';
import { priceMask } from '@/utils/priceMask';
import PageHeader from '@/components/pageHeader';
import { useEffect, useState } from 'react';
import { api } from '@/services/axios';
import { Property } from '@/types/propertiesType';
import LoadingModal from '@/components/loadingModal';

function Imoveis() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TypeFormData>({ resolver: zodResolver(defaultFiltersSchema) });
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      minPrice: data.minPrice?.replace(/,/g, '') ?? '',
      maxPrice: data.maxPrice?.replace(/,/g, '') ?? '',
    };
    console.log(formattedData);
  };

  useEffect(() => {
    const getAllProperties = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('properties');
        const data = response.data;

        setProperties(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllProperties();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <PageHeader title="Imóveis a venda" />
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* <div className="hidden md:flex flex-col w-full max-w-[250px] h-fit shadow-lg bg-white rounded-r-lg overflow-x-hidden">
            <span className="flex justify-center items-center font-medium text-zinc-600 bg-gray-300 w-full h-10">
              Buscar por Categorias
            </span>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col w-full h-full gap-10 pt-6 px-2 pb-4">
                <DefaultSelect
                  options={[]}
                  placeholder="Tipo de Imóvel"
                  register={{ ...register('type') }}
                />

                <DefaultSelect
                  options={[]}
                  placeholder="Cidade"
                  register={{ ...register('city') }}
                />
                <DefaultSelect
                  options={[]}
                  placeholder="Bairro"
                  register={{ ...register('neighborhood') }}
                />

                <Checkbox
                  size="lg"
                  colorScheme="green"
                  className="font-medium text-lg text-zinc-600"
                  {...register('financing')}
                >
                  Apenas Financiavéis
                </Checkbox>

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
                <DefaultButton
                  buttonType="submit"
                  text="Perquisar"
                  orangeSchema
                  isSearchButton
                />
              </div>
            </form>
          </div> */}
          <span
            onClick={onOpen}
            className="fixed bottom-6 right-6 z-10 flex justify-center items-center font-medium text-white bg-orange-600 w-14 h-14 rounded-full md:hidden"
          >
            <IoFilterSharp size={28} />
          </span>
          <SimpleGrid
            className="w-full"
            columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}
            spacingY={10}
            spacingX={3}
          >
            {properties?.map((item, index) => (
              <CardProperties key={index} propertyDetails={item} />
            ))}
          </SimpleGrid>
        </div>
      </div>
      {/* <FilterDrawer isOpen={isOpen} onClose={onClose} /> */}
      <LoadingModal isLoading={isLoading} />
    </>
  );
}

export default Imoveis;
