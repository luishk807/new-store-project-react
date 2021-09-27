import React, { Component } from 'react';
import * as T from 'prop-types';
import moment from 'moment';

import Icons from '@/common/Icons';
import { config } from 'config';
import { formatNumber } from 'src/utils';

import { 
  withStyles, 
} from '@material-ui/core';

const styles = (theme) => ({
  titleHeader: {
    fontSize: '3em',
    fontWeight: 'bold'
  },
  tableMain: {
    width: '100%'
  },
  tableCompanyInfo: {
    width: '100%'
  },
  tableCompanyInfoTd1: {
    width: '70%',
  },
  tableCompanyInfoTd2: {
    width: '30%',
  },
  tableItems: {
    width: '100%',
    border: '1px solid black',
    margin: '10px 0px',
    '& th': {
      border: '1px solid black',
      textAlign: 'center',
      padding: 5
    },
    '& td': {
      borderRight: '1px solid black',
      borderLeft: '1px solid black',
      textAlign: 'center',
      padding: 5,
      verticalAlign: 'top'
    },
    '& th:first-child': {
      width: '15%'
    },
    '& th:nth-child(2)': {
      width: '45%',
    },
    '& td:nth-child(2)': {
      textAlign: 'left'
    },
    '& th:nth-child(3)': {
      width: '10%'
    },
    '& th:nth-child(4)': {
      width: '10%',
    },
    '& th:nth-child(5)': {
      width: '20%',
    }
  },
  tdHeader: {
    fontWeight: 'bold',
  },
  icon: {
    width: 200
  },
  companyInfo: {
    margin: '10px 0px'
  },
  tableTotal: {
    width: '100%',
    margin: '10px 0px'
  },
  tableOrderSummary: {
    width: '100%',
    border: '1px solid black',
    borderCollapse: 'collapse',
    '& th': {
      textAlign: 'left',
      border: '1px solid black',
      padding: 5
    },
    '& td': {
      textAlign: 'right',
      border: '1px solid black',
      padding: 5
    }
  },
  tdShipBill: {
    width: '50%'
  },
  tableShipBillTo: {
    width: '100%',
    margin: '10px 0px'
  },
  tableFooter: {
    width: '100%',
    margin: '10px 0px'
  },
  tableFooterTd1: {
    width: '70%',
    verticalAlign: 'top'
  },
  tableFooterTd2: {
    width: '30%',
    '& th': {
      textAlign: 'left',
      padding: 5,
      fontWeight: 'normal'
    },
    '& td': {
      textAlign: 'right',
      padding: 5
    }
  },
  originalPrice: {
    textDecorationLine: 'line-through'
  }
})

