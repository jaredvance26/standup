import { FocusEvent, KeyboardEvent, RefObject, useMemo, useState } from "react";
import {
  EmojiMatch,
  EmojiOption,
  getEmojiMatch,
  getFilteredEmojiOptions,
  insertEmojiAtCursor,
} from "../utils";

type UseEmojiAutocompleteArgs = {
  value: string;
  onValueChange: (value: string) => void;
  inputRef: RefObject<HTMLTextAreaElement | null>;
};

type UseEmojiAutocompleteResult = {
  filteredEmojiOptions: EmojiOption[];
  selectedEmojiIndex: number;
  isEmojiMenuOpen: boolean;
  handleInputChange: (value: string, cursor: number) => void;
  handleInputInteraction: () => void;
  handleInputKeyUp: (event: KeyboardEvent<HTMLDivElement>) => void;
  handleFocus: (event: FocusEvent<HTMLTextAreaElement>) => void;
  handleBlur: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  handleSelectOption: (option: EmojiOption) => void;
};

export const useEmojiAutocomplete = ({
  value,
  onValueChange,
  inputRef,
}: UseEmojiAutocompleteArgs): UseEmojiAutocompleteResult => {
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const [emojiMatch, setEmojiMatch] = useState<EmojiMatch | null>(null);
  const [selectedEmojiIndex, setSelectedEmojiIndex] = useState<number>(0);

  const filteredEmojiOptions = useMemo(
    () => getFilteredEmojiOptions(emojiMatch),
    [emojiMatch]
  );

  const updateEmojiMatchFromInput = (nextValue: string, cursor: number) => {
    setCursorPosition(cursor);
    const match = getEmojiMatch(nextValue, cursor);
    setEmojiMatch(match);
    setSelectedEmojiIndex(0);
  };

  const handleInputChange = (nextValue: string, cursor: number) => {
    onValueChange(nextValue);
    updateEmojiMatchFromInput(nextValue, cursor);
  };

  const handleInputInteraction = () => {
    const notesInput = inputRef.current;
    if (!notesInput) {
      return;
    }

    const cursor = notesInput.selectionStart ?? notesInput.value.length;
    updateEmojiMatchFromInput(notesInput.value, cursor);
  };

  const closeEmojiMenu = () => {
    setEmojiMatch(null);
  };

  const handleInputKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === "Enter" ||
      event.key === "Tab" ||
      event.key === "Escape"
    ) {
      return;
    }

    handleInputInteraction();
  };

  const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    if (cursorPosition === null) {
      return;
    }

    event.target.selectionStart = cursorPosition;
    event.target.selectionEnd = cursorPosition;
  };

  const handleBlur = () => {
    setTimeout(() => closeEmojiMenu(), 100);
  };

  const handleSelectOption = (option: EmojiOption) => {
    if (!emojiMatch) {
      return;
    }

    const cursor = cursorPosition ?? value.length;
    const { updatedValue, nextCursor } = insertEmojiAtCursor({
      value,
      cursor,
      emojiMatch,
      option,
    });

    onValueChange(updatedValue);
    setCursorPosition(nextCursor);
    closeEmojiMenu();

    requestAnimationFrame(() => {
      if (!inputRef.current) {
        return;
      }

      inputRef.current.focus();
      inputRef.current.selectionStart = nextCursor;
      inputRef.current.selectionEnd = nextCursor;
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!emojiMatch || filteredEmojiOptions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedEmojiIndex((current) =>
        current + 1 >= filteredEmojiOptions.length ? 0 : current + 1
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedEmojiIndex((current) =>
        current === 0 ? filteredEmojiOptions.length - 1 : current - 1
      );
      return;
    }

    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      handleSelectOption(filteredEmojiOptions[selectedEmojiIndex]);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeEmojiMenu();
    }
  };

  return {
    filteredEmojiOptions,
    selectedEmojiIndex,
    isEmojiMenuOpen: Boolean(emojiMatch) && filteredEmojiOptions.length > 0,
    handleInputChange,
    handleInputInteraction,
    handleInputKeyUp,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleSelectOption,
  };
};
