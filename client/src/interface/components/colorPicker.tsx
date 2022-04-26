import React from "react";
import { CirclePicker } from "react-color";

interface ColorPickerProps {
  color: string;
  onColorChanged: (color: string) => void;
}

export const ColorPicker: React.FunctionComponent<ColorPickerProps> = ({
  color,
  onColorChanged,
}) => {
  const handleChangeComplete = (color: any) => {
    onColorChanged(color.hex);
  };

  return <CirclePicker color={color} onChangeComplete={handleChangeComplete} />;
};
