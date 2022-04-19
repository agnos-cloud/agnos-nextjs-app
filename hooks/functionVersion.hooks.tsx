import { ReactElement, useState } from "react";
import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  TextField,
} from "@mui/material";
import { nanoid } from "nanoid";
import Editor from "../components/Editor";

// TODO: maybe we should allow a function to execute another function: run(functionId, context)
// in that case we may want to fetch the IDs of executable functions so the editor can hint them to the developer
export function useFunctionVersionForm() {
  const [name, setName] = useState<string>(`v${nanoid()}`);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [published, setPublished] = useState<boolean>(false);
  const [code, setCode] = useState<string | undefined>("");
  const [errors, setErrors] = useState<any[]>([]);

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
    setPublished(event.target.checked);
  };

  const handleConfigChange = (value: string | undefined) => {
    setCode(value);
  };

  const handleValidationError = (errors: any[]) => {
    setErrors(errors);
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
            <Switch checked={published} onChange={handleIsPrivareChange} />
          }
          label="Published"
        />
      </FormGroup>
      <FormLabel>Code</FormLabel>
      <Editor
        value={code}
        language="javascript"
        onChange={handleConfigChange}
        onValidationError={handleValidationError}
      />
    </>
  );

  return {
    name,
    description,
    code,
    published,
    setName,
    setDescription,
    setCode,
    setPublished,
    form,
    errors,
  };
}
