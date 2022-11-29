const path = require("path");

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  extends: ["airbnb-base", "plugin:vue/recommended", "prettier"],
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", path.resolve(__dirname, "src")]],
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".vue", ".json"],
      },
    },
  },
  rules: {
    "import/extensions": [2, { vue: "ignorePackages", mjs: "always" }],
    "import/no-extraneous-dependencies": [2, { devDependencies: true }],

    "vue/name-property-casing": [0, "PascalCase"],
    "vue/no-v-html": 0,
    "vue/require-default-prop": 0,
    "vue/no-mutating-props": 1,

    "accessor-pairs": 2,
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      {
        selector: "LabeledStatement",
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
    ],
    eqeqeq: 0,
    "no-cond-assign": 2,
    "no-unmodified-loop-condition": 2,
    "no-useless-call": 2,
    "wrap-iife": [2, "any"],
    "no-plusplus": 0,
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    "no-param-reassign": 1,
    "prefer-arrow-callback": [
      2,
      {
        allowUnboundThis: true,
        allowNamedFunctions: true,
      },
    ],
    "consistent-return": 1,
    "no-continue": 1,
  },
};
