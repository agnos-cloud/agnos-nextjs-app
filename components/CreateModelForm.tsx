import { ComponentInput } from "@models/component";
import { DesignInput } from "@models/design";
import { ProjectInput } from "@models/project";
import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { useState } from "react";

type ModelInput = Omit<ComponentInput, "org" | "version"> | Omit<DesignInput, "project"> | Omit<ProjectInput, "org">;

export interface CreateModelFormProps {
  hidePrivateField?: boolean;
  onChange: (model: ModelInput) => void;
}

function CreateModelForm(props: CreateModelFormProps) {
  const { hidePrivateField, onChange } = props;

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

  const handleIsPrivateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      {!hidePrivateField && (
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={internalPrivate} onChange={handleIsPrivateChange} />}
            label="Private"
          />
        </FormGroup>
      )}
    </>
  );
}

export default CreateModelForm;
