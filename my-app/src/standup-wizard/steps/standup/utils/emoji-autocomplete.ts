export type EmojiOption = {
  emoji: string;
  name: string;
};

export type EmojiMatch = {
  query: string;
  start: number;
};

const MAX_EMOJI_RESULTS = 8;

export const EMOJI_OPTIONS: EmojiOption[] = [
  { emoji: "😀", name: "grinning" },
  { emoji: "😄", name: "smile" },
  { emoji: "😂", name: "joy" },
  { emoji: "😊", name: "blush" },
  { emoji: "😉", name: "wink" },
  { emoji: "😍", name: "heart_eyes" },
  { emoji: "🤔", name: "thinking" },
  { emoji: "👍", name: "thumbsup" },
  { emoji: "👏", name: "clap" },
  { emoji: "🙌", name: "raised_hands" },
  { emoji: "🔥", name: "fire" },
  { emoji: "✅", name: "white_check_mark" },
  { emoji: "🚀", name: "rocket" },
  { emoji: "🎉", name: "tada" },
  { emoji: "💡", name: "bulb" },
  { emoji: "🧠", name: "brain" },
  { emoji: "🐛", name: "bug" },
  { emoji: "🛠️", name: "hammer_and_wrench" },
  { emoji: "📌", name: "pushpin" },
  { emoji: "📈", name: "chart_with_upwards_trend" },
  { emoji: "🎯", name: "dart" },
  { emoji: "👀", name: "eyes" },
  { emoji: "🫠", name: "melting_face" },
];

export const getEmojiMatch = (
  value: string,
  cursor: number
): EmojiMatch | null => {
  const beforeCursor = value.slice(0, cursor);
  const colonIndex = beforeCursor.lastIndexOf(":");

  if (colonIndex === -1) {
    return null;
  }

  const beforeColon = colonIndex > 0 ? beforeCursor[colonIndex - 1] : "";
  if (beforeColon && !/\s/.test(beforeColon)) {
    return null;
  }

  const query = beforeCursor.slice(colonIndex + 1);
  if (/\s/.test(query) || query.includes(":")) {
    return null;
  }

  return { query: query.toLowerCase(), start: colonIndex };
};

export const getFilteredEmojiOptions = (
  emojiMatch: EmojiMatch | null
): EmojiOption[] => {
  if (!emojiMatch) {
    return [];
  }

  if (!emojiMatch.query) {
    return EMOJI_OPTIONS.slice(0, MAX_EMOJI_RESULTS);
  }

  return EMOJI_OPTIONS.filter((option) =>
    option.name.includes(emojiMatch.query)
  ).slice(0, MAX_EMOJI_RESULTS);
};

export const insertEmojiAtCursor = ({
  value,
  cursor,
  emojiMatch,
  option,
}: {
  value: string;
  cursor: number;
  emojiMatch: EmojiMatch;
  option: EmojiOption;
}): { updatedValue: string; nextCursor: number } => {
  const updatedValue =
    value.slice(0, emojiMatch.start) + `${option.emoji} ` + value.slice(cursor);
  const nextCursor = emojiMatch.start + option.emoji.length + 1;

  return { updatedValue, nextCursor };
};
