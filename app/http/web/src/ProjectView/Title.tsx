import { Typography, Input } from '@material-ui/core';
import React, { useState } from 'react';

interface ITitleProps {
  name: string,

  onUpdate(name: string): void
}

const Title: React.FC<ITitleProps> = (props) => {
  const { name, onUpdate } = props;
  const [value, setValue] = useState(name);
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <Input
      value={value}
      onChange={(e) => {
        if (e.target.value) {
          setValue(e.target.value);
        }
      }}
      onBlur={() => {
        onUpdate(value);
        setIsEdit(false);
      }}
    />
  ) : (
    <Typography onClick={() => setIsEdit(true)} component="h2">{value}</Typography>
  );
};

export default Title;
