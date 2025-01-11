import {
  defaultFiltersSchema,
  TypeFormData,
} from '@/schemas/defaultFiltersSchema';
import { priceMask } from "@/utils/priceMask";
import { Checkbox, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import DefaultSelect from "./deafultSelect";
import DefaultTextInput from "./defaultTextInput";
import DefaultButton from "./defaultButton";

interface IFilterDrawer {
  isOpen: boolean,
  onClose: () => void;
}

function FilterDrawer({ isOpen, onClose }: IFilterDrawer) {
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

  const onSubmit: SubmitHandler<TypeFormData> = (data) => {
    const formattedData = {
      ...data,
      minPrice: data.minPrice?.replace(/,/g, '') ?? '',
      maxPrice: data.maxPrice?.replace(/,/g, '') ?? '',
    };
    console.log(formattedData);
  };

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