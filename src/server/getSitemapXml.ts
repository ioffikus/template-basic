const getSitemap = (routes: Alicanto.Models.Routes) => {
  let result: { url: string; changefreq: string; priority: number }[] = [];
  Object.keys(routes).forEach(key => {
    const route = routes[key];
    if (route.sitemap) {
      result = [...result, { url: key, ...route.sitemap }];
    }
    if (route.routes) {
      const children = getSitemap(route.routes);
      if (children) {
        result = [...result, ...children];
      }
    }
  });
  return result;
};

interface IParams {
  hostname: string;
  routes: Alicanto.Models.Routes;
  config: { cacheTime: number };
}

const getSitemapXml = ({ hostname, routes, config }: IParams) => {
  const sitemap = require('sitemap').createSitemap({
    hostname,
    urls: getSitemap(routes),
    ...config,
  });
  return sitemap.toString();
};

export default getSitemapXml;
