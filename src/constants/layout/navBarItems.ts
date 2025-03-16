import { NavbarItemsConfig } from "@/types/constants/navbarItemsInterface";

export const navbarItems: NavbarItemsConfig[] = [
  { title: 'Início', link: '/' },
  { title: 'Imóveis', link: '/imoveis?page=1' },
  { title: 'Quero vender', link: '/contato?sell=1' },
  { title: 'Contato', link: '/contato' },
];

export const navbarAdminItems:NavbarItemsConfig[] = [
  {title: 'Anúncios', link: '/admin/anuncios'},
  {title: 'Corretores', link: '/admin/corretores'},
  {title: 'Voltar ao Site', link: '/'}
]
