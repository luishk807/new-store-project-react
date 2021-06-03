import React from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button, 
  TextField,
} from '@material-ui/core';

import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import Typography from '../components/common/Typography';

const styles = (theme) => ({
  root: {
    padding: 20,
  },
  termItem: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  }
});

const Terms = ({classes}) => {
  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center" justify="center" direction="row">
          <Grid item lg={8} xs={12} className={classes.termItem}>
            <h3>Términos y Condiciones</h3>
            <br/>
            <h5>Estas Políticas son válidas para el sitio web <a href="/">www.avenidaz.com</a></h5>
            <h5>Politica de pedidos</h5>
            <p>El cliente deberá proporcionar los datos básicos completos, Nombre, teléfono de contacto, correo electrónico, información del domicilio del destinatario en caso de envió.</p>
            <p>Comprar en nuestra tienda online es muy fácil, sólo debes buscar, elegir el producto que desees, agregarlo al carrito de compra y terminar su pedido indicándonos el método de entrega de la mercancía.</p>
            <ul>
              <li>Nuestros productos vienen en variedad de colores y medidas</li>
              <li>Al elegir el producto deseado, deberá seleccionar la cantidad deseada y agregar al Carrito. Al comprar mayor cantidad se le aplicara un porcentaje de descuento dependiendo de cada producto. </li>
              <li>Al finalizar su orden, en un plazo de 24 horas recibirá notificación vía email la confirmación de su pedido con detalle de la disponibilidad de los productos y fecha estimada de entrega o de retiro en el depósito de AvenidaZ, ubicado en Plaza Comercial El Dorado Local #06. </li>
              <li>Tener en cuenta la imagen mostrada en la pagina es referencia cercana a lo que corresponde el producto.</li>

            </ul>
            <h5>Forma de pago</h5>
            <p>Aceptamos las siguientes formas de pago para su pedido en línea en <a href="/">www.avenidaz.com</a>:</p>
            <ul>
              <li >ACH Transferencia Bancaria o depósito bancario a las siguientes cuentas:
                <br/><img src="/images/terms-banco.png" className={`img-fluid`}/>
              </li>
              <li>Transferencia por Yappy <img src="/images/terms-banco-yappy.png" className={`img-fluid`}/> @AvenidaZ</li>
              <li>En ambos métodos favor colocar el número de su pedido en la descripción del pago</li>
              <li>Una vez realizada la transferencia, favor enviar comprobante de pago a <a href="mailto:ventas@avenidaz.com">ventas@avenidaz.com</a> o al whatssap 6770-2400</li>
            </ul>
            <h5>Politica de entrega</h5>
            <p>Estas Políticas son válidas para el sitio web <a href="/">www.avenidaz.com</a> y se da por entendido que al momento de comprar cualquiera de nuestros productos o servicios el cliente acepta los términos, condiciones y políticas de entrega especificados a continuación</p>
            <h5>Tiempo de entrega de mercancia</h5>
            <p>Al escoger entrega a domicilio, la misma se le cobrará un costo dependiendo del área de entrega, esta será detallada al momento de culminar su orden de compra.</p>
            <p>Se coordinará el momento de entrega con el cliente por medio de whatssap. El tiempo de entrega puede variar entre 1 a 3 días hábiles, teniendo como un máximo de 10 días para el envío del pedido.</p>
            <p>El cliente deberá proporcionar mayor detalle del lugar de destinatario, cualquier error o falta de información al respecto, será de entera responsabilidad del cliente.</p>
            <p>Para mercancía con retiro en depósito, se estará coordinando con el comprador para determinar el momento de entrega de su pedido en nuestro deposito ubicado en La Plaza Comercial El Dorado Local#06.</p>
            <h5>Recepción de la mercancía</h5>
            <p>En caso del recibo de mercancía por entrega, el embalaje no se encuentra en su estado perfecto, el cliente debe comunicar inmediatamente dicha incidencia a AvenidaZ por WhatsApp 6770-2400 o <a href="mailto:ventas@avenidaz.com">ventas@avenidaz.com</a> en un periodo no máximo a 24horas desde la recepción del producto. Si el paquete presenta daños importantes con los cuales se cree que el producto pudiese haber sufrido daños deberá ser rechazado y se deberá notificar a AvenidaZ de forma inmediata.</p>
            <p>La entrega lo realiza un motorizado externo, la coordinación de entrega es realizada por AvenidaZ con la concientización del cliente. En caso el cliente no se encuentra disponible al momento de realizar la recepción de mercancía, el transportista retornara la mercancía a la bodega. En dicho caso, el cliente deberá retirar la mercancía en la bodega o pagar por un segundo envió.</p>
            <p>Para retiros en el depósito, debe verificar al producto antes de retirarse de la ubicación, una vez retirado no se aceptarán reclamos, devolución ni reembolso.</p>
            <h5>Disponibilidad y precios</h5>
            <p>Los precios están expresados en Dólares Americanos $USD, de acuerdo al tipo de cambio referencial del día de la transacción. Así mismo podrán estar sujetos a cambio sin previo aviso.</p>
            <p>AvenidaZ asegura la disponibilidad de los productos y servicios que se muestran en el portal. De presentarse una situación, de falta de disponibilidad, AvenidaZ informará oportunamente a sus clientes, mediante correo electrónico de nuestro Servicio al Cliente, sobre esta situación ajena a nuestro control, indicando el plazo de entrega estimada o reembolso en su totalidad sobre el producto no disponible.</p>
            <h5>Cancelaciones</h5>
            <p>Una vez enviado y procesado el Pedido de Compra, mediante nuestro portal de AvenidaZ.</p>
            <p>Aceptaremos anulaciones de cualquier pedido de compra dentro de las siguientes 24 horas de solicitado, siempre y cuando no se haya procedido a la facturación y despacho del mismo. En este caso, el cliente deberá solicitar el reembolso o anulación del pago ya sea con depósito o transferencia bancaria para que se proceda a su devolución, siempre que cumpla con las condiciones anteriormente explicadas. Para anular su pedido de compra o alguno de los artículos del mismo, el cliente deberá ponerse en contacto con nosotros a través del Centro de Servicio al Cliente, al correo electrónico <a href="mailto:ventas@avenidaz.com">ventas@avenidaz.com</a></p>
            <h5>Devolución de mercancía</h5>
            <p>Entendemos por Devolución el proceso mediante el cual un cliente que ha comprado una mercancía previamente la devuelve a la tienda y a cambio, recibe efectivo por devolución o, en algunos casos, otro artículo (igual o diferente, pero de valor equivalente) o un crédito para usar en la tienda.</p>
            <ul>
              <li>El cliente dispondrá de un plazo de 3 días a partir de la recepción del producto para enviar a AvenidaZ cualquier reclamación en relación al producto suministrado. Después de ese plazo los productos serán considerados como conformes por el cliente. El reclamo deberá realizarse a través del whatsapp 6770-2400 o por correo:  <a href="mailto:ventas@avenidaz.com">ventas@avenidaz.com</a></li>
              <li>AvenidaZ no se hace responsable y se reserva el derecho de rechazar posibles devoluciones en caso de mercancía en mal estado por uso indebido o daños de transporte. El cliente será responsable de los gastos de envío por la devolución.</li>
            </ul>
            <p>Tener en consideración los siguientes puntos para la devolución:</p>
            <ul>
              <li>Producto recibido con daños de fábrica, la misma será revisa por el equipo control de calidad de AvenidaZ. El cliente tendrá derecho a recibir un reembolso o canje de producto.</li>
              <li>No se aceptan devoluciones ni canjes en productos de oferta o descuento.</li>
              <li>El producto recibido no es el seleccionado por el cliente, el cliente tendrá opción a reembolso o solicitar se envié el producto correcto. En ambos casos, AvenidaZ retirara la mercancía recibida por el cliente.</li>
            </ul>
            <p>En cualquiera de los casos, es imprescindible que los productos sujetos a un cambio o a una devolución estén en perfecto estado y sin signos evidentes de uso, de lo contrario no podrá realizarse ningún cambio o devolución. Es su responsabilidad proporcionar el embalaje adecuado para asegurar que los artículos lleguen a AvenidaZ en perfectas condiciones. Si los artículos se reciben en mal estado, no podremos efectuar la devolución solicitada.</p>
            <p>&ast;Para artículos personalizados (esto incluye: grabados o personalización en el producto) no se aceptan cambios ni devoluciones.</p>
            <h5>Reembolso</h5>
            <p>Entendemos por reembolso la solicitud de un cliente por recibir el monto que ha pagado por un artículo o servicio.</p>
            <p>Puntos a considerar para reembolso</p>
            <ul>
              <li>El producto adquirido se encuentra fuera de inventario y no es posible entregar otro de características similares y de igual o mayor precio.</li>
              <li>AvenidaZ no haya despachado la mercancía / producto dentro de los primeros 10 días hábiles luego de haber realizado la compra.</li>
              <li>El cliente haya realizado un pago mayor a lo facturado, el reembolso aplica por la diferencia.</li>
              <li>El producto recibido no es el seleccionado por el cliente, el cliente tendrá opción a reembolso o solicitar se envié el producto correcto. En ambos casos, AvenidaZ retirara la mercancía recibida por el cliente.</li>
              <li>Reembolso de producto por defectos de fabricación, una vez aprobada por el equipo de Control de Calidad de AvenidaZ.</li>
              <li>AvenidaZ no realiza reembolso de productos personalizados.</li>
            </ul>
            <p>El Usuario debe cumplir los siguientes requisitos para que AvenidaZ admita la devolución del producto:</p>
            <ul>
              <li>El producto debe estar en el mismo estado en que se entregó y deberá conservar, en perfecto estado su embalaje y etiquetado original.</li>
              <li>El envío debe realizarse empleando en el mismo embalaje en que el artículo fue recibido para proteger el producto de forma adecuada. De no tener el embalaje, el usuario se compromete en enviar el articulo en buen estado.</li>
              <li>La devolución no se dará por concluida a satisfacción hasta que los productos sean recibidos y revisados por el equipo de operaciones de AvenidaZ. Si al ser revisado en efecto el producto está defectuoso por causas no imputables al Usuario, se deberá realizar la devolución de la compra o cambio del producto.</li>
              <li>No se aceptarán devoluciones de productos en los cuales sea evidente que el daño en el mismo se haya producido por un mal uso del producto. Esto incluye producto que muestre rayones, cortes, manchas, golpes que sean producto de una mala manipulación por parte del cliente. Por esta razón es importante que el cliente verifique los artículos adquiridos al momento de recibirlos.</li>
            </ul>
            <p>Para efectuar la devolución, el Usuario debe seguir los siguientes pasos:</p>
            <p>Para efectuar la devolución, se le pedirá la siguiente información, la cual puedes hacer llegar por Correo Electrónico <a href="mailto:ventas@avenidaz.com">ventas@avenidaz.com</a>, chat o Telefónicamente</p>
            <ul>
              <li>Número de pedido con el que compraste tu producto. </li>
              <li>Descripción del artículo y/o pedido.</li>
              <li>Motivo por el cual se solicita la devolución.</li>
              <li>Forma de pago con la que se adquirió la compra.</li>
              <li>Las solicitudes de reembolso se analizarán y se dará avisó al cliente tanto en casos de proceder como encasos de no procedencia de los reembolsos y los motivos.</li>
              <li>Los gastos de envío para la devolución del producto correrán por cuenta del cliente, si lo desea podemosenviar una guía para que se programe la recolección del producto y el costo del envío se descontará del rembolso.</li>
              La compañía de transporte coordinará directamente con el Usuario la fecha y hora de la entrega.
              <li>AvenidaZ confirmará vía correo electrónico la recepción del producto en la bodega.</li>
            </ul>
            <h5>Procesamiento del reembolso</h5>
            <p>Los tiempos estimados para el procesamiento de un Reembolso una vez autorizado el mismo son:</p>
            <ul>
              <li>Depósito Bancario desde Banco General o yappy, 2 a 3 días hábiles</li>
            </ul>
            <h5>Proteccion al consumidor</h5>
            <p>Nos comprometemos a acatar lo dispuesto por la Ley de Protección y Defensa del Consumidor y los lineamientos en cuanto a política de privacidad.</p>
            <h5>No previstos</h5>
            <p>Cualquier situación no prevista en estas políticas, serán resueltas por nuestro Centro de Servicio al Cliente. En todo momento se verificará bajo la filosofía de máxima satisfacción del cliente, el cumplimiento de nuestros acuerdos, bajo el entendimiento que existirán agentes externos a nosotros que nos impedirán cumplir con nuestro propósito.</p>
          </Grid>
        </Grid>
      </div>
    </LayoutTemplate>
  );
}

Terms.protoTypes = {
  classes: T.object
}
 
export default withStyles(styles)(Terms);