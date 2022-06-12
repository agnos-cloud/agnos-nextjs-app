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
import { pluginVersionSchema } from "../schema/pluginVersionConfigSchema";

export function usePluginVersionForm() {
  const [id, setId] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string>(`Version ${nanoid()}`);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [published, setPublished] = useState<boolean>(false);
  const [config, setConfig] = useState<string | undefined>("");
  const [errors, setErrors] = useState<any[]>([]);
  const [functions, setFunctions] = useState<string[]>([
    "deploy-function-to-aws-hsdhsdghds",
    "deploy-function-to-gcp-cbsdbndsjg",
  ]);

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
    setConfig(value);
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
      <FormLabel>Config</FormLabel>
      <Editor
        value={config}
        schemas={[pluginVersionSchema(functions)]}
        onChange={handleConfigChange}
        onValidationError={handleValidationError}
      />
    </>
  );

  return {
    id,
    name,
    description,
    config,
    published,
    setId,
    setName,
    setDescription,
    setConfig,
    setPublished,
    form,
    errors,
  };
}
