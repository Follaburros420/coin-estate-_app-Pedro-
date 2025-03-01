import StyledImage from '@/components/StyedImage';
import clsxm from '@/utils/clsxm';
import React from 'react';

export default function FinancialTab({ nft }) {
  const Financial_Tab_QueryOne_Data = [
    {
      id: 1,
      title: 'Precio de la Propiedad',
      price: nft?.propertyPrice || '$50,000',
    },
    {
      id: 2,
      title: 'Remodelaciones',
      price: nft?.renovations || '$2,000',
    },
    {
      id: 3,
      title: 'Costos Tokenización',
      price: nft?.tokenizationCosts || '$1,000',
    },
    {
      id: 4,
      title: 'Costos Comerciales',
      price: nft?.commercialCosts || '$8.000',
      textColor: '#F0B90B',
    },
    {
      id: 5,
      title: 'Costos Legales',
      price: nft?.legalCosts || '$5,000',
      textColor: '#F0B90B',
    },
  ];

  const Financial_Legal_QueryTwo_Data = [
    {
      id: 1,
      title: 'Debida diligencia',
      price: nft?.dueDiligence || '$270,000',
    },
    {
      id: 2,
      title: 'Reservas financieras',
      price: nft?.financialReserves || '$0',
    },
    {
      id: 3,
      title: '4x1000 y diferencia en cambio',
      price: nft?.difference4x || '$1,000',
    },
    {
      id: 4,
      title: 'Tarifa de Abastecimiento',
      price: nft?.supplyFee || '$0',
    },
    {
      id: 5,
      title: 'Plan Marketing',
      price: nft?.marketingPlan || '$4,000',
    },
  ];

  const Financial_Commercial_QueryThree_Data = [
    {
      id: 1,
      title: 'Ingreso Bruto',
      price: nft?.grossIncome || '34,800',
    },
    {
      id: 2,
      title: 'Administración',
      price: nft?.management || '3,480',
    },
    {
      id: 3,
      title: 'Impuestos',
      price: nft?.taxes || '1,740',
    },
    {
      id: 4,
      title: 'Seguros',
      price: nft?.insurance || '1,044',
    },
    {
      id: 5,
      title: 'Mantenimiento Propiedad',
      price: nft?.propertyMaintenance || '1,700',
    },
    {
      id: 6,
      title: 'Mantenimiento SPV',
      price: nft?.SPVMaintenance || '1,740',
    },
    {
      id: 5,
      title: 'Reserva de Vacancia',
      price: nft?.vacancyReserve || '1,700',
    },
    {
      id: 5,
      title: 'Ingreso Neto',
      price: nft?.netAnualIncome || '1,700',
      imgUrl: '/assets/svg/Exclamation.svg',
    },
  ];
  console.log(nft)


  // nft?.vacancyReserve

  const Financial_Expense_QueryFour_Data = [
    {
      id: 1,
      title: 'Creación de SPV',
      price: nft?.SPVCreation || '$2,000',
    },
    {
      id: 2,
      title: 'Costos de cierre',
      price: nft?.closingCosts || '$0',
    },
  ];
  return (
    <div className='w-full max-w-[1000px] mt-10 overflow-hidden rounded-[8px] grid xl:grid-cols-3 gap-3 xl:gap-5 '>
      <div className='col-span-2 '>
        <div className='w-full p-6 bg-black-1000 rounded-[20px] '>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between text-20 font-bold text-Yellow-100  '>
            <div className='flex items-center gap-2 '>
              <p>Inversión Total:</p>
              <StyledImage src='/assets/svg/Exclamation.svg' className='w-4 h-4 ' />
            </div>
            <p>{nft.totalInvestmentPrice}$</p>
          </div>
          <div className='mt-7'>
            {Financial_Tab_QueryOne_Data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={clsxm(
                    ' py-3  flex items-center justify-between ',
                    idx === 4 ? '' : 'border-b border-b-lightGray-600',
                  )}>
                  <p style={{ color: `${item.textColor}` }} className='font-ubuntu '>
                    {item.title}
                  </p>
                  <p className='text-brown-100 '>${item.price}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className='bg-black-1000 w-full p-6 rounded-[20px] mt-3 '>
          <div className='flex items-center gap-2 '>
            <StyledImage src='/assets/svg/CommercialIcon.svg' className='w-8 h-8 ' />
            <p className='font-bold font-inter text-center text-Yellow-100 text-18 sm:text-20 '>Commercial</p>
          </div>
          <div className='mt-10'>
            {Financial_Legal_QueryTwo_Data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={clsxm(
                    ' py-3  flex items-center justify-between ',
                    idx === 4 ? '' : 'border-b border-b-lightGray-600',
                  )}>
                  <p style={{ color: `${item.textColor}` }} className='font-ubuntu '>
                    {item.title}
                  </p>
                  <p className='text-brown-100 '>${item.price}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='xl:col-span-1 col-span-2 '>
        <div className='bg-black-1000 w-full p-6 rounded-[20px] '>
          <div className='flex items-center gap-2 '>
            <StyledImage src='/assets/images/FinancialExpense.png' className='w-8 h-8 ' />
            <p className='font-bold font-inter text-center text-Yellow-100 text-18 sm:text-20 '>Información de Renta</p>
          </div>
          <div className='mt-7'>
            {Financial_Commercial_QueryThree_Data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={clsxm(
                    ' py-3  flex items-center justify-between ',
                    idx === 7 ? '' : 'border-b border-b-lightGray-600',
                  )}>
                  <div className='flex items-center gap-2'>
                    <p style={{ color: `${item.textColor}` }} className='font-ubuntu '>
                      {item.title}
                    </p>
                    {item.imgUrl && <StyledImage src={item.imgUrl} className='w-4 h-4' />}
                  </div>
                  <p className='text-white '> {item.price && '$' + item.price}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className='bg-black-1000 w-full p-6 rounded-[20px] mt-3 '>
          <div className='flex items-center gap-2 '>
            <StyledImage src='/assets/svg/LegalIcon.svg' className='w-8 h-8 ' />
            <p className='font-bold font-inter text-center text-Yellow-100 text-18 sm:text-20 '>Legal</p>
          </div>
          <div className='mt-9'>
            {Financial_Expense_QueryFour_Data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={clsxm(
                    ' py-3  flex items-center justify-between ',
                    idx === 7 ? '' : 'border-b border-b-lightGray-600',
                  )}>
                  <div className='flex items-center gap-2'>
                    <p style={{ color: `${item.textColor}` }} className='font-ubuntu '>
                      {item.title}
                    </p>
                    {item.imgUrl && <StyledImage src={item.imgUrl} className='w-4 h-4' />}
                  </div>
                  <p className='text-brown-100 '>${item.price}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
