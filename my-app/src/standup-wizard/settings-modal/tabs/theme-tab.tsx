import React, { ReactElement } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
    <Box>
      <Typography fontSize={24} fontWeight={500} mb={3}>
        Select a color:
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          maxWidth: 300,
        }}
      >
        {Object.values(Colors).map((color) => (
          <Box display="flex" alignItems="center" justifyItems='center' flexDirection='column' key={color}>
            <Box
              marginBottom={1}
              onClick={() => onColorSelect(color)}
              sx={{
                cursor: "pointer",
                backgroundColor: COLOR_SHADES[color].main,
                width: 50,
                height: 50,
                borderRadius: 3,
                border:
                  color === selectedColor
                    ? `3px solid ${COLOR_SHADES[color].dark}`
                    : `2px solid ${COLOR_SHADES[color].main}`,
              }}
            >
              {color === selectedColor && (
                <CheckCircleIcon
                  sx={{
                    marginLeft: 0.5,
                    color: palette.common.white,
                    opacity: 0.6,
                    fontSize: 35,
                    marginTop: 0.5,
                  }}
                />
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography fontWeight={500}>{COLOR_SHADES[color].name}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
