import React, { ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Colors } from "../../types";
import { COLOR_SHADES } from "../../constants";

interface ThemeTabProps {
  selectedColor: Colors;
  onColorSelect: (color: Colors) => void;
}

export const ThemeTab = ({
  selectedColor,
  onColorSelect,
}: ThemeTabProps): ReactElement => {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(92px, 1fr))",
        gap: 1.75,
        width: "100%",
        maxWidth: 430,
        mt: 2,
      }}
    >
      {Object.values(Colors).map((color) => {
        const isSelected = color === selectedColor;
        return (
          <Box
            component="button"
            type="button"
            key={color}
            onClick={() => onColorSelect(color)}
            aria-pressed={isSelected}
            sx={{
              all: "unset",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.65,
              borderRadius: 2.5,
              padding: 1,
              border: isSelected
                ? `2px solid ${COLOR_SHADES[color].dark}`
                : `1px solid ${alpha(palette.text.primary, 0.08)}`,
              background: isSelected
                ? alpha(COLOR_SHADES[color].light, 0.2)
                : alpha(palette.background.paper, 0.7),
              boxShadow: isSelected
                ? `0 8px 20px ${alpha(COLOR_SHADES[color].dark, 0.26)}`
                : `0 2px 8px ${alpha(palette.text.primary, 0.08)}`,
              transform: isSelected ? "translateY(-2px)" : "none",
              transition:
                "transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease, background-color 0.16s ease",
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: `0 8px 16px ${alpha(COLOR_SHADES[color].dark, 0.18)}`,
              },
              "&:focus-visible": {
                outline: `3px solid ${alpha(COLOR_SHADES[color].main, 0.4)}`,
                outlineOffset: 2,
              },
            }}
          >
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: 2.2,
                border: `1px solid ${alpha(COLOR_SHADES[color].dark, 0.3)}`,
                background: `linear-gradient(140deg, ${COLOR_SHADES[color].light}, ${COLOR_SHADES[color].main})`,
              }}
            />
            <Typography fontWeight={700} fontSize={13.5}>
              {COLOR_SHADES[color].name}
            </Typography>
            {isSelected ? (
              <Typography
                fontSize={11}
                fontWeight={700}
                color={COLOR_SHADES[color].dark}
                sx={{ letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                Selected
              </Typography>
            ) : (
              <Box sx={{ height: 16 }} />
            )}
          </Box>
        );
      })}
    </Box>
  );
};
