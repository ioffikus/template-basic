import CommonCfg from 'src/configs/common';

const EndpointsConfig = {
  USER: `${CommonCfg.REACT_API_PATH}/user`,
  AUTH: {
    LOGIN: '/login',
    REFRESH_TOKEN: '/refresh_token',
    LOGOUT: '/logout',
    AUTH_LINK: `${CommonCfg.REACT_API_PATH}/auth/oauth/provider-url`,
    GWT_AGG: '/auth/oauth/jwt/aggregion',
  },
  CONFIG: `${CommonCfg.REACT_API_PATH}/config`,
  CATALOG: `${CommonCfg.REACT_API_PATH}/catalog/`,
  RECOMMEND_ITEMS: `${CommonCfg.REACT_API_PATH}/catalog/groups/recommend_items`,
  POPULAR_ITEMS: `${CommonCfg.REACT_API_PATH}/catalog/groups/popular_items`,
  CATEGORIES: `${CommonCfg.REACT_API_PATH}/catalog/categories/`,
  CATEGORIES_MENU: `${CommonCfg.REACT_API_PATH}/catalog/groups/categories_menu`,
  PRODUCT: `${CommonCfg.REACT_API_PATH}/catalog/`,
  FILTERS: `${CommonCfg.REACT_API_PATH}/catalog/filters/`,
  CART_CURRENT: `${CommonCfg.REACT_API_PATH}/cart/current`,
  CART_CURRENT_ITEMS: `${CommonCfg.REACT_API_PATH}/cart/current/items/`,
  CART_PAID_ITEMS: `${CommonCfg.REACT_API_PATH}/cart/paid/items/`,
  USER_ORDERS: `${CommonCfg.REACT_API_PATH}/user/orders/`,
  PAY_ORDER: `${CommonCfg.REACT_API_PATH}/payments/pay/`,
  PAYMENTS_CHECK: '/payments/check/',
  MAILING_CONTACT_FORM: `${CommonCfg.REACT_API_PATH}/mailing/contact-form/`,
  PAGES: `${CommonCfg.REACT_API_PATH}/pages/`,
  SEO: `${CommonCfg.REACT_API_PATH}/seo/data`,
};

export default EndpointsConfig;
