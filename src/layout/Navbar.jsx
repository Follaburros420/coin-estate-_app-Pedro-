'use client';
import { Navbar_Links } from '@/_mock/data';
import ProfileUser from '@/components/ProfileUser';
import StyledImage from '@/components/StyedImage';
import { useTheme } from '@/context/ThemeContext';
import clsxm from '@/utils/clsxm';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme, isMounted } = useTheme();

  const path = usePathname();
  const router = useRouter();

  const handleNavigate = (href) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const themeLabel = !isMounted ? 'Tema' : theme === 'dark' ? 'Modo claro' : 'Modo oscuro';

  return (
    <nav className='sticky top-0 z-50 border-b border-gray-200/60 bg-white/90 backdrop-blur-xl dark:border-gray-800/60 dark:bg-black-800/80'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:py-4'>
        <button
          onClick={() => handleNavigate('/')}
          className='flex items-center gap-2'
          aria-label='Ir al inicio'
        >
          <StyledImage src='/assets/svg/coinEstateLogo.svg' className='h-9 w-[153px]' alt='CoinEstate' />
        </button>
        <div className='hidden flex-1 items-center justify-center gap-2 sm:flex md:gap-6'>
          {Navbar_Links.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={clsxm(
                'relative px-1 text-14 font-semibold text-black-100 transition-colors duration-200 hover:text-yellow dark:text-white dark:hover:text-yellow',
                path === item.path && 'text-yellow'
              )}
            >
              {item.title}
              {path === item.path && <span className='absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-yellow' />}
            </Link>
          ))}
        </div>
        <div className='hidden items-center gap-3 sm:flex'>
          <button
            type='button'
            onClick={handleToggleTheme}
            className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/70 bg-white text-black-100 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.5)] transition hover:-translate-y-[1px] hover:shadow-[0_20px_45px_-25px_rgba(15,23,42,0.45)] dark:border-gray-700 dark:bg-black-700 dark:text-white'
            aria-label={themeLabel}
            title={themeLabel}
          >
            {isMounted && theme === 'dark' ? (
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M12 3v1.5M12 19.5V21M4.219 4.219l1.06 1.06M18.721 18.721l1.06 1.06M3 12h1.5M19.5 12H21M4.219 19.781l1.06-1.06M18.721 5.279l1.06-1.06M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'
                  stroke='currentColor'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            ) : (
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M21 12.79A9 9 0 1 1 11.21 3a6.5 6.5 0 0 0 9.79 9.79Z'
                  stroke='currentColor'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </button>
          <div className='hidden lg:flex'>
            <ProfileUser />
          </div>
        </div>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className='flex h-11 w-11 items-center justify-center rounded-full border border-gray-200/80 bg-white text-black-100 shadow-[0_15px_35px_-25px_rgba(15,23,42,0.45)] dark:border-gray-700 dark:bg-black-700 dark:text-white sm:hidden'
          type='button'
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        >
          <span className='sr-only'>{isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
          <span
            aria-hidden='true'
            className={clsxm(
              'block h-0.5 w-6 rounded-full bg-black-100 transition-transform duration-200 dark:bg-white',
              isMenuOpen && 'translate-y-[6px] rotate-45'
            )}
          />
          <span
            aria-hidden='true'
            className={clsxm(
              'mt-1 block h-0.5 w-6 rounded-full bg-black-100 transition-opacity duration-200 dark:bg-white',
              isMenuOpen && 'opacity-0'
            )}
          />
          <span
            aria-hidden='true'
            className={clsxm(
              'mt-1 block h-0.5 w-6 rounded-full bg-black-100 transition-transform duration-200 dark:bg-white',
              isMenuOpen && '-translate-y-[6px] -rotate-45'
            )}
          />
        </button>
      </div>
      {isMenuOpen && (
        <div className='border-t border-gray-200/70 bg-white/95 px-4 pb-6 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-gray-700 dark:bg-black-800/90 sm:hidden'>
          <div className='flex flex-col gap-2 py-4'>
            {Navbar_Links.map((item) => (
              <button
                key={item.id}
                type='button'
                onClick={() => handleNavigate(item.path)}
                className={clsxm(
                  'w-full rounded-full px-4 py-3 text-left text-14 font-semibold text-black-100 transition-colors duration-150 hover:bg-gray-200/70 dark:text-white dark:hover:bg-black-700',
                  path === item.path && 'bg-gray-200/90 text-yellow dark:bg-black-700/80'
                )}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className='flex flex-col gap-3'>
            <button
              type='button'
              onClick={handleToggleTheme}
              className='flex items-center justify-center gap-2 rounded-full border border-gray-200/80 px-4 py-3 text-14 font-semibold text-black-100 dark:border-gray-700 dark:text-white'
            >
              {themeLabel}
              <span className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow/20 text-yellow'>
                {isMounted && theme === 'dark' ? '☀' : '🌙'}
              </span>
            </button>
            <button
              type='button'
              onClick={() => handleNavigate('/auth/create-account')}
              className='w-full rounded-full border border-black-100 px-4 py-3 text-14 font-semibold text-black-100 dark:border-white dark:text-white'
            >
              Regístrate
            </button>
            <button
              type='button'
              onClick={() => handleNavigate('/auth/log-in')}
              className='w-full rounded-full bg-yellow px-4 py-3 text-14 font-semibold text-black-100'
            >
              Ingresa
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
