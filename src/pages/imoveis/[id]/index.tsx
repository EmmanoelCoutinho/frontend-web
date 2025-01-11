import DefaultButton from '@/components/defaultButton';
import IconFrame from '@/components/iconFrame';
import ImageSliderShow from '@/components/imageSliderShow';
import PageHeader from '@/components/pageHeader';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { FaBed, FaCar, FaShower, FaWhatsapp } from 'react-icons/fa';
import { FaLocationDot, FaRulerCombined } from 'react-icons/fa6';

const iconSize = 16;

const formatedText = `
Perfeito para morar ou investir, O Jardins di Porto Belo reúne lazer, conforto e modernidade, em um empreendimento estrategicamente localizado no Litoral que mais valoriza no Brasil!

O EMPREENDIMENTO

- 06 blocos de apartamentos
- 04 andares por pavimento
- 04 apartamentos por andar
- Guarita de segurança
- Portão eletrônico
- Área de lazer e comum decoradas

ÁREA DE LAZER

- Piscina adulto e infantil
- Salão de festas com churrasqueira
- Playground
- Academia
- Espaço Mulher
- Espaço Pet
- Lava Car

O APARTAMENTO

- 50,37m² de área interna privativa
- 56,90m² de área Garden privativa (área externa privativa do apto)
- 02 dormitórios
- Sala de estar e jantar
- Cozinha integrada
- Área de serviço
- Banheiro social
- Sacada com churrasqueira
- Estacionamento para 1 carro
- Apto não mobiliado

Número de Incorporação Imobiliária: R3-35.169
`;

function ImovelView() {
  return (
    <div className="flex flex-col w-full h-full text-zinc-600">
      <PageHeader title="Titulo imovel" />
      <div className="flex flex-col w-fit h-full px-4 mx-auto">
        <div className="flex w-full h-fit justify-center gap-4">
          <div className='flex flex-col w-full h-full max-w-[1040px]' >
            <ImageSliderShow
              images={[
                '/images/casa1.jpg',
                '/images/casa2.jpg',
                '/images/casa3.jpg',
                '/images/casa1.jpg',
                '/images/casa2.jpg',
                '/images/casa3.jpg',
                '/images/casa1.jpg',
                '/images/casa2.jpg',
                '/images/casa3.jpg',
                '/images/casa1.jpg',
                '/images/casa2.jpg',
                '/images/casa3.jpg',
              ]}
              totalImages={12}
            />
            <div className="flex flex-col w-full h-full mt-10 border-b-2 border-zinc-600 pb-4">
              <span className="flex justify-center items-center w-[120px] h-[30px] bg-orange-600 text-white font-medium rounded-md z-50 mb-6">
                Código: 200
              </span>
              <span className="w-fit font-bold border-b-2 border-zinc-600 pr-4">
                Descrição do Imóvel
              </span>
              <Box whiteSpace={'pre-wrap'}>{formatedText}</Box>
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full h-full max-w-[400px] ">
            <div className="flex flex-col w-full h-full max-h-[300px] bg-gray-200 p-4 rounded-lg gap-2">
              <span className="flex flex-row justify-between items-center w-full h-[50px] rounded-md bg-zinc-600 text-white px-4">
                <span className="font-bold">Casa</span>
                <span>Código: 200</span>
              </span>
              <span className="flex flex-row justify-between items-center w-full h-[50px] px-2">
                {/* caso possa ser financiavel pintar de verde */}
                <span className="font-bold text-red-600">Não financiável</span>
                <span>R$ 700.000</span>
              </span>
              <span className="flex flex-row justify-around items-center w-full h-[50px]">
                <DefaultButton
                  text="Entrar em contato"
                  leftIcon={<FaWhatsapp size={20} />}
                  orangeSchema
                />
              </span>
            </div>
            <div className="flex flex-col w-full h-full max-h-[300px] bg-gray-200 p-4 rounded-lg gap-2">
              <span className="w-fit font-bold border-b-2 border-zinc-600 pr-4 mb-4">
                Detalhes do Imóvel
              </span>
              <div className="flex flex-col w-full">
                <span className="flex items-center gap-2">
                  <IconFrame icon={<FaLocationDot size={iconSize} />} />
                  <span className="text-zinc-600 font-medium">
                    Senado lemos, Belém/PA
                  </span>
                </span>
                <SimpleGrid columns={3} className="mt-6">
                  <span className="flex items-center gap-2">
                    <IconFrame icon={<FaBed size={iconSize} />} />
                    <div className="flex flex-col justify-center items-center">
                      <span className="text-zinc-600 font-medium text-sm">
                        4
                      </span>
                      <span className="text-xs">Quarto(s)</span>
                    </div>
                  </span>
                  <span className="flex items-center gap-2">
                    <IconFrame icon={<FaShower size={iconSize} />} />
                    <div className="flex flex-col justify-center items-center">
                      <span className="text-zinc-600 font-medium text-sm">
                        2
                      </span>
                      <span className="text-xs">Banheiro(s)</span>
                    </div>
                  </span>
                  <span className="flex items-center gap-2 pl-4">
                    <IconFrame icon={<FaCar size={iconSize} />} />
                    <div className="flex flex-col justify-center items-center">
                      <span className="text-zinc-600 font-medium text-sm">
                        3
                      </span>
                      <span className="text-xs">Vaga(s)</span>
                    </div>
                  </span>
                </SimpleGrid>
                <SimpleGrid columns={3} className="mt-6">
                  <span className="flex items-center gap-2 text-nowrap">
                    <IconFrame icon={<FaRulerCombined size={iconSize} />} />
                    <div className="flex flex-col justify-center items-center">
                      <span className="text-zinc-600 font-medium text-xs">
                        102,00 m²
                      </span>
                      <span className="text-xs">Área Util</span>
                    </div>
                  </span>
                  <span className="flex items-center gap-2 text-nowrap">
                    <IconFrame icon={<FaRulerCombined size={iconSize} />} />
                    <div className="flex flex-col justify-center items-center">
                      <span className="text-zinc-600 font-medium text-xs">
                        102,00 m²
                      </span>
                      <span className="text-xs">Área Total</span>
                    </div>
                  </span>
                </SimpleGrid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImovelView;
