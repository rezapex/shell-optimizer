module.exports = {
    extends: ["@raycast"],
    rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "react/jsx-key": ["error", {
            "checkFragmentShorthand": true,
            "checkKeyMustBeforeSpread": true
        }]
    }
}; 