module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ["google"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    "object-curly-spacing": ["error", "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "never",
        objects: "only-multiline",
        imports: "never",
        exports: "never",
        functions: "never",
      },
    ],
  },
};
