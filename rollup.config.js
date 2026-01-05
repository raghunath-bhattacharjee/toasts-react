import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

export default {
    input: "src/index.js",

    external: [
        "react",
        "react-dom",
        "react/jsx-runtime"
    ],

    output: [
        {
            file: "dist/index.esm.js",
            format: "esm",
            sourcemap: true
        },
        {
            file: "dist/index.cjs.js",
            format: "cjs",
            exports: "named",
            sourcemap: true
        }
    ],

    plugins: [
        resolve({
            extensions: [".js", ".jsx"]
        }),
        commonjs(),
        babel({
            babelHelpers: "bundled",
            exclude: "node_modules/**"
        }),
        terser()
    ]
};
