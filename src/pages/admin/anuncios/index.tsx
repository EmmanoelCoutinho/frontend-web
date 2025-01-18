import Actions from '@/components/admin/actions';
import CustomTable from '@/components/customTable';
import DefaultButton from '@/components/defaultButton';
import DefaultTextInput from '@/components/defaultTextInput';
import AdminLayout from '@/layout/adminPageInnerLayout';
import { api } from '@/services/axios';
import { Property } from '@/types/propertiesType';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useState } from 'react';

interface DashboardAnunciosProps {
  propertiesData: Property[];
}

function DashboardAnuncios({ propertiesData }: DashboardAnunciosProps) {
  const router = useRouter();

  const [data, setData] = useState<Property[]>(propertiesData);
  const [filterInput, setFilterInput] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await api.get('/properties');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const headItens = {
    id: 'Código',
    title: 'Título',
    price: 'Preço',
    'Realtor.name': 'Corretor',
    actions: 'Ações',
  };

  const bodyItens = data?.map((property: Property) => {
    return {
      ...property,
      price: formatPrice(property.price),
      actions: (
        <Actions
          reloadFunc={() => getData()}
          page="anuncios"
          propertyId={property.id}
        />
      ),
    };
  });

  const filterData = () => {
    if (filterInput === '') return bodyItens;
    return bodyItens.filter((anuncios) => {
      return (
        anuncios?.title
          ?.toLowerCase()
          ?.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            filterInput
              .toLowerCase()
              ?.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          ) ||
        anuncios?.id
          ?.toString()
          ?.toLowerCase()
          ?.normalize('NFD')
          ?.replace(/[\u0300-\u036f]/g, '')
          ?.includes(
            filterInput
              ?.toLowerCase()
              ?.normalize('NFD')
              ?.replace(/[\u0300-\u036f]/g, '')
          ) ||
        anuncios?.Realtor.name
          .toLowerCase()
          ?.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            filterInput
              .toLowerCase()
              ?.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          )
      );
    });
  };

  console.log(filterInput);

  return (
    <AdminLayout title="Dashboard Anúncios">
      <span className="absolute right-10">
        <DefaultButton
          onClinkFunc={() => router.push('/admin/anuncios/novo')}
          text="Adicionar anúncio"
          orangeSchema
        />
      </span>
      <span className="flex w-full justify-center items-center">
        <DefaultTextInput
          maxWidth={'800px'}
          placeholder="Pesquisar anúncio"
          onChange={(e: any) => setFilterInput(e.target.value)}
        />
      </span>
      <CustomTable
        headItens={headItens}
        bodyItens={filterData()}
        loading={loading}
      />
    </AdminLayout>
  );
}

export default DashboardAnuncios;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies['santos_imoveis.access_token'];

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const response = await api.get('/properties', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      props: {
        propertiesData: response.data as Property[],
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        propertiesData: null,
      },
    };
  }
};
