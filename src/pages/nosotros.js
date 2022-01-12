import React from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid
} from '@material-ui/core';

import LayoutTemplate from '@/common/Layout/LayoutTemplate';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const styles = (theme) => ({
  root: {
    padding: 20,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const Nosotros = ({classes}) => {
  const { t } = useTranslation(['common', 'footer']);

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center" justifyContent="center" direction="row">
          <Grid item lg={8} className={classes.title}>
              <h3>{ t('nosotros') }</h3>
          </Grid>
          <Grid item lg={8} xs={12}>
            <p>AvenidaZ es conformado por cinco jóvenes panameños emprendiendo un negocio lo que hoy conocemos como e-commerce. AvenidaZ surge en medio de la Pandemia de Covid-19 en donde debido a las restricciones de compras en los almacenes físicamente, muchos han optado por las compras online en el exterior, el cual no es beneficioso económicamente para nuestro país Panamá.</p> 
            <p>AvenidaZ es una tienda virtual al detal y por mayor en donde podrás realizar tus compras desde la comodidad de donde estés sin tener que salir de su hogar u oficina. Contamos con amplia variedad de productos de todos los departamentos.</p>
            <p>En Panamá contamos con muchos productos, el cual se necesita paciencia y tiempo para conseguirlos en los almacenes, sin embargo, con AvenidaZ podrás encontrar los productos que menos esperas existir en Panamá.</p>
            <b>Objetivo</b>
            <p>Ofrecer al público en general la posibilidad de adquirir productos desde cualquier lugar, mediante compra virtual con la posibilidad de obtener su compra sin tener que salir, ahorrando tiempo y cumpliendo con sus adquisiciones por medio de nuestra plataforma virtual.</p>
            <b>Misión</b>
            <p>Lograr que nuestra plataforma sea líder en el comercio electrónico en Panamá, brindado a clientes y usuarios seguridad, facilidad y rapidez en el momento de efectuar compras.</p>
            <b>Visión</b>
            <p>Ayudar a las microempresas unirse a la nueva era de e-commerce por medio de nuestra plataforma, de esta manera los productos llegue a todo tipo de clientela, desde una persona particular que desea vender un producto desde su casa hasta una gran empresa que desea vender miles de productos, facilitando a todos un manejo fácil, donde no necesita ser un web master para manejar su negocio online.</p>
          </Grid>
        </Grid>
      </div>
    </LayoutTemplate>
  );
}

Nosotros.protoTypes = {
  classes: T.object
}

/** This section is mandatory for next-18next translation to work, only inside /pages */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer']),
  },
})
 
export default withStyles(styles)(Nosotros);