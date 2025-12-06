import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("mode-select", "routes/mode-select.tsx"),
  route("game/:levelId", "routes/game.tsx"),
  route("level-select", "routes/level-select.tsx"),
  route("settings", "routes/settings.tsx"),
] satisfies RouteConfig;
