module.exports = {
    "env": {
        "node": true,
        "mocha": true,
        "mongo": true,
        "browser": true
    },
    "plugins": ["pug"],
    "extends": "standard",
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "rules": {
        "no-path-concat": [0],
        "no-unused-vars": [1],
        "no-unused-expressions": [1]
    }
};