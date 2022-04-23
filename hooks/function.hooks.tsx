import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { nanoid } from "nanoid";
import { ReactElement, useState } from "react";

export function useCreateFunctionForm() {
  const [name, setName] = useState<string>(`Function ${nanoid()}`);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleIsPrivareChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPrivate(event.target.checked);
  };

  const form: ReactElement = (
    <>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        type="text"
        fullWidth
        variant="standard"
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        autoFocus
        margin="dense"
        id="description"
        label="Description"
        type="text"
        fullWidth
        variant="standard"
        multiline
        rows={4}
        value={description}
        onChange={handleDescriptionChange}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={isPrivate} onChange={handleIsPrivareChange} />
          }
          label="Private"
        />
      </FormGroup>
    </>
  );

  return {
    name,
    description,
    private: isPrivate,
    form,
  };
}
