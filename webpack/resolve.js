const path = require('path');

module.exports = {
  extensions: ['.js', '.json', '.ts', '.tsx', '.jsx'],
  alias: {
    src: path.join(path.dirname(__dirname), 'src'),
  },
};
