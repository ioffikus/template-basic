import serverConfig from 'src/configs/server';
import { HelmetData } from 'react-helmet';

const renderHtml = (
  componentHTML: string,
  initialState: Store.IState,
  assetUrl: string,
  stylesName: string,
  bundleName: string,
  styles: string,
  helmetData: HelmetData,
) => `
  <!DOCTYPE html>
  <html className="no-js" lang="${initialState.locale.current}" ${helmetData.htmlAttributes.toString()}>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

      ${helmetData.title.toString()}
      ${helmetData.meta.toString()}
      ${helmetData.link.toString()}

      <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
      <link href="/favicon.ico"
        rel="shortcut icon" type="image/x-icon" />

      <!-- public/assets/ -->
      <link 
        href="${assetUrl}${stylesName}?version=${serverConfig.STATIC_VERSION}" 
        rel="stylesheet" type="text/css" />

      <script type="application/javascript">
        window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)};
      </script>

      ${styles}
    </head>

    <body ${helmetData.bodyAttributes.toString()}>
      <div id="react-view">${componentHTML}</div>

      <script type="application/javascript"
        src="${assetUrl}${bundleName}?version=${serverConfig.STATIC_VERSION}"></script>
    </body>
  </html>
`;

export default renderHtml;
