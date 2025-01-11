import CardProperties from '@/components/cardProperties';
import DefaultSelect from '@/components/deafultSelect';
import {
  Checkbox,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { TbHomeDollar } from 'react-icons/tb';
import { useForm, SubmitHandler } from 'react-hook-form';
import DefaultButton from '@/components/defaultButton';
import DefaultTextInput from '@/components/defaultTextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultFiltersSchema,
  TypeFormData,
} from '@/schemas/defaultFiltersSchema';
import { IoFilterSharp } from 'react-icons/io5';
import { priceMask } from '@/utils/priceMask';
import PageHeader from '@/components/pageHeader';
import FilterDrawer from '@/components/filtersDrawer';

function Imoveis() {
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

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <PageHeader title="Imóveis a venda" />
        <div className="flex flex-col md:flex-row w-full h-full">
          <div className="hidden md:flex flex-col w-full max-w-[250px] h-fit shadow-lg bg-white rounded-r-lg overflow-x-hidden">
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
          </div>
          <span
            onClick={onOpen}
            className="fixed bottom-6 right-6 z-10 flex justify-center items-center font-medium text-white bg-orange-600 w-14 h-14 rounded-full md:hidden"
          >
            <IoFilterSharp size={28} />
          </span>
          <div className="flex flex-col w-full h-full max-h-[1000px] overflow-y-scroll px-4">
            <SimpleGrid
              className="w-full"
              columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}
              spacingY={10}
              spacingX={3}
            >
              <CardProperties imageSrc="/images/casa1.jpg" />
              <CardProperties imageSrc="/images/casa2.jpg" />
              <CardProperties imageSrc="/images/casa3.jpg" />
              <CardProperties imageSrc="/images/casa1.jpg" />
              <CardProperties imageSrc="/images/casa1.jpg" />
              <CardProperties imageSrc="/images/casa2.jpg" />
              <CardProperties imageSrc="/images/casa3.jpg" />
              <CardProperties imageSrc="/images/casa1.jpg" />
              <CardProperties imageSrc="/images/casa1.jpg" />
              <CardProperties imageSrc="/images/casa2.jpg" />
              <CardProperties imageSrc="/images/casa3.jpg" />
              <CardProperties imageSrc="/images/casa1.jpg" />
            </SimpleGrid>
          </div>
        </div>
      </div>
      <FilterDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Imoveis;
