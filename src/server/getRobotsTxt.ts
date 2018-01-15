const getAllows = (routes: Alicanto.Models.Routes) => {
  let result: string[] = [];
  Object.keys(routes).forEach(key => {
    const route = routes[key];
    const robots = route.robots;
    // Allow has high priority versus Disallow
    if (robots && robots.Allow) {
      result = [...result, `Allow: ${key}`];
    } else if (robots && robots.Disallow) {
      result = [...result, `Disallow: ${key}`];
    }
    if (route.routes) {
      const children = getAllows(route.routes);
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
  config: string[];
}

const getRobotsTxt = ({ hostname, routes, config }: IParams) => {
  return ['User-agent: *', ...getAllows(routes), `Sitemap: ${hostname}/sitemap.xml`, ...config].join('\n');
};

export default getRobotsTxt;
