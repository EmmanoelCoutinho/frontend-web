import { MdLocalLaundryService, MdKitchen, MdWeekend, MdAcUnit, MdOutdoorGrill, MdBalcony, MdFitnessCenter, MdPool, MdRoomService, MdOutlineElevator, MdSecurity, MdPets, MdCelebration } from 'react-icons/md';
import { FaBed, FaBuildingShield } from 'react-icons/fa6';
import { GiPartyPopper } from 'react-icons/gi';

export const numbersOptions = [
  { title: '0', value: 0 },
  { title: '1', value: 1 },
  { title: '2', value: 2 },
  { title: '3', value: 3 },
  { title: '4', value: 4 },
  { title: '5 ou mais', value: 5 },
];

export const propertyFeatures = [
  {
    title: 'Área de Serviço',
    value: 'serviceArea',
    Icon: MdLocalLaundryService,
  },
  { title: 'Armários nos Quartos', value: 'bedroomClosets', Icon: FaBed },
  { title: 'Armários na Cozinha', value: 'kitchenCabinets', Icon: MdKitchen },
  { title: 'Mobiliado', value: 'furnished', Icon: MdWeekend },
  { title: 'Ar Condicionado', value: 'airConditioning', Icon: MdAcUnit },
  { title: 'Churrasqueira', value: 'barbecueGrill', Icon: MdOutdoorGrill },
  { title: 'Varanda', value: 'balcony', Icon: MdBalcony },
  { title: 'Academia', value: 'gym', Icon: MdFitnessCenter },
  { title: 'Piscina', value: 'swimmingPool', Icon: MdPool },
  { title: 'Quarto de Serviço', value: 'serviceRoom', Icon: MdRoomService },
];

export const condoFeatures = [
  {
    title: 'Condomínio Fechado',
    value: 'gatedCommunity',
    Icon: FaBuildingShield,
  },
  { title: 'Elevador', value: 'elevator', Icon: MdOutlineElevator },
  { title: 'Segurança 24h', value: 'security24h', Icon: MdSecurity },
  { title: 'Portaria', value: 'concierge', Icon: MdRoomService },
  { title: 'Animais Permitidos', value: 'petsAllowed', Icon: MdPets },
  { title: 'Academia', value: 'gym', Icon: MdFitnessCenter },
  { title: 'Piscina', value: 'swimmingPool', Icon: MdPool },
  { title: 'Salão de Festas', value: 'partyHall', Icon: GiPartyPopper },
];

