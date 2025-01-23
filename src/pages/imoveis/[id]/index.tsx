import DefaultButton from '@/components/defaultButton';
import IconFrame from '@/components/iconFrame';
import ImageSliderShow from '@/components/imageSliderShow';
import LoadingModal from '@/components/loadingModal';
import PageHeader from '@/components/pageHeader';
import YouTubePlayer from '@/components/youtubePlayer';
import { api } from '@/services/axios';
import { PropertyType } from '@/types/enums/propertyEnum';
import { Property } from '@/types/propertiesType';
import { priceMask } from '@/utils/priceMask';
import { redirectWhatsapp } from '@/utils/redirectWhatsapp';
import { translateEnumProperty } from '@/utils/translateEnumProperty';
import { verifyAndAddPlus } from '@/utils/verifyAndAddPlus';
import { Box, SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaBed, FaCar, FaShower, FaWhatsapp } from 'react-icons/fa';
import { FaLocationDot, FaRulerCombined } from 'react-icons/fa6';

const iconSize = 16;

function ImovelView() {
  const [isLargerThan840] = useMediaQuery('(min-width: 840px)');

  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const callRealtor = () => {
    const message = `Olá, tenho interesse no imovél Código ${property?.id}, gostaria de mais informações!
      https://santosimobiliaria.com/imoveis/${property?.id}
    `;

    redirectWhatsapp(message, property?.Realtor?.number);
  };

  useEffect(() => {
    const getProperty = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`properties/${id}`);
        const data = response.data;

        setProperty(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) getProperty();
  }, [id]);

  return (
    <>
      <div className="flex flex-col w-full h-full text-zinc-600">
        <PageHeader title={property?.title ?? ''} />
        <div className="flex flex-col w-fit h-full px-4 mx-auto">
          <div className="flex flex-col w-full h-fit justify-center gap-4 md:flex-row">
            <div
              className={`flex flex-col w-full h-full max-w-[1040px] ${
                property?.images?.length === 1 && 'items-center'
              }`}
            >
              <ImageSliderShow
                images={property?.images || []}
                totalImages={property?.images?.length || 0}
              />
              {/* border-b-2 */}
              <div className="flex flex-col w-full h-full mt-10  border-zinc-600 pb-4">
                <span className="flex justify-center items-center w-[120px] h-[30px] bg-orange-600 text-white font-medium rounded-md z-50 mb-6">
                  Código: {property?.id}
                </span>
                <span className="w-fit font-bold border-b-2 border-zinc-600 pr-4 mb-4 text-lg">
                  Descrição do Imóvel
                </span>
                <Box whiteSpace={'pre-wrap'}>{property?.description}</Box>
                {property?.videotour_url && (
                  <div className="flex flex-col mt-10">
                    <span className="w-fit font-bold border-b-2 border-zinc-600 pr-4 mb-4 text-lg">
                      Vídeo de apresentação
                    </span>
                    <YouTubePlayer videoUrl={property?.videotour_url} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full h-full max-w-[400px] ">
              <div className="flex flex-col w-full h-full max-h-[300px] bg-gray-200 p-4 rounded-lg gap-2">
                <span className="flex flex-row justify-between items-center w-full h-[50px] rounded-md bg-zinc-600 text-white px-4 text-xl md:text-base">
                  <span className="font-bold">
                    {property?.Property_type
                      ? translateEnumProperty(property.Property_type)
                      : ''}
                  </span>
                  <span>Código: {property?.id}</span>
                </span>
                <span className="flex flex-col justify-start items-start w-full h-[50px] px-2 md:flex-row md:justify-between md:items-center">
                  <span
                    className={`font-bold uppercase ${
                      property?.financeable ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {property?.financeable ? 'Financiável' : 'Não financiável'}
                  </span>
                  <span className="font-bold text-xl">
                    R${' '}
                    {priceMask(
                      property?.price ? property?.price.toString() : '0'
                    )}
                  </span>
                </span>

                {property?.iptu ||
                  (property?.condon_price && (
                    <div className="flex mb-2">
                      {property?.iptu && (
                        <span className="flex flex-col w-full justify-between items-start font-medium px-2">
                          <span>IPTU</span>
                          <span>R$ {property.iptu.toString()}</span>
                        </span>
                      )}
                      {property?.condon_price && (
                        <span className="flex flex-col w-full justify-between items-end font-medium px-2">
                          <span> Condomínio</span>
                          <span>
                            R$ {priceMask(property.condon_price.toString())}
                          </span>
                        </span>
                      )}
                    </div>
                  ))}

                <span className="flex flex-row justify-around items-center w-full h-[50px]">
                  <DefaultButton
                    onClinkFunc={callRealtor}
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
                      {property?.address?.logradouro}
                      {property?.address?.logradouro && ','}{' '}
                      {property?.address?.localidade}/{property?.address?.uf}
                    </span>
                  </span>
                  <SimpleGrid columns={3} className="mt-6">
                    {property?.bedroom !== undefined &&
                      property?.bedroom >= 0 && (
                        <span className="flex items-center gap-2">
                          <IconFrame icon={<FaBed size={iconSize} />} />
                          <div className="flex flex-col justify-center items-center">
                            <span className="text-zinc-600 font-medium text-sm">
                              {verifyAndAddPlus(property?.bedroom)}
                            </span>
                            <span className="text-xs">Quarto(s)</span>
                          </div>
                        </span>
                      )}
                    {property?.bathroom !== undefined &&
                      property.bathroom >= 0 && (
                        <span className="flex items-center gap-2">
                          <IconFrame icon={<FaShower size={iconSize} />} />
                          <div className="flex flex-col justify-center items-center">
                            <span className="text-zinc-600 font-medium text-sm">
                              {verifyAndAddPlus(property?.bathroom)}
                            </span>
                            <span className="text-xs">Banheiro(s)</span>
                          </div>
                        </span>
                      )}
                    {property?.parking_spaces !== undefined &&
                      property.parking_spaces >= 0 && (
                        <span className="flex items-center gap-2 pl-4">
                          <IconFrame icon={<FaCar size={iconSize} />} />
                          <div className="flex flex-col justify-center items-center">
                            <span className="text-zinc-600 font-medium text-sm">
                              {verifyAndAddPlus(property?.parking_spaces)}
                            </span>
                            <span className="text-xs">Vaga(s)</span>
                          </div>
                        </span>
                      )}
                  </SimpleGrid>
                  <SimpleGrid columns={3} className="mt-6">
                    {property?.useful_area && (
                      <span className="flex items-center gap-2 text-nowrap">
                        <IconFrame icon={<FaRulerCombined size={iconSize} />} />
                        <div className="flex flex-col justify-center items-center">
                          <span className="text-zinc-600 font-medium text-xs">
                            {property?.useful_area} m²
                          </span>
                          <span className="text-xs">Área Util</span>
                        </div>
                      </span>
                    )}
                    {property?.total_area && (
                      <span className="flex items-center gap-2 text-nowrap">
                        <IconFrame icon={<FaRulerCombined size={iconSize} />} />
                        <div className="flex flex-col justify-center items-center">
                          <span className="text-zinc-600 font-medium text-xs">
                            {property?.total_area} m²
                          </span>
                          <span className="text-xs">Área Total</span>
                        </div>
                      </span>
                    )}
                  </SimpleGrid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingModal isLoading={isLoading} />
    </>
  );
}

export default ImovelView;
