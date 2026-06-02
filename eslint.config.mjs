import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import globals from "globals";

export default defineConfig([{
    extends: [...nextCoreWebVitals],

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: 12,
        sourceType: "module",
    },

    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"],
        "no-unused-vars": "warn",
        "react/react-in-jsx-scope": "off",
    },
}]);