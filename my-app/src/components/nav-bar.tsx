import { ReactElement, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import {
  Home,
  Group,
  History,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

import { useAppThemeStore } from "../stores/app-theme-store";
import { COLOR_SHADES } from "../standup-wizard/constants";

const NAV_ITEMS = [
  { label: "Home", icon: <Home />, path: "/standup" },
  { label: "Team Members", icon: <Group />, path: "/team-members" },
  { label: "Standup History", icon: <History />, path: "/standup-history" },
];

const EXPANDED_WIDTH = 220;
const COLLAPSED_WIDTH = 64;

const hexToRgba = (hex: string, alpha: number): string => {
  const h = hex.replace("#", "");
  const n =
    h.length === 3
      ? h
          .split("")
          .map((c) => `${c}${c}`)
          .join("")
      : h;
  const v = Number.parseInt(n, 16);
  return `rgba(${(v >> 16) & 255}, ${(v >> 8) & 255}, ${v & 255}, ${alpha})`;
};

export const NavBar = (): ReactElement => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [{ themeColor }] = useAppThemeStore();
  const shade = COLOR_SHADES[themeColor];

  const width = expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH;

  return (
    <Box
      sx={{
        width,
        minWidth: width,
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(180deg, rgba(255,255,255,0.96), ${hexToRgba(shade.light, 0.18)})`,
        borderRight: `1px solid ${hexToRgba(shade.dark, 0.12)}`,
        boxShadow: `2px 0 16px ${hexToRgba(shade.dark, 0.08)}`,
        transition: "width 0.2s ease, min-width 0.2s ease",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Nav items */}
      <Box
        sx={{
          flex: 1,
          pt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Tooltip
              key={item.path}
              title={expanded ? "" : item.label}
              placement="right"
            >
              <Box
                onClick={() => navigate(item.path)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mx: 1,
                  px: 1.5,
                  py: 1.25,
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  backgroundColor: isActive
                    ? hexToRgba(shade.main, 0.12)
                    : "transparent",
                  "&:hover": {
                    backgroundColor: isActive
                      ? hexToRgba(shade.main, 0.16)
                      : hexToRgba(shade.main, 0.06),
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                    color: isActive ? shade.dark : "rgba(19, 41, 61, 0.55)",
                    "& .MuiSvgIcon-root": { fontSize: 24 },
                  }}
                >
                  {item.icon}
                </Box>
                {expanded && (
                  <Typography
                    noWrap
                    sx={{
                      fontSize: 15,
                      fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? shade.dark : "rgba(19, 41, 61, 0.78)",
                    }}
                  >
                    {item.label}
                  </Typography>
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Box>

      {/* Collapse toggle */}
      <Box
        sx={{
          display: "flex",
          justifyContent: expanded ? "flex-end" : "center",
          p: 1,
          borderTop: `1px solid ${hexToRgba(shade.dark, 0.08)}`,
        }}
      >
        <IconButton
          size="small"
          onClick={() => setExpanded((prev) => !prev)}
          sx={{
            color: hexToRgba(shade.dark, 0.5),
            "&:hover": {
              backgroundColor: hexToRgba(shade.main, 0.08),
              color: shade.dark,
            },
          }}
        >
          {expanded ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
    </Box>
  );
};
