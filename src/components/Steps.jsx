import React from "react";

export default function Steps() {
  return (
    <div className="max-w-[786px] mx-auto w-full bg-white mt-4 lg:mt-0 rounded-[8px] p-6">
      <h4 className="text-black-100 text-18 font-inter font-bold">
        Paso 1: Crea tu cuenta
      </h4>
      <ul className="mt-4 text-14 font-inter font-medium list-disc text-gray ml-4">
        <li>Visita el sitio web de CoinEstate.</li>
        <li>
          Haz click en botón ” Registrarse ” y completa el formulario de
          registro, en donde se te solicitará información como tu nombre, número
          de teléfono y correo electrónico, para poder comunicarnos contigo;
          ofrecerte soporte rápido y personalizado; informarte de
          actualizaciones importantes, entre otros
        </li>
        <li>
          Verifica tu correo electrónico: Abre en tu correo un mail que se te
          habrá enviado de forma automática y activa tu cuenta.
        </li>
      </ul>
      <button className="bg-yellow text-white text-12 mt-6 font-inter font-semibold rounded-full py-3 px-8">
        Regístrate
      </button>
      <h4 className="text-18 mt-5 font-inter font-semibold text-black-100">
        Paso 2: Selecciona el o los inmuebles/proyectos en los que deseas
        invertir.
      </h4>
      <p className="mt-4 text-14 font-inter font-medium text-gray">
         En nuestra sección de “marketplace” navega por la lista de proyectos e
        inmuebles disponibles, revisa la información detallada de cada proyecto,
        ubicación, tipo de inmueble, rendimiento esperado, fotografías, entre
        otros. Puedes utilizar el simulador de inversión para determinar el
        monto que deseas invertir, y hacerte una idea del comportamiento que
        tendrá tu inversión a lo largo del tiempo.{" "}
      </p>
      <h4 className="text-18 mt-5 font-inter font-semibold text-black-100">
        Paso 3: Realiza tu verificación KYC (Know Your Coustumer)
      </h4>
      <p className="mt-4 text-14 font-inter font-medium text-gray">
        La verificación KYC es vital para proporcionar a los inversores un
        entorno seguro y confiable para sus inversiones. Este proceso permite
        proteger tus activos ante posibles implicaciones legales derivadas de
        otros inversores y nos ayuda a prevenir actividades ilícitas en la
        plataforma. Para completar la verificación, solo debes seguir los pasos
        que se te presentarán la primera vez que intentes comprar tokens. Se te
        solicitará información como documentos de identificación y número de
        teléfono, entre otros datos necesarios.
        <br />
        Este registro solo es necesario hacerlo una vez, y una vez aprobado,
        podrás acceder a todas las funcionalidades de CoinEstate sin
        complicaciones adicionales. Esto garantiza que tu experiencia de
        inversión sea fluida, segura y cumpla con los estándares regulatorios.
      </p>
      <h4 className="text-18 mt-5 font-inter font-semibold text-black-100">
        Paso 4: Paga
      </h4>
      <p className="mt-4 text-14 font-inter font-medium text-gray">
        Para hacer oficial la compra de tokens, elige el método de pago que
        prefieras y procede con el pago. Contamos con transferencia bancaria, y
        pagos con tarjetas de crédito y débito.
      </p>
      <p className="mt-10 text-14 font-inter font-medium text-gray">
        Una vez hayas invertido , podrás acceder a un panel de inversionista
        para monitorear el rendimiento de las inversiones, ver detalles sobre
        pagos de rentas, revalorización del inmueble, y cualquier actualización
        relevante de un inmueble o proyecto.
      </p>
      <h4 className="text-18 mt-5 font-inter font-semibold text-black-100">
        Paso 5: Recibe tus rendimientos y reinvierte o retira tus ganancias
      </h4>
      <p className="mt-4 text-14 font-inter font-medium text-gray">
        Las rentabilidades de tus tokens se distribuirán automáticamente a tu
        cuenta en CoinEstate, cuyo saldo se reflejará en el panel de control del
        inversionista. Estos rendimientos se recibirán en forma de USD
      </p>
      <ul className="mt-4 text-14 font-inter font-medium list-disc text-gray ml-4">
        <li>
          Reinversión de Ganancias: Puedes reinvertir tus ganancias fácilmente
          comprando más tokens, incrementando así tu participación en otros
          proyectos y potencialmente aumentando tus futuros rendimientos.
        </li>
        <li>
          Retiro de Ganancias: También tienes la opción de retirar tus ganancias
          y transferirlas a tu cuenta bancaria en COP de manera rápida y
          sencilla, disfrutando de los beneficios de la apreciación del dólar
          frente a tu moneda local. El proceso es seguro, y puedes realizar
          retiros cuando lo necesites, sin restricciones complicadas.
        </li>
        <li>
          Acceso al Panel de Inversiones: En el panel de control de tu cuenta,
          podrás ver los rendimientos acumulados, historial de pagos y otras
          métricas importantes. Así podrás tener una visión clara de tu
          rentabilidad y decidir cuándo y cómo utilizar tus ganancias.
        </li>
      </ul>
    </div>
  );
}
