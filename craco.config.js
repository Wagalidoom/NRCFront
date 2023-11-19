module.exports = {
  // Configuration de Babel
  babel: {
    presets: ["@babel/preset-typescript"],
  },

  // Personnalisation de la configuration de Webpack
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        zlib: require.resolve("browserify-zlib"),
      };
      return webpackConfig;
    },
  },

  // Ajouter ou personnaliser des plugins
  plugins: [
    // Exemple : Ajout d'un plugin spécifique (remplacez 'MonPlugin' par le plugin réel)
    /*{
        plugin: require('MonPlugin'),
        options: {
          // Options du plugin
        }
      }*/
  ],

  // Autres configurations spécifiques...
};
