import { useMutateLogout } from '@/hooks/mutation';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function VerificationPrompt({ onContinue, isLoadingEmail }) {
  const router = useRouter();
  const { mutate: mutateLogout } = useMutateLogout()


  const onVerify = () => {
    router.push('/auth/create-account');
    mutateLogout();
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100'>
      <div className='bg-white shadow-2xl rounded-lg p-6 pt-10 w-full max-w-xl text-center'>
        <Image
          src='/assets/images/model/verify.png' // You can replace this with any image in your public folder
          alt='Verification Illustration'
          width={200}
          height={200}
          className='mx-auto mb-4'
        />
        <h2 className='text-lg font-semibold text-gray-800 mb-3'>¿Confirmas que ingresaste los datos sin errores?</h2>
        <p className='text-gray-600 mb-10'>
        Revisar tus datos ahora te ayudará a evitar tener que corregirlos más adelante
        </p>

        <div className='flex gap-4 justify-center'>
          <button
            onClick={onVerify}
            className='bg-black-100 hover:bg-gray-dark text-white px-4 py-2 rounded-md w-full transition'>
            No, verify
          </button>
          <button
            onClick={onContinue}
            disabled={isLoadingEmail}
            className='bg-green-500 hover:bg-yellow border hover:font-bold px-4 py-2 rounded-md transition w-full'>
            {isLoadingEmail ? 'Loading...' : 'Yes, continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
