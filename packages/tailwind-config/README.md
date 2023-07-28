# @stampix/tailwind-config

A Tailwind CSS config that is used across the Tourney UI

## Usage

Add the package to your project:

```json
{
  "dependencies": {
    "@stampix/tailwind-config": "workspace:*"
  }
}
```

Then add the config to your tailwind.config.js:

```javascript
module.exports = require("@stampix/tailwind-config");
```

## Extending the config

You can extend the config by adding a tailwind.config.js file to your project and adding your customizations there. For example:

```javascript
module.exports = {
  presets: [require("@stampix/tailwind-config")],
  // ...
};
```
