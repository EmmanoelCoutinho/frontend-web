import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { useRouter } from 'next/router';

function Layout({ children }: { children: any }) {
  const router = useRouter();
  const isAdminPage = router.asPath === '/admin';
  const startsWithAdmin = router.pathname.startsWith('/admin/');

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      {!isAdminPage && <Header startsWithAdmin={startsWithAdmin} />}
      <div
        className={`flex-grow h-full w-full ${
          !isAdminPage && 'pb-16'
        } bg-[#FBFBFA]`}
      >
        {children}
      </div>
      {!isAdminPage && !startsWithAdmin && <Footer />}
    </div>
  );
}

export default Layout;