class OrderTemplate extends Component {
  render() {
    const { data, classes } = this.props;
    return (
      <table className={classes.tableMain}>
        <thead>
          <tr>
            <td>
              <table className={classes.tableCompanyInfo}>
                <tbody>
                  <tr>
                    <td className={classes.tableCompanyInfoTd1}>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <Icons classes={{icon: classes.icon}} name="logoFull" />
                            </td>
                          </tr>
                          <tr>
                            <td className={classes.companyInfo}>
                              {config.name}<br/>
                              {config.address}<br/>
                              {config.phone}<br/>
                              Email: {config.emails.sales}<br/>
                              Pagina: {config.web}<br/>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td className={classes.tableCompanyInfoTd2}>
                      <table className={`${classes.tableOrderSummary}`}>
                        <tbody>
                          <tr>
                            <th>
                              Orden No.
                            </th>
                            <td>
                              {data.order_number}
                            </td>
                          </tr>
                          <tr>
                            <th>
                              Fecha
                            </th>
                            <td>
                              {moment(data.createdAt).format('MMMM D, YYYY')}
                            </td>
                          </tr>
                          <tr>
                            <th>
                              Estado
                            </th>
                            <td>
                              {data.orderStatuses.name}
                            </td>
                          </tr>
                          <tr>
                            <th>
                              Metodo de Pago
                            </th>
                            <td>
                              {data.paymentOption}
                            </td>
                          </tr>
                          <tr>
                            <th>
                              Servicio
                            </th>
                            <td>
                              {data.deliveryService}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table className={classes.tableShipBillTo}>
                <tbody>
                  <tr>
                    <td className={classes.tdShipBill}>
                      <table>
                        <tbody>
                          <tr>
                            <th>{data.deliveryOption}</th>
                          </tr>
                          {
                            data.deliveryOptionId == 1 ? (
                              <tr>
                                <td>
                                  {data.shipping_name}<br/>
                                  {data.shipping_email}<br/>
                                  {data.shipping_phone && data.shipping_phone}
                                </td>
                              </tr>
                            ) : (
                              <tr>
                                <td>
                                  {data.shipping_name}<br/>
                                  {data.shipping_address}<br/>
                                  {data.shipping_province}<br/>
                                  {data.shipping_district}<br/>
                                  {data.shipping_corregimiento && data.shipping_corregimiento != 'null' && data.shipping_corregimiento}<br/>
                                  {data.shipping_zone && data.shipping_zone != 'null' && data.shipping_zone}<br/>
                                  {data.shipping_email && data.shipping_email != 'null' && `Email: ${data.shipping_email}`}<br/>
                                  {data.shipping_phone && data.shipping_phone != 'null' && `Phone: ${data.shipping_phone}`}<br/>
                                  {data.shipping_note && data.shipping_note != 'null' && `Note: ${data.shipping_note}`}
                                </td>
                              </tr>
                            )
                          }
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table className={classes.tableItems}>
                <tbody>
                  <tr>
                    <th>
                      Modelo
                    </th>
                    <th>
                      Decription
                    </th>
                    <th>
                      Precio C/U
                    </th>
                    <th>
                      Cant
                    </th>
                    <th>
                      Total
                    </th>
                  </tr>
                  {
                    data.orderOrderProduct.map((item, index) => {
                      const itemTotal = parseInt(item.quantity) * parseFloat(item.unit_total);
                      return (
                        <tr key={index}>
                          <td>
                            {
                              item.sku
                            }
                          </td>
                          <td>
                            { item.name }
                            <br/>
                            SKU: { item.sku }
                            <br/>
                            Color:&nbsp;{ item.color }
                            <br/>
                            Tamano:&nbsp;{ item.size }
                            <br/>
                            {
                              item.savePrice && (
                                <>
                                  <span className={classes.originalPrice}>{item.originalPrice}</span>&nbsp;
                                  <span>{item.unit_total}</span><br/>
                                  <b>Descuento:</b>&nbsp;{item.productDiscount}
                                </>
                              )
                            }
                          </td>
                          <td>
                            {`$${formatNumber(item.unit_total)}`}
                          </td>
                          <td>
                            { item.quantity }
                          </td>
                          <td>
                            {`$${formatNumber(itemTotal)}` }
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <table className={classes.tableFooter}>
                  <tbody>
                    <tr>
                      <td className={classes.tableFooterTd1}>
                        {/* Description */}
                      </td>
                      <td className={classes.tableFooterTd2}>
                        <table className={classes.tableTotal}>
                          <tbody>
                            <tr>
                              <th>
                                Subtotal
                              </th>
                              <td>
                                {`$${formatNumber(data.subtotal)}`}
                              </td>
                            </tr>
                            <tr>
                              <th>
                                ITBMS 7%
                              </th>
                              <td>
                                {`$${formatNumber(data.tax)}`}
                              </td>
                            </tr>
                            <tr>
                              <th>
                                Entrega
                              </th>
                              <td>
                                {`$${formatNumber(data.delivery)}`}
                              </td>
                            </tr>
                            {
                              data.coupon && !!Number(data.coupon) &&(
                                <tr>
                                  <th>
                                    Discuento con cupon
                                  </th>
                                  <td>
                                    {`$${formatNumber(data.coupon)}`}
                                  </td>
                                </tr>
                              )
                            }
                            <tr>
                              <th>
                                <b>Grand Total</b>
                              </th>
                              <td>
                                {`$${formatNumber(data.grandtotal)}`}
                              </td>
                            </tr>
                            {
                              data.totalSaved && !!Number(data.totalSaved) && (
                                <tr>
                                  <th>
                                    Ahorrastes
                                  </th>
                                  <td>
                                    {`- $${formatNumber(data.totalSaved)}`}
                                  </td>
                                </tr>
                              )
                            }
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tfoot>
      </table>
    )
  }
}

OrderTemplate.propTypes = {
  classes: T.object,
  data: T.object.isRequired,
}

export default withStyles(styles)(OrderTemplate)