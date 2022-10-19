module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-easy-import'),
        require('postcss-import'),
        require('postcss-hexrgba'),
        require('postcss-mixins'),
        require('postcss-conditionals'),
        require('postcss-nested'),
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('postcss-simple-vars')({
            variables() {
                return require('./src/styles/variables');
            },
        }),
        require('postcss-preset-env')
    ],
};
