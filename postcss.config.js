import oklab from "@csstools/postcss-oklab-function";

export default {
  plugins: [oklab({ preserve: false })],
};
