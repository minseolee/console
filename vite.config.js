import path from 'path';

import vuePlugin from '@vitejs/plugin-vue2';
import autoprefixer from 'autoprefixer';
import postcssConditionals from 'postcss-conditionals';
import postcssEasyImport from 'postcss-easy-import';
import postcssHexRgba from 'postcss-hexrgba';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import postcssSimpleVars from 'postcss-simple-vars';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

import * as variables from './src/styles/variables';

export default defineConfig({
    plugins: [
        vuePlugin(),
    ],
    css: {
        postcss: {
            plugins: [
                tailwindcss(),
                autoprefixer(),
                postcssEasyImport(),
                postcssImport(),
                postcssHexRgba(),
                postcssMixins(),
                postcssConditionals(),
                postcssNested(),
                postcssSimpleVars({ variables() { return variables; } }),
                postcssPresetEnv(),
            ]
        }
    },
    server: {
        port: 8080,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@spaceone/console-core-lib': path.resolve(__dirname, './packages/@spaceone/console-core-lib/dist/'),
            '@cloudforet/core-lib': path.resolve(__dirname, './packages/cloudforet/core-lib/dist/'),
            '@cloudforet/language-pack': path.resolve(__dirname, './packages/cloudforet/language-pack/'),
            vue: path.resolve(__dirname, './node_modules/vue/dist/vue.js'),
        },
    },
});
