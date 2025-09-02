import { ReactElement } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  Switch,
  Typography,
  useTheme,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Quiz } from "@mui/icons-material";

import { QuestionOfDay } from "../../types";

interface FunTabProps {
  questionOfDay: QuestionOfDay;
  onQuestionOfTheDayChange: (questionOfDay: QuestionOfDay) => void;
}

export const FunTab = (props: FunTabProps): ReactElement => {
  const { questionOfDay, onQuestionOfTheDayChange } = props;
  const { includeQuestion, question, isDuringStandup } = questionOfDay;
  const { palette } = useTheme();
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              color={palette.grey[800]}
              fontSize={18}
              fontWeight={500}
            >
              Question of the Day
            </Typography>
            <Quiz sx={{ fill: palette.grey[800] }} />
          </Box>
          <Typography fontSize={14} color={palette.grey[700]}>
            Get to know your team better by asking a question of the day.
          </Typography>
        </Box>
        <Switch
          checked={questionOfDay.includeQuestion}
          onChange={(event) =>
            onQuestionOfTheDayChange({
              ...questionOfDay,
              includeQuestion: event.target.checked,
            })
          }
        />
      </Box>
      {includeQuestion && (
        <>
          <RadioGroup
            name="qod-timing"
            value={isDuringStandup ? "during" : "after"}
            onChange={(_, value) =>
              onQuestionOfTheDayChange({
                ...questionOfDay,
                isDuringStandup: value === "during",
              })
            }
          >
            <FormControlLabel
              value="after"
              control={<Radio />}
              label="After Standup"
            />
            <FormControlLabel
              value="during"
              control={<Radio />}
              label="During Standup"
            />
          </RadioGroup>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Question"
              placeholder="e.g. What's your favorite season and why?"
              value={question}
              onChange={(e) =>
                onQuestionOfTheDayChange({
                  ...questionOfDay,
                  question: e.target.value,
                })
              }
              sx={{
                width: "100%",
                mt: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};
