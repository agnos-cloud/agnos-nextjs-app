import React, { ReactElement, useState } from "react";
import {
  Box,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
} from "@mui/material";
import { nanoid } from "nanoid";
import Editor from "../components/Editor";
import { pluginVersionSchema } from "../schema/pluginVersionConfigSchema";
import type { Menu, MenuItem } from "../models/Menu";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import MenuItemIcon from "../components/MenuItemIcon";
import MenuItemForms from "../components/MenuItemForms";

export function usePluginVersionForm() {
  const [id, setId] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string>(`Version ${nanoid()}`);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [published, setPublished] = useState<boolean>(false);
  const [config, setConfig] = useState<string | undefined>("");
  const [menus, setMenus] = useState<Menu[]>([]);
  const [errors, setErrors] = useState<any[]>([]);
  const [functions, setFunctions] = useState<string[]>([
    "deploy-function-to-aws-hsdhsdghds",
    "deploy-function-to-gcp-cbsdbndsjg",
  ]);
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<null | HTMLElement>(null);
  const [menuItemAnchorElement, setMenuItemAnchorElement] =
    useState<null | HTMLElement>(null);
  const isMenuOpen = (id: string) =>
    menuAnchorElement ? menuAnchorElement.id === id : false;
  const isMenuItemOpen = (id: string) =>
    menuItemAnchorElement ? menuItemAnchorElement.id === id : false;

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

  const handleMenuClick = (event: React.SyntheticEvent<any>) => {
    if (isMenuOpen(event.currentTarget.id)) {
      setMenuAnchorElement(null);
    } else {
      setMenuAnchorElement(event.currentTarget);
    }
  };

  const handleMenuItemClick = (event: React.SyntheticEvent<any>) => {
    if (isMenuItemOpen(event.currentTarget.id)) {
      setMenuItemAnchorElement(null);
    } else {
      setMenuItemAnchorElement(event.currentTarget);
    }
  };

  const form: ReactElement = (
    <>
      <TextField
        autoFocus
        margin="dense"
        id="_name"
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
        id="_description"
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
      {id ? <hr /> : <></>}
      {id && menus.length ? (
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {menus.map((menu: Menu) => (
            <React.Fragment key={menu.id}>
              <ListItemButton id={menu.id} onClick={handleMenuClick}>
                <ListItemText primary={menu.title} />
                {isMenuOpen(menu.id) ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={isMenuOpen(menu.id)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.items.map((item: MenuItem) =>
                    item.isDivider ? (
                      <Divider key={item.id} />
                    ) : (
                      <React.Fragment key={item.id}>
                        <ListItem
                          id={item.id}
                          sx={{ pl: 4 }}
                          onClick={handleMenuItemClick}
                        >
                          <ListItemIcon>
                            <MenuItemIcon item={item} />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                          {isMenuItemOpen(item.id) ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItem>
                        <Collapse
                          in={isMenuItemOpen(item.id)}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              // minHeight: "100vh",
                            }}
                          >
                            <MenuItemForms item={item} />
                          </Box>
                        </Collapse>
                      </React.Fragment>
                    )
                  )}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      ) : (
        <></>
      )}
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
    setMenus,
    setPublished,
    form,
    errors,
  };
}
