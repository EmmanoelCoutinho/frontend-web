import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Image, SimpleGrid } from "@chakra-ui/react";
import IconFrame from "../iconFrame";
import {
  FaBed,
  FaCar,
  FaLocationDot,
  FaShower,
  FaRulerCombined,
} from 'react-icons/fa6';
import { Property } from "@/types/propertiesType";
import { priceMask } from "@/utils/priceMask";
import { verifyAndAddPlus } from "@/utils/verifyAndAddPlus";
import { translateEnumProperty } from "@/utils/translateEnumProperty";

function CardProperties({ propertyDetails }: { propertyDetails: Property }) {
  const iconSize = 16;

  const redirect = (code: number) => {
    window.open(`/imoveis/${code}`, '_blank');
  };

  return (
    <div
      onClick={() => redirect(propertyDetails.id)}
      className="flex flex-col h-[720px]  w-full max-w-[370px]  rounded-lg overflow-hidden shadow-lg text-zinc-600 relative cursor-pointer"
    >
      <span className="flex justify-center items-center absolute top-4 left-4 w-[100px] h-[30px] bg-orange-600 text-white font-medium rounded-md z-50">
        Cód: {propertyDetails.id}
      </span>
      <div className="w-full min-h-[350px] overflow-hidden">
        <Image
          src={propertyDetails.images[propertyDetails.ad_image_cover]}
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
          width={'100%'}
          height={'100%'}
          alt="Imóvel a venda"
          _hover={{
            transform: 'scale(1.1)',
          }}
        />
      </div>
      <div className="flex flex-col w-full h-full p-2">
        <span className="text-2xl font-medium">
          {translateEnumProperty(propertyDetails.Property_type)}
        </span>
        <div className="flex flex-col w-full mt-6">
          <span className="flex items-center gap-2">
            <IconFrame icon={<FaLocationDot size={iconSize} />} />
            <span className="text-zinc-600 font-medium">
              {propertyDetails?.address?.logradouro}
              {propertyDetails?.address?.logradouro && ','}{' '}
              {propertyDetails?.address?.localidade}/
              {propertyDetails?.address?.uf}
            </span>
          </span>
          <SimpleGrid columns={3} className="mt-6">
            <span className="flex items-center gap-2">
              <IconFrame icon={<FaBed size={iconSize} />} />
              <div className="flex flex-col justify-center items-center">
                <span className="text-zinc-600 font-medium text-sm">
                  {verifyAndAddPlus(propertyDetails.bedroom)}
                </span>
                <span className="text-xs">Quarto(s)</span>
              </div>
            </span>
            <span className="flex items-center gap-2">
              <IconFrame icon={<FaShower size={iconSize} />} />
              <div className="flex flex-col justify-center items-center">
                <span className="text-zinc-600 font-medium text-sm">
                  {verifyAndAddPlus(propertyDetails.bathroom)}
                </span>
                <span className="text-xs">Banheiro(s)</span>
              </div>
            </span>
            <span className="flex items-center gap-2 pl-4">
              <IconFrame icon={<FaCar size={iconSize} />} />
              <div className="flex flex-col justify-center items-center">
                <span className="text-zinc-600 font-medium text-sm">
                  {verifyAndAddPlus(propertyDetails.parking_spaces)}
                </span>
                <span className="text-xs">Vaga(s)</span>
              </div>
            </span>
          </SimpleGrid>
          <SimpleGrid columns={3} className="mt-6">
            {propertyDetails.useful_area && (
              <span className="flex items-center gap-2 text-nowrap">
                <IconFrame icon={<FaRulerCombined size={iconSize} />} />
                <div className="flex flex-col justify-center items-center">
                  <span className="text-zinc-600 font-medium text-xs">
                    {priceMask(propertyDetails?.useful_area?.toString())} m²
                  </span>
                  <span className="text-xs">Área Util</span>
                </div>
              </span>
            )}
            {propertyDetails.total_area ? (
              <span className="flex items-center gap-2 text-nowrap">
                <IconFrame icon={<FaRulerCombined size={iconSize} />} />
                <div className="flex flex-col justify-center items-center">
                  <span className="text-zinc-600 font-medium text-xs">
                    {priceMask(propertyDetails?.total_area?.toString())} m²
                  </span>
                  <span className="text-xs">Área Total</span>
                </div>
              </span>
            ) : (
              <span className="h-9"></span>
            )}
          </SimpleGrid>
        </div>
        <div className="flex flex-col pt-6">
          <span>Valor</span>
          <span className="text-zinc-600 font-medium text-2xl">
            R$ {priceMask(propertyDetails?.price.toString())}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center px-6 h-28 bg-gray-300 rounded-b-lg text-zinc-600 font-medium cursor-pointer hover:bg-orange-600 hover:text-white">
        <span>Mais Detalhes</span>
        <ArrowForwardIcon />
      </div>
    </div>
  );
}

export default CardProperties;