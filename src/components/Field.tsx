// components/Field.tsx
import React from "react";
import { TextField, Text } from "@radix-ui/themes";

interface FieldProps {
  label: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
}

const Field: React.FC<FieldProps> = ({
  label,
  placeholder = "",
  value,
  setValue,
}) => {
  return (
    <>
      <Text as="label" size="2" weight="regular">
        {label}
      </Text>
      <TextField.Root
        variant="soft"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default Field;
