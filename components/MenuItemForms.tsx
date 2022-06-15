import React from "react";
import { useTheme } from "@mui/material/styles";
import type { MenuItem } from "../models/Menu";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  MobileStepper,
  Paper,
  Typography,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import type { FormAction, FormField, FormFieldGroup } from "../models/Form";

export type MenuItemFormsProps = {
  item: MenuItem;
};

const MenuItemForms = (props: MenuItemFormsProps) => {
  const { item } = props;
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [form, setForm] = React.useState<Record<string, any>>({});
  const forms = item.forms;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (forms && forms.length) {
    const maxSteps = forms.length;
    return (
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography>{forms[activeStep].title}</Typography>
        </Paper>
        <Box sx={{ height: 255, maxWidth: 400, width: "100%", p: 0 }}>
          <FormControl component="fieldset" variant="standard">
            {forms[activeStep].fields?.map((field) => (
              <Field field={field} form={form} setForm={setForm} />
            ))}
          </FormControl>
          <Actions actions={forms[activeStep].actions} form={form} />
        </Box>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    );
  }

  return <></>;
};

type FieldProps = {
  field: FormField | FormFieldGroup;
  form: Record<string, any>;
  setForm: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

const Field = (props: FieldProps) => {
  const { field, form, setForm } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));

  if ("fields" in field && field.fields && field.fields.length) {
    return (
      <FormGroup sx={{ m: 1 }}>
        <FormLabel component="caption">{field.title}</FormLabel>
        {field.fields?.map((f, i) => (
          <Field key={i} field={f} form={form} setForm={setForm} />
        ))}
      </FormGroup>
    );
  } else if ("name" in field && field.name) {
    if (field.default && !form[field.name]) {
      setForm((previous) => ({
        ...previous,
        [field.name]: field.default,
      }));
    }

    return (
      <FormControlLabel
        label={field.title}
        labelPlacement="start"
        control={
          <Input
            sx={{ ml: 2 }}
            // variant="outlined"
            id={field.name}
            name={field.name}
            type={field.type}
            // defaultValue={field.default}
            required={field.required}
            value={form[field.name] || field.default || ""}
            onChange={handleChange}
          />
        }
      />
    );
  }

  return <></>;
};

type ActionsProps = {
  actions?: Array<FormAction>;
  form: Record<string, any>;
};

const Actions = (props: ActionsProps) => {
  const { actions, form } = props;
  const [value, setValue] = React.useState(0);

  if (!actions || !actions.length) {
    return <></>;
  }

  return (
    <Paper
      // sx={{ position: "absolute", bottom: 50 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        {actions?.map((action: FormAction) => (
          <BottomNavigationAction
            label={action.title}
            onClick={() => alert(JSON.stringify(form))}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default MenuItemForms;
