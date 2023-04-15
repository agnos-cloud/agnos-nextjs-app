import { ProjectInput } from "@models/project";
import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { useState } from "react";

export interface CreateProjectFormProps {
  onChange: (project: Omit<ProjectInput, "org">) => void;
}

function CreateProjectForm(props: CreateProjectFormProps) {
  const { onChange } = props;

  const [internalName, setInternalName] = useState("");
  const [internalDescription, setInternalDescription] = useState("");
  const [internalPrivate, setInternalPrivate] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalName(event.target.value);
    onChange({
      name: event.target.value,
      description: internalDescription,
      private: internalPrivate,
    });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalDescription(event.target.value);
    onChange({
      name: internalName,
      description: event.target.value,
      private: internalPrivate,
    });
  };

  const handleIsPrivareChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalPrivate(event.target.checked);
    onChange({
      name: internalName,
      description: internalDescription,
      private: event.target.checked,
    });
  };

  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        type="text"
        fullWidth
        variant="standard"
        value={internalName}
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
        value={internalDescription}
        onChange={handleDescriptionChange}
      />
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={internalPrivate} onChange={handleIsPrivareChange} />}
          label="Private"
        />
      </FormGroup>
    </>
  );
}

export default CreateProjectForm;
