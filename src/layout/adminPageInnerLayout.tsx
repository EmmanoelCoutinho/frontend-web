import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/router';
import React from 'react';
import { useMediaQuery } from '@chakra-ui/react';

function AdminLayout({
  children,
  title,
  infinity,
}: {
  children: any;
  title: string;
  infinity?: boolean;
}) {
  const router = useRouter();

  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <div className="flex w-full h-full justify-center items-center pt-10">
      <div
        className={`flex flex-col gap-6 w-[90vw] ${
          infinity ? 'h-full' : 'h-[90vh]'
        } p-10 bg-white rounded-xl shadow-lg relative`}
      >
        <span
          onClick={() => router.back()}
          className="absolute left-10 flex gap-1 font-medium text-orange-600 justify-center items-center cursor-pointer"
        >
          <IoIosArrowBack size={24} />
          Voltar
        </span>
        <h1
          style={{ marginTop: isMobile ? '4rem' : '0rem' }}
          className="flex w-full justify-center text-xl uppercase font-medium"
        >
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
