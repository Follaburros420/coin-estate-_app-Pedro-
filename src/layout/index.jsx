import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className='flex min-h-screen flex-col bg-[var(--background)] transition-colors duration-300'>
      <div className='flex-1 w-full'>
        <Navbar />
        <main className='bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300'>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
