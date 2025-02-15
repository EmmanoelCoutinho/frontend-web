import DefaultButton from '@/components/defaultButton';
import FilterDrawer from '@/components/filtersDrawer';
import { navbarItems, navbarAdminItems } from '@/constants/layout/navBarItems';
import { NavbarItemsConfig } from '@/types/constants/navbarItemsInterface';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import { FaBars } from 'react-icons/fa';

interface HeaderProps {
  startsWithAdmin: boolean;
}

function Header({ startsWithAdmin }: HeaderProps) {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');

  const navbarButtons = startsWithAdmin ? navbarAdminItems : navbarItems;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAsideMenu,
    onOpen: onOpenAsideMenus,
    onClose: onCloseAsideMenu,
  } = useDisclosure();

  const template = isLargerThan1024 ? '20% 1fr 20%' : '30% 1fr 40%';

  // console.log(errors);

  return (
    <>
      <SimpleGrid
        templateColumns={template}
        columns={3}
        className="h-16 bg-white text-orange-600 font-medium"
      >
        {isLargerThan1024 ? (
          <Flex
            w={'100%'}
            maxW={'200px'}
            justifyContent={'center'}
            alignItems={'center'}
            color={'orange'}
          >
            <Image w={16}  src={'/logo-si.png'} alt="Logo SantosNeves" />
          </Flex>
        ) : (
          <Button
            onClick={onOpenAsideMenus}
            className="flex w-14 h-10 rounded-lg text-white bg-orange-600 my-auto ml-4"
          >
            <FaBars size={22} />
          </Button>
        )}
        {isLargerThan1024 ? (
          <Flex
            justifyContent={'center'}
            w={'100%'}
            alignItems={'center'}
            gap={50}
          >
            {navbarButtons.map((navItem: NavbarItemsConfig, index) => (
              <Text
                key={index}
                onClick={() => window.open(navItem.link, '_blank')}
                cursor={'pointer'}
                className="text-lg font-medium text-orange-600 hover:text-[#580CEA] text-nowrap"
              >
                {navItem.title}
              </Text>
            ))}
          </Flex>
        ) : (
          <span></span>
        )}
        <Flex
          w={'100%'}
          justifyContent={'flex-end'}
          alignItems={'center'}
          pr={isLargerThan1024 ? 8 : 4}
        >
          {!startsWithAdmin ? (
            // <DefaultButton
            //   onClinkFunc={onOpen}
            //   text="Buscar Imóvel"
            //   maxWidth={200}
            //   isSearchButton
            //   orangeSchema
            // />
            <></>
          ) : (
            <div className="relative flex w-12 h-12 bg-red-500 rounded-full overflow-hidden">
              <Image
                alt='Imagem admin'
                src={
                  'https://res.cloudinary.com/dn9g7il79/image/upload/v1731773532/temp-listing-images/bsvlzplbmp4ojcqhmgf0.jpg'
                }
                style={{
                  objectFit: 'cover',
                }}
                width={'100%'}
                height={'100%'}
              />
            </div>
          )}
        </Flex>
      </SimpleGrid>
      <FilterDrawer isOpen={isOpen} onClose={onClose} />
      <Drawer
        isOpen={isOpenAsideMenu}
        placement="left"
        onClose={onCloseAsideMenu}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex
              w={'100%'}
              maxW={'200px'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              color={'orange'}
            >
              <Image w={16} src={'/logo-si.png'} alt="Logo SantosNeves" />
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <div className="flex flex-col w-full h-full gap-4">
              {navbarItems.map((navItem: NavbarItemsConfig, index) => (
                <Text
                  key={index}
                  onClick={() => window.open(navItem.link, '_blank')}
                  cursor={'pointer'}
                  className="text-lg font-medium text-orange-600 hover:text-[#580CEA] text-nowrap"
                >
                  {navItem.title}
                </Text>
              ))}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
