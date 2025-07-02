import { redirectWhatsapp } from '@/utils/redirectWhatsapp';
import { Image } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa6';
import { GiTalk } from 'react-icons/gi';
import { IoLogoInstagram } from 'react-icons/io5';
import { LuMailPlus } from 'react-icons/lu';

function Footer() {
  const handleClickEmail = () => {
    const mailtoLink = `mailto:santosnevesimoveis3@gmail.com`;
    window.location.href = mailtoLink;
  };

  return (
    <div>
      <div className="grid grid-cols-3 bg-gray-800 p-4 w-full  z-10 text-white font-medium">
        <div className="flex justify-center items-center">
          <Image
            src={'/logo-si.png'}
            style={{ objectFit: 'cover' }}
            width={'48px'}
            height={'48px'}
            alt="Logo SantosImóveis"
          />
        </div>

        <div className="flex justify-center items-center gap-6 invisible lg:visible">
          <span
            onClick={() => redirectWhatsapp()}
            className="flex gap-1 justify-center items-center cursor-pointer"
          >
            <FaWhatsapp />
            (91) 9 8199-9538
          </span>
          <span
            onClick={() => redirectWhatsapp()}
            className="flex gap-1 justify-center items-center cursor-pointer"
          >
            <GiTalk />
            Atendimento Online
          </span>
        </div>

        <div className="flex justify-center items-center gap-4">
          <span
            onClick={() => redirectWhatsapp()}
            className="flex bg-gray-500 p-2 rounded hover:bg-orange-600 cursor-pointer transition duration-300 ease-in-out transform lg:hidden"
          >
            <FaWhatsapp size={20} />
          </span>

          <span
            onClick={() => handleClickEmail()}
            className="bg-gray-500 p-2 rounded hover:bg-orange-600 cursor-pointer transition duration-300 ease-in-out transform"
          >
            <LuMailPlus size={20} />
          </span>
          <span
            onClick={() => {
              window.open(
                'https://www.instagram.com/santos_imobiliaria07',
                '_blank'
              );
            }}
            className="bg-gray-500 p-2 rounded hover:bg-orange-600 cursor-pointer transition duration-300 ease-in-out transform"
          >
            <IoLogoInstagram size={20} />
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 md:gap-0 md:grid md:grid-cols-2 py-2 text-xs text-white bg-gray-800">
        <span className="flex gap-2 md:pl-14 items-center">
          <span>Versão 02.07</span>
          <span>|</span>
          ©2024-2025 Santos Imóveis. Todos os direitos reservados.
        </span>
        <span className="flex justify-end md:pr-14 items-center">
          Desenvolvido por: ZepiSoftware
        </span>
      </div>
    </div>
  );
}

export default Footer;
