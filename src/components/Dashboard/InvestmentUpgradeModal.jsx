import React from 'react';

const InvestmentUpgradeModal = ({ onUpgrade, onContinue }) => {
  return (
    <div className='fixed glass inset-0 z-50 flex overflow-auto py-10 items-center justify-center bg-black bg-opacity-50 px-4'>
      <div className=' rounded-lg bg-black-800  rounded-2xl shadow-lg max-w-lg w-full p-6 md:p-8'>
        <h2 className='text-xl font-bold text-center text-gray-800 mb-4'>¡Tu inversión está casi lista!</h2>
        <p className='text-gray-700  mb-6'>
          Puedes continuar con tu inversión actual sin problema.
          <br />
          <strong>
            Pero si inviertes al menos <span className='text-green-600 text-yellow'>500.000 COP</span>,
          </strong>{' '}
          desbloqueas acceso inmediato al grupo exclusivo de <strong>CoinStarters Platino</strong>
        </p>

        <ul className='text-gray-700 space-y-4 mb-8'>
          <li>
            🔸 <strong className='text-yellow'>Acompañamiento personal 24/7 del equipo fundador</strong>
            <br />
            Accede a una relación directa con el equipo ejecutivo de CoinEstate (sin asesores intermedios), para
            resolver cualquier duda e incluso guiarte en temas de finanzas personales.
          </li>
          <li>
            🔸 <strong className='text-yellow'>Contacto directo con el equipo fundador</strong>
            <br />
            Conéctate con quienes diseñan la plataforma y conoce de primera mano nuestra visión.
          </li>
          <li>
            🔸 <strong className='text-yellow'>Información prioritaria de nuevos lanzamientos </strong>
            <br />
            Sé el primero en enterarte de los próximos proyectos antes de su apertura al público.
          </li>
          <li>
            🔸 <strong className='text-yellow'>Particiación en la definición de proyectos</strong>
            <br />
            Comparte tus ideas y preferencias para ayudar a moldear la oferta de CoinEstate.
          </li>
          <li>
            🔸 <strong className='text-yellow'>Invitaciones a eventos exclusivos</strong>
            <br />
            Accede a encuentros privados –virtuales o presenciales– donde interactúas con otros inversores Platino.
          </li>
          <li>
            Únete a una comunidad de inversores comprometidos y mantente siempre un paso adelante en las oportunidades
            de tokenización.
          </li>
        </ul>

        <div className='flex flex-col md:flex-row text-xs gap-4'>
          <button
            onClick={onUpgrade}
            className='w-full bg-yellow hover:bg-green-700 text-black-100 font-semibold py-2 px-2 rounded-md transition'>
            Sí, quiero ser CoinStarter Platino (Ajustar inversión a 500,000 COP)
          </button>
          <button
            onClick={onContinue}
            className='w-full bg-gray-100 bg-black-700 text-gray-800 font-medium py-2 px-4 rounded-md transition'>
            Continuar con mi inversión actual
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentUpgradeModal;
