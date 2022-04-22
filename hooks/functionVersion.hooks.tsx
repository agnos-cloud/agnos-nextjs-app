import { ReactElement, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
} from "@mui/material";
import {
  Description as DesignIcon,
  Language as EnvIcon,
  Person as UserIcon,
} from "@mui/icons-material";
import { nanoid } from "nanoid";
import Editor from "../components/Editor";
import { PermissionScope } from "../constants/permissions";
import { testDataSchema } from "../schema/testDataSchema";

// TODO: maybe we should allow a function to execute another function: run(functionId, context)
// in that case we may want to fetch the IDs of executable functions so the editor can hint them to the developer
export function useFunctionVersionForm() {
  const [name, setName] = useState<string>(`v${nanoid()}`);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [published, setPublished] = useState<boolean>(false);
  const [code, setCode] = useState<string | undefined>("");
  const [scopes, setScopes] = useState<Array<string>>([]);
  const [testData, setTestData] = useState<string | undefined>("");
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

  const handleCodeChange = (value: string | undefined) => {
    setCode(value);
  };

  const handleScopeToggle = (value: string) => () => {
    const currentIndex = scopes.indexOf(value);
    const newScopes = [...scopes];

    if (currentIndex === -1) {
      newScopes.push(value);
    } else {
      newScopes.splice(currentIndex, 1);
    }

    setScopes(newScopes);
  };

  const handleTestDataChange = (value: string | undefined) => {
    setTestData(value);
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
        onChange={handleCodeChange}
        onValidationError={handleValidationError}
      />
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        subheader={<FormLabel>Permissions</FormLabel>}
      >
        {Object.keys(PermissionScope).map((scope) => {
          const labelId = `checkbox-list-secondary-label-${scope}`;
          return (
            <ListItem
              key={scope}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleScopeToggle(scope)}
                  checked={scopes.indexOf(scope) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
              disablePadding
            >
              <ListItemIcon>
                {scope === PermissionScope["READ:DESIGN"] && <DesignIcon />}
                {scope === PermissionScope["READ:ENVIRONMENT"] && <EnvIcon />}
                {scope === PermissionScope["READ:USER"] && <UserIcon />}
              </ListItemIcon>
              <ListItemText id="switch-list-label-wifi" primary={scope} />
            </ListItem>
          );
        })}
      </List>
      <FormLabel>Test Data</FormLabel>
      <Editor
        value={testData}
        schemas={[testDataSchema]}
        onChange={handleTestDataChange}
        onValidationError={handleValidationError}
      />
    </>
  );

  return {
    name,
    description,
    code,
    published,
    scopes,
    testData,
    setName,
    setDescription,
    setCode,
    setPublished,
    setScopes,
    setTestData,
    form,
    errors,
  };
}
