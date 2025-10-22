import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FAQ_ITEMS = [
  {
    id: 1,
    question: '¿De dónde vienen mis rendimientos y cuándo empiezo a ganar?',
    answer:
      'Tus rendimientos provienen de los ingresos netos generados por el alquiler del inmueble. El inicio de los beneficios depende del tipo de proyecto (remodelación o ya rentando) y de la estabilización de la propiedad para alcanzar flujos constantes.',
  },
  {
    id: 2,
    question: '¿Qué derechos tengo sobre el inmueble como inversionista?',
    answer:
      'Participas mediante un contrato de cuentas en participación, lo que te otorga derechos económicos sobre los beneficios sin asumir la titularidad directa del inmueble.',
  },
  {
    id: 3,
    question: '¿Esto es legal?',
    answer:
      '¡Por supuesto! Cumplimos con la normativa en Colombia y Estados Unidos para ofrecer un modelo transparente y seguro. Puedes encontrar más información en la sección Legal de la plataforma.',
  },
  {
    id: 4,
    question: '¿Puedo vender o ceder mi participación?',
    answer:
      'Depende de las condiciones de cada proyecto. Si deseas vender o ceder tu participación, nos encargamos de ayudarte a encontrar un comprador dentro de la comunidad, respetando los filtros de seguridad y verificación KYC.',
  },
  {
    id: 5,
    question: '¿Existe un tiempo mínimo de permanencia?',
    answer:
      'Sí. Cada proyecto define un plazo mínimo para garantizar la estabilidad operativa y el cumplimiento del plan financiero. Revisa siempre el contrato antes de invertir.',
  },
  {
    id: 6,
    question: '¿Quién administra la propiedad?',
    answer:
      'CoinEstate o aliados especializados se encargan de la operación, desde la gestión de arrendatarios hasta el mantenimiento y comercialización, siguiendo lo estipulado en cada proyecto.',
  },
  {
    id: 7,
    question: '¿Quién define dónde se invierte?',
    answer:
      'Nuestro equipo realiza análisis exhaustivos del mercado para seleccionar oportunidades con el mejor potencial. Tú eliges en cuáles proyectos participar dentro de esas opciones validadas.',
  },
  {
    id: 8,
    question: '¿Qué pasa si la propiedad queda vacante?',
    answer:
      'Trabajamos con estrategias de marketing y gestión activa para minimizar la vacancia. En caso de presentarse, contamos con reservas operativas y planes de mitigación para proteger los rendimientos proyectados.',
  },
];

export default function FAQ() {
  return (
    <section className='px-6 py-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start'>
          {/* Card de información mejorada con Shadcn/UI */}
          <Card className='rounded-[32px] border-gray-200/60 bg-white/95 shadow-[0_45px_120px_-70px_rgba(15,23,42,0.35)] dark:border-gray-700/60 dark:bg-black-900/60 dark:shadow-[0_45px_120px_-80px_rgba(0,0,0,0.6)]'>
            <CardHeader className="p-8">
              <Badge 
                variant="outline" 
                className='mb-4 bg-yellow/15 text-yellow/80 dark:bg-yellow/10'
              >
                Preguntas frecuentes
              </Badge>
              <CardTitle className='text-28 font-extrabold leading-tight text-black-100 dark:text-white lg:text-36'>
                Todo lo que necesitas saber antes de invertir
              </CardTitle>
              <p className='text-16 leading-7 text-black-100/70 dark:text-white/70'>
                Si tienes dudas adicionales, nuestro equipo de soporte está listo para acompañarte en cada paso.
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <Card className='rounded-[24px] border-yellow/20 bg-yellow/10 p-6 text-14 text-black-100/80 dark:border-yellow/25 dark:bg-yellow/10 dark:text-white/80'>
                <CardContent className="p-0">
                  <h3 className='text-16 font-semibold text-black-100 dark:text-white'>Acompañamiento experto</h3>
                  <p className='mt-2'>Agenda una sesión personalizada para revisar tu plan de inversión ideal.</p>
                  <a
                    href='mailto:ayuda@coinestate.com.co'
                    className='mt-4 inline-flex items-center gap-2 text-14 font-semibold text-black-100 underline decoration-yellow decoration-2 underline-offset-4 dark:text-white'
                  >
                    ayuda@coinestate.com.co
                  </a>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          
          {/* Accordion mejorado con Shadcn/UI */}
          <div className='space-y-4'>
            <Accordion type="single" collapsible defaultValue="1" className="w-full">
              {FAQ_ITEMS.map((item) => (
                <AccordionItem 
                  key={item.id} 
                  value={item.id.toString()}
                  className='rounded-[24px] border-gray-200/70 bg-white shadow-[0_30px_80px_-70px_rgba(15,23,42,0.35)] transition hover:border-yellow/50 dark:border-gray-700/60 dark:bg-black-900/60 dark:shadow-[0_35px_100px_-80px_rgba(0,0,0,0.6)]'
                >
                  <AccordionTrigger className='px-6 py-5 text-left text-15 font-semibold text-black-100 dark:text-white hover:no-underline'>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className='px-6 pb-6 text-14 leading-6 text-black-100/70 dark:text-white/70'>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
