import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Image, SimpleGrid } from "@chakra-ui/react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import IconFrame from "../iconFrame";
import { CiLocationOn } from "react-icons/ci";
import { FaBed, FaCar, FaLocationDot, FaShower } from "react-icons/fa6";

interface IPropsCardProperties {
  imageSrc: string;
}

function CardProperties({ imageSrc }: IPropsCardProperties) {
  const iconSize = 16;

  const redirect = (code: number) => {
    window.open(`/imoveis/${code}`, '_blank')
  }

  return (
    <div
      onClick={() => redirect(200)}
      className="flex flex-col h-[800px]  w-full max-w-[370px] m-auto rounded-lg overflow-hidden shadow-lg text-zinc-600 relative cursor-pointer"
    >
      <span className="flex justify-center items-center absolute top-4 left-4 w-[100px] h-[30px] bg-orange-600 text-white font-medium rounded-md z-50">
        Cód: 200
      </span>
      <div className="w-full min-h-[350px] overflow-hidden">
        <Image
          src={imageSrc}
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
        <span className="text-2xl font-medium">Casa</span>
        <div className="flex flex-col w-full mt-6">
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
                <span className="text-zinc-600 font-medium text-sm">4</span>
                <span className="text-xs">Quarto(s)</span>
              </div>
            </span>
            <span className="flex items-center gap-2">
              <IconFrame icon={<FaShower size={iconSize} />} />
              <div className="flex flex-col justify-center items-center">
                <span className="text-zinc-600 font-medium text-sm">2</span>
                <span className="text-xs">Banheiro(s)</span>
              </div>
            </span>
            <span className="flex items-center gap-2 pl-4">
              <IconFrame icon={<FaCar size={iconSize} />} />
              <div className="flex flex-col justify-center items-center">
                <span className="text-zinc-600 font-medium text-sm">3</span>
                <span className="text-xs">Vaga(s)</span>
              </div>
            </span>
          </SimpleGrid>
          <SimpleGrid columns={3} className="mt-6">
            <span className="flex items-center gap-2 text-nowrap">
              <IconFrame icon={<FaBed size={iconSize} />} />
              <div className="flex flex-col justify-center items-center">
                <span className="text-zinc-600 font-medium text-xs">
                  102,00 m²
                </span>
                <span className="text-xs">Área Util</span>
              </div>
            </span>
            <span className="flex items-center gap-2 text-nowrap">
              <IconFrame icon={<FaBed size={iconSize} />} />
              <div className="flex flex-col justify-center items-center">
                <span className="text-zinc-600 font-medium text-xs">
                  102,00 m²
                </span>
                <span className="text-xs">Área Total</span>
              </div>
            </span>
          </SimpleGrid>
        </div>
        <div className="flex flex-col pt-20">
          <span>Valor</span>
          <span className="text-zinc-600 font-medium text-2xl">
            R$ 700.000,00
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