import React from 'react';
import { IReactRouteRequest } from 'src/core/interfaces/IReactRouteRequest';
import { Response } from 'express';
import _ from 'lodash';
import { flushToHTML } from 'styled-jsx/server';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import ConfigHelper from 'src/helpers/configHelper';
import { loginUserSuccess } from 'src/ducks/auth';
import { setUI } from 'src/ducks/ui';
import { setRoutes } from 'src/ducks/routes';
import { setLocale, setAvailableLocales } from 'src/ducks/locale';
import configureStore from 'src/store/configureStore';
import routes from 'src/routes';
import { GET } from 'src/core/API';
import EndpointsConfig from 'src/configs/endpoints';
import CommonCfg from 'src/configs/common';
import ServerCfg from 'src/configs/server';
import commonServer from 'src/server/common';
import getRobotsTxt from 'src/server/getRobotsTxt';
import getSitemapXml from 'src/server/getSitemapXml';
import renderHtml from 'src/server/renderHtml';
import { logger } from 'src/server/logger/logger';
import { IObject } from 'src/core/interfaces/IObject';
import { IXShopHeaders } from 'src/core/interfaces/IXShopHeaders';
import getAvailableLocale from 'src/server/getAvailableLocale';

const assetUrl = ConfigHelper.isDev() && module.hot ? ServerCfg.ASSET_URL_DEV : '/public/';
const stylesName = ServerCfg.STYLES_NAME;
const bundleName = ServerCfg.BUNDLE_NAME;

const reactRoute = async (req: IReactRouteRequest, res: Response) => {
  const location = req.url;
  const locale = getAvailableLocale(req);
  // save for call proxyRoute from fetchData
  const xShopHeaders: IXShopHeaders = {
    'x-shop-domain': commonServer.getDomain(req),
    'Accept-Language': locale,
  };
  const shopResponse = await GET(
    {
      url: `${EndpointsConfig.CONFIG}?route=${location}`,
    },
    xShopHeaders,
  );
  const config = shopResponse.data as Alicanto.API.GET_CONFIG_RESPONSE<
    Alicanto.Models.UI,
    Alicanto.Models.Locales,
    any, // Groupings does not use
    any, // Filters does not use
    Alicanto.Models.Routes,
    Alicanto.Models.Meta,
    Alicanto.Models.Robots,
    Alicanto.Models.Sitemap
  >;
  // if (ConfigHelper.isDev()) {
  //   const globalConfig = require('src/configs/global.yml');
  //   config = { ...config, ...globalConfig };
  // }
  if (req.url === '/robots.txt') {
    const punycode = require('punycode');
    const hostname = `${req.protocol}://${punycode.toASCII(req.get('host'))}`;
    const routes = config.routes;
    return Promise.resolve(
      res
        .status(200)
        .type('.txt')
        .end(getRobotsTxt({ hostname, routes, config: config.robots.value })),
    );
  }
  if (req.url === '/sitemap.xml') {
    const punycode = require('punycode');
    const hostname = `${req.protocol}://${punycode.toASCII(req.get('host'))}`;
    const routes = config.routes;
    return Promise.resolve(
      res
        .status(200)
        .type('.xml')
        .end(getSitemapXml({ hostname, routes, config: config.sitemap })),
    );
  }
  const SSRParams = { location, xShopHeaders };
  const store = configureStore({}, SSRParams);
  const authToken = _.get(req, 'session.token', null);
  if (!_.isNull(authToken)) {
    store.dispatch(loginUserSuccess());
  }
  store.dispatch(setUI(config.ui));
  store.dispatch(setRoutes(config.routes));
  // TODO workaround for ch864
  const map: IObject<string> = {
    en: 'en-US',
    ru: 'ru-RU',
    pl: 'pl-PL',
    lv: 'lv-LV',
  };
  const availableLocales: string[] = [];
  config.locales.language_codes.forEach((code: string) => {
    const locale = map[code];
    if (!_.isUndefined(locale)) {
      availableLocales.push(map[code]);
    }
  });
  store.dispatch(setAvailableLocales(availableLocales));
  store.dispatch(setLocale(locale));
  // WIP use setMeta for SSR instead of getMeta in AppLayout.fetchData
  // if (!_.isUndefined(config.meta)) {
  //   store.dispatch(setMeta(config.meta));
  // }
  const branch = matchRoutes(routes, location);
  const promises = branch.map(({ route }) => {
    const fetchData: Store.IFetchDataFn = _.get(route, 'component.fetchData', null);
    return _.isNull(fetchData) ? Promise.resolve() : fetchData();
  });
  Promise.all(promises)
    .catch(error => {
      if (ConfigHelper.isDev()) {
        console.error(error);
      } else {
        logger.error(error);
      }
    })
    .then(() => {
      const context = {
        status: 200,
        url: '',
      };
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={location} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>,
      );
      if (context.status === 302) {
        return res.redirect(302, context.url);
      }
      const styles = flushToHTML();
      const helmetData = Helmet.renderStatic();
      const cookieLocaleMaxAge = _.toNumber(CommonCfg.COOKIE_LOCALE_MAX_AGE);
      res
        .status(context.status)
        .cookie('locale', locale, { maxAge: cookieLocaleMaxAge })
        .cookie('availableLocales', JSON.stringify(availableLocales), {
          maxAge: cookieLocaleMaxAge,
          httpOnly: true,
        })
        .end(renderHtml(content, store.getState(), assetUrl, stylesName, bundleName, styles, helmetData));
    });
};

export default reactRoute;
