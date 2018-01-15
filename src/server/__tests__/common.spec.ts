import CommonServer from './../common';

const host = 'riga.agg.loc';
const hostAndPort = `${host}:3001`;
const xShopDomain = 'xShopDomain';
const get: any = () => host;

describe('test getDomain', () => {
  it('If the request is host return it', () => {
    const req: any = {
      host,
      get,
    };

    expect(CommonServer.getDomain(req)).toEqual(host);
  });

  it('If the request is xShopDomain return it', () => {
    const req: any = {
      get,
      headers: {
        'x-shop-domain': host,
      },
    };

    expect(CommonServer.getDomain(req)).toEqual(host);
  });

  it('if host includes port return only host', () => {
    const returnHostAndPort = () => hostAndPort;
    const req: any = {
      host: hostAndPort,
      get: returnHostAndPort,
    };

    expect(CommonServer.getDomain(req)).toEqual(host);
  });

  it('if request includes host and xShopDomain return xShopDomain', () => {
    const req: any = {
      get,
      headers: {
        'x-shop-domain': xShopDomain,
      },
    };

    expect(CommonServer.getDomain(req)).toEqual(xShopDomain);
  });
});
