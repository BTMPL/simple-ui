/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const pkg = require('../package.json');

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*']));

const modules = [
  'Select/Select.js',
  'Radio/Radio.js',
  'Themes/variables.js',
  'atoms/Dot/index.js',
  'atoms/DotOutline/index.js',
];


modules.forEach((module) => {
  promise = promise.then(() => rollup.rollup({
    input: `src/${module}`,
    external: Object.keys(pkg.dependencies),
    plugins: [babel({
      babelrc: false,
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      presets: [
        ["babel-preset-es2015", { modules: false }],
        "react"
      ],
      "plugins": ["babel-plugin-transform-class-properties", "transform-object-assign"]
    })],
  }).then(bundle => bundle.write({
    dir: `dist`,
    file: `dist/${module}`,
    format: 'es',
    sourcemap: true,
  })));
});

// Copy package.json and LICENSE.txt
promise = promise.then(() => {
  delete pkg.private;
  delete pkg.devDependencies;
  delete pkg.scripts;
  delete pkg.eslintConfig;
  delete pkg.babel;
  fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
});

promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console