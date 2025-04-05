/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import WorksTopBanner from "../WorksTopBanner";
import StyledImage from "../StyedImage";
import { Guide_Investing_Data, Legal_Models_Data } from "@/_mock/data";
import RegisterBottomBanner from "../RegisterBottomBanner";
import { useRouter } from "next/router";

export default function LegalModels() {
  const router = useRouter()
  const [isBrowser, setIsBrowser] = useState(false);

  // Ensure the document is available only in the browser
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const scrollToSection = (id) => {
    if (isBrowser) {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <WorksTopBanner
        heading={"Entendiendo el Proceso Legal de  inversión Inmobiliaria en"}
        coinEstateTitle={"CoinEstate"}
        desc={
          "Nuestro modelo de tokenización de inmuebles busca garantizar seguridad y transparencia  inversores, siempre con miras al acceso demicratizado. Con una estructura clara y respaldada por principios legales tanto en Colombia como en Estados Unidos, a continuación, se detallan todos los aspectos legales involucrados:"
        }
      />
      <div className="px-6 sm:px-10 my-10 sm:my-20  ">
        <div className="w-full max-w-[1161px] mx-auto font-inter ">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 w-full ">
            <div className="w-full max-w-[520px] text-center md:text-start ">
              <p className="text-28 sm:text-36 font-bold leading-none ">
                Aspectos Legales
              </p>
              <p className="mt-10 text-gray font-medium ">
                A continuación te presentamos algunos aspectos legales generales
                del negocio. Ten en cuenta que, debido a la naturaleza
                particular de cada proyecto, pueden existir diferencias con lo
                aquí expuesto. Es fundamental que, al momento de invertir,
                comprendas los aspectos específicos de cada proyecto, incluyendo
                el Contrato y los{" "}
                <span className="text-blue-100 "> Términos y Condiciones.</span>{" "}
                Te invitamos también a leer detenidamente nuestros Términos y
                Condiciones relacionados con el uso de la plataforma, ademas de
                nuestra
                <span className="text-blue-100 ">
                  {" "}
                  Politica de Manejo de Datos.
                </span>{" "}
              </p>
            </div>
            <img
              src="/assets/images/team/asp.png"
              className="w-full max-w-[482px] object-cover"
            />
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-6 mt-10 lg:mt-16 ">
            <div className="w-full lg:max-w-[371px] ">
              {Legal_Models_Data.map((item, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(item.scrollTo)}
                    className="flex items-center justify-between focus:outline-none gap-5 bg-[#ffffff] py-2 my-4 shadow-md rounded-[4px] p-4 w-full text-start "
                  >
                    <p className="text-12 truncate sm:text-14 font-medium text-lightGray-300 ">
                      {item.title}
                    </p>
                    <StyledImage
                      src="/assets/svg/downArrow.svg"
                      className="w-full max-w-6 h-6 "
                    />
                  </button>
                );
              })}
            </div>
            <div className="bg-white shadow-md p-4 sm:p-6 rounded-[8px] w-full text-center sm:text-start ">
              <div className="text-14 font-medium font-inter text-gray ">
                <p>
                  Somos <span className="text-Yellow-200 ">CoinEstate,</span>{" "}
                  una empresa legalmente constituida en Colombia. Gracias a
                  nuestra plataforma y a un modelo de negocio colaborativo,
                  reunimos virtualmente personas sin necesidad de que se
                  conozcan entre sí, con la finalidad de adquirir inmuebles en
                  los Estados Unidos para posteriormente remodelarlos y así
                  obtener beneficios derivados de la plusvalía por remodelación
                  y las rentas que genere el arriendo. Con nuestro negocio
                  permitimos que cualquier persona acceda a uno de los mejores
                  mercados en el sector inmobiliario, invirtiendo desde poco y
                  sin necesidad de ser un inversor inmobiliario experto.
                </p>
                <p>
                   La propiedad fraccionada es un negocio tradicional, el cual
                  ha venido realizándose desde hace tiempo. Lo que nos destaca
                  por encima de nuestros competidores del mismo mercado
                  principalmente son nuestras asociaciones estratégicas en los
                  Estados Unidos y el uso de tecnología que permite la
                  digitalización del proyecto de forma eficiente y segura,
                  representando así los derechos económicos en formato de tokens
                  criptográficos, los cuales se despliegan en la blockchain
                  gracias a Contratos Inteligentes.
                </p>
                <p>
                  Sabemos que no existe mejor publicidad que un usuario feliz
                  😀, es por esto que nuestro modelo de negocio se encuentra
                  delicadamente pensado para que nuestros inversionistas no
                  tengan preocupación alguna sobre sus inversiones y puedan
                  monitorearlas desde la plataforma en todo momento. Recuerda
                  que todas tus inversiones se encontrarán respaldadas por un
                  activo del mundo real y una empresa legalmente constituida,
                  cumpliendo siempre con la normativa tanto legal como
                  tributaria. A continuación te explicamos un poco más:
                </p>
                <button onClick={()=>router.push('/auth/create-account')} className="mt-6 font-semibold font-inter py-3 px-8 bg-Yellow-200 rounded-full text-white ">
                  Regístrate
                </button>
              </div>
              <div className="mt-5 " id="section1">
                <p className="font-inter font-bold ">Estructura societaria</p>
                <p className="text-14 font-medium font-inter text-gray mt-4  ">
                  Para poder llevar a cabo el negocio, nuestro equipo de
                  expertos determinó que la forma mas eficiente que permite el
                  acceso democratizado a este tipo de inversiones (anteriormente
                  reservadas para pocos) es mediante la creación de un Special
                  Purpose Vehicle (SPV) o por sus siglas en inglés “Vehículo de
                  Propósito Especial”, el cual básicamente es una S.A.S. Por
                  medio de dicha sociedad el negocio será llevado a cabo, pues
                  esta es creada con la única finalidad de ostentar la propiedad
                  sobre el inmueble, lo cual nos permite representar los
                  derechos sobre el proyecto para así posteriormente ofrecerte
                  la oportunidad de invertir en remodelaciones de viviendas en
                  los Estados Unidos.
                </p>
              </div>
              <div className="mt-5 " id="section2">
                <p className="font-inter font-bold ">
                  Contrato de cuentas en participación
                </p>
                <p className="text-14 font-medium font-inter text-gray mt-4  ">
                  La financiación para la adquisición del inmueble se realiza
                  mediante un contrato de cuentas en participación, en el que la
                  S.A.S actúa como gestor activo y los inversores se convierten
                  en socios ocultos. Este tipo de contrato es regulado por el
                  Código de Comercio Colombiano, que establece los derechos y
                  obligaciones de las partes. En este caso la S.A.S es
                  responsable de toda la gestión, desde la adquisición del
                  inmueble, la administración, el mantenimiento y la gestión de
                  los ingresos generados (alquileres, revalorización, etc.). La
                  S.A.S también tiene la obligación de proporcionar informes
                  periódicos sobre el estado de la inversión y los ingresos
                  generados a los socios ocultos, es decir a nuestros
                  inversores. El hecho de que nuestros inversionistas sean
                  considerados como socios ocultos significa que no aparecen en
                  registros públicos ni tienen responsabilidades legales
                  directas sobre la propiedad del inmueble, sin embargo, tienen
                  derechos económicos sobre los beneficios generados por el
                  proyecto, según el porcentaje de participación que
                  corresponda.
                </p>
              </div>
              <div className="mt-5 " id="section3">
                <p className="font-inter font-bold ">
                  Derechos de los inversores
                </p>
                <p className="text-14 font-medium font-inter text-gray mt-4  ">
                  Los inversores no ostentan la propiedad directa del inmueble,
                  ya que la sociedad se crea con ese único fin. Pero aun así
                  tienen participación económica en los beneficios y el valor de
                  del bien inmueble. Esto quiere decir que los inversores tienen
                  derecho a recibir su parte proporcional de los ingresos
                  generados por la propiedad, incluyendo alquileres y la posible
                  revalorización. Estos derechos se encuentran estipulados en el
                  contrato de cuentas en participación que corresponda al
                  proyecto en particular, dicho contrato regula temas como la
                  distribución de beneficios y otros derechos y obligaciones del
                  inversionista. Sumado a lo anterior, CoinEstate no puede
                  libremente disponer del bien inmueble, por lo que en eventos
                  clave del negocio como la venta del activo, constitución de
                  gravámenes, etc.. Será el inversor quien decida por medio de
                  su voto el rumbo que el negocio debe tomar.
                </p>
              </div>
              <div className="mt-5 " id="section4">
                <p className="font-inter font-bold ">
                  Contratos Inteligentes y tokenización
                </p>
                <div className="text-14 font-medium font-inter text-gray mt-4  ">
                  <p>
                    La tokenización es un pilar fundamental en nuestra misión de
                    democratizar el acceso al mercado inmobiliario. Mediante
                    este proceso, transformamos las participaciones de proyectos
                    inmobiliarios en tokens digitales, lo que nos permite
                    automatizar y simplificar procedimientos clave como la
                    emisión y transferencia de dichas participaciones.
                  </p>
                  <p>
                    Nuestros contratos inteligentes están desarrollados y
                    desplegados en la cadena de bloques o blockchain, siendo
                    esta tecnología de registro distribuido la que hace posible
                    la existencia de los tokens criptográficos que representan
                    los derechos económicos. Esto permite que todas las
                    transacciones sean inmutables, seguras y verificables en
                    todo momento. Dichos contratos inteligentes funcionan de
                    manera autónoma: se ejecutan automáticamente cuando se
                    cumplen ciertas condiciones predefinidas, eliminando la
                    necesidad de intermediarios y reduciendo costos operativos.
                  </p>
                  <p>
                    Además, al representar las participaciones inmobiliarias en
                    forma de tokens, abrimos la puerta a un mercado secundario
                    líquido y disponible en todo el mundo 24/7, lo cual permite
                    a los inversores comprar y vender sus participaciones de
                    manera flexible, brindándoles mayor control sobre sus
                    inversiones y facilitando la diversificación de sus
                    carteras.
                  </p>
                </div>
              </div>
              <div className="mt-5 " id="section5">
                <p className="font-inter font-bold ">
                  Cumplimiento regulatorio
                </p>
                <div className="text-14 font-medium font-inter text-gray mt-4  ">
                  <p>
                    Nos encontramos comprometidos con el cumplimiento de todas
                    las regulaciones legales y fiscales en los países donde
                    operamos. Entendemos que la confianza de nuestros inversores
                    se basa en la transparencia y la seguridad jurídica de
                    nuestras operaciones. Por lo que a continuación te
                    presentamos algunos factores relevantes con el cumplimiento
                    regulatorio tanto en Estados Unidos como en Colombia:
                  </p>
                  <p className="mt-6 ">
                    En Estados Unidos damos Cumplimiento estricto a las Leyes
                    Locales de Propiedad y Tributación, además nos aseguramos de
                    que cada inmueble cumpla con todas las normativas
                    aplicables, incluyendo zonificación, códigos de construcción
                    y remodelación, regulaciones ambientales, etc. Mantenemos
                    una vigilancia constante sobre las obligaciones fiscales en
                    el estado donde se encuentra cada propiedad, presentamos
                    declaraciones y realizamos pagos de impuestos de manera
                    puntual, evitando sanciones y protegiendo los intereses
                    financieros de nuestros inversores.
                  </p>
                  <p className="mt-6 ">
                    En Colombia, además de todo lo anteriormente mencionado, es
                    importante destacar que no estamos vigilados por la
                    Superintendencia Financiera de Colombia, ya que nuestra
                    actividad no implica la captación masiva de recursos del
                    público ni la prestación de servicios financieros. Sin
                    embargo, cumplimos a cabalidad con todas las regulaciones
                    aplicables a nuestro modelo de negocio y seguimos las
                    mejores prácticas de transparencia y buen gobierno
                    corporativo. Para nuestro caso, es la Superintendencia de
                    Sociedades y la Superintendencia de Industria y Comercio
                    quienes ejercen una vigilancia sobre nosotros.
                  </p>
                </div>
              </div>
              <div className="mt-5 " id="section6">
                <p className="font-inter font-bold ">
                  Transparencia y comunicación
                </p>
                <div>
                  <p className="text-14 font-medium font-inter text-gray mt-4  ">
                    En CoinEstate, creemos firmemente que la transparencia y la
                    comunicación abierta son esenciales para construir y
                    mantener la confianza de nuestros inversores. Entendemos que
                    invertir en el mercado inmobiliario es una decisión
                    significativa, por lo que nos comprometemos a proporcionar
                    toda la información necesaria para que te sientas seguro y
                    bien informado en cada etapa del proceso. Proporcionamos
                    informes financieros regulares que detallan el rendimiento
                    de cada proyecto inmobiliario, incluyendo ingresos por
                    alquileres, gastos operativos, valorización de la propiedad
                    y proyecciones futuras. Mantenemos informados a nuestros
                    inversores sobre el progreso de los proyectos en curso,
                    compartiendo hitos alcanzados, próximos pasos, fotografías,
                    videos, informes de construcción y cualquier cambio
                    relevante en el cronograma o presupuesto. Ponemos a su
                    disposición todos los documentos legales relacionados con
                    las inversiones, como contratos, escrituras y permisos,
                    asegurando una visión completa y transparente de los
                    aspectos legales de cada proyecto. Comunicamos de manera
                    clara y detallada cualquier tarifa o comisión asociada con
                    las inversiones; no hay costos ocultos, ya que nuestro
                    modelo de negocio está diseñado para ser justo y
                    transparente. Presentamos proyecciones realistas sobre los
                    rendimientos esperados y detallamos los riesgos potenciales,
                    permitiéndole tomar decisiones informadas. Nuestra prioridad
                    es construir relaciones duraderas basadas en la confianza y
                    la transparencia; somos fieles creyentes en que una
                    comunicación abierta y honesta no solo fortalece nuestra
                    relación con los inversores, sino que también contribuye al
                    éxito compartido en el mercado inmobiliario. Estamos
                    comprometidos a mantenerle informado, escuchar sus
                    inquietudes y proporcionarle todas las herramientas y la
                    información necesarias para que se sienta seguro y
                    satisfecho con sus inversiones.
                  </p>
                </div>
              </div>
              <div className="mt-5 " id="section7">
                <p className="font-inter font-bold ">
                  Riesgos asociados a la inversión
                </p>
                <div>
                  <p className="text-14 font-medium font-inter text-gray mt-4  ">
                    Al invertir en el sector inmobiliario mediante un contrato
                    de cuentas en participación, es importante que consideres
                    ciertos riesgos asociados a este tipo de inversión. Entre
                    los principales riesgos se encuentran la falta de control
                    directo sobre las decisiones operativas y de gestión del
                    proyecto, ya que el socio gestor es quien administra los
                    activos, además de ser la cara visible del negocio. Sumado a
                    lo anterior, existe el riesgo de mercado, donde
                    fluctuaciones en el valor de los bienes inmuebles pueden
                    afectar el rendimiento esperado de su inversión. La liquidez
                    limitada es otro factor a tener en cuenta, dado que su
                    participación en el contrato puede no ser fácilmente
                    transferible o vendible en el corto plazo. También está el
                    riesgo de contraparte, confiando en la experiencia y
                    honestidad de nosotros como empresa para desarrollar el
                    negocio y proteger sus intereses. Es importante que tenga en
                    consideración estos factores si desea comenzar a adquirir
                    fracciones inmobiliarias con nosotros.
                  </p>
                </div>
              </div>
              <div className="mt-5 " id="section8">
                <p className="font-inter font-bold ">Impuestos</p>
                <div>
                  <p className="text-14 font-medium font-inter text-gray mt-4  ">
                    Nota importante: Esta información se proporciona únicamente
                    con fines informativos y no constituye asesoría legal ni
                    financiera. Le recomendamos encarecidamente que consulte con
                    un asesor legal o fiscal calificado para obtener orientación
                    específica sobre su situación en particular y así
                  </p>
                  <p className="text-14 font-medium font-inter text-gray mt-4  ">
                    cumplir adecuadamente con sus obligaciones fiscales. Es
                    fundamental tener en cuenta los impuestos que podrían
                    aplicarse a las ganancias obtenidas. Entre ellos se
                    encuentra el impuesto sobre la renta, donde las utilidades
                    generadas deben ser declaradas y podrían estar sujetas a
                    tasas impositivas según las leyes fiscales de su país de
                    residencia. Además, si recibe dividendos o distribuciones de
                    beneficios, estos podrían estar sujetos a retenciones o
                    impuestos adicionales. En caso de inversiones
                    internacionales, podrían surgir implicaciones como la doble
                    tributación o la necesidad de cumplir con acuerdos fiscales
                    entre países.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegisterBottomBanner />
    </div>
  );
}
