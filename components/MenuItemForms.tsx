import React from "react";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import type { MenuItem } from "../models/Menu";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  InputLabel,
  MenuItem as MuiMenuItem,
  MobileStepper,
  Paper,
  Radio,
  RadioGroup,
  Rating,
  Select,
  SelectChangeEvent,
  Switch,
  Typography,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import type { Form as FormModel, FormAction, FormField, FormFieldGroup } from "../models/Form";
import FunctionVersionService from "../services/FunctionVersionService";
import { useUser } from "@auth0/nextjs-auth0";
import Toast from "./Toast";
import { InvocationType } from "../constants/invocation";

export type MenuItemFormsProps = {
  item: MenuItem;
};

const MenuItemForms = (props: MenuItemFormsProps) => {
  const { item } = props;
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
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
        {forms.map((form, index) => (
          <Form key={index} form={form} sx={{ display: index === activeStep ? "block" : "none" }} />
        ))}
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="bottom"
          // sx={{ position: "absolute", bottom: 0 }}
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </Box>
    );
  }

  return <></>;
};

type FormProps = {
  form: FormModel;
  sx?: SxProps<Theme>;
};

const Form = (props: FormProps) => {
  const { form: formModel, sx } = props;
  const [form, setForm] = React.useState<Record<string, any>>({});

  return (
    <Box sx={sx}>
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
        <Typography>{formModel.title}</Typography>
      </Paper>
      <Box sx={{ height: 255, maxWidth: 400, width: "100%", p: 0 }}>
        <FormControl component="fieldset" variant="standard" sx={{ mb: 5, alignItems: "start" }}>
          {formModel.fields?.map((field, index) => (
            <Field key={index} field={field} form={form} setForm={setForm} />
          ))}
        </FormControl>
        <Actions actions={formModel.actions} form={form} />
      </Box>
    </Box>
  );
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

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.checked,
    }));

  const handleSelectChange = (event: SelectChangeEvent<any>) =>
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));

  if ("fields" in field && field.fields && field.fields.length) {
    if ("type" in field.fields[0] && field.fields[0].type === "radio") {
      return (
        <FormControl sx={{ m: 1, p: 1, border: "1px solid black", alignItems: "start" }}>
          <FormLabel component="caption">{field.title}</FormLabel>
          <RadioGroup
            name={field.fields[0].name}
            value={form[field.fields[0].name] || field.fields[0].default || ""}
            onChange={handleChange}
            sx={{ alignItems: "start" }}
          >
            {field.fields?.map((f, i) => (
              <Field key={i} field={f} form={form} setForm={setForm} />
            ))}
          </RadioGroup>
        </FormControl>
      );
    }

    if ("type" in field.fields[0] && (field.fields[0].type === "select" || field.fields[0].type === "multi-select")) {
      return (
        <FormControl variant="standard" sx={{ m: 1, p: 1, alignItems: "start", minWidth: 200 }}>
          <InputLabel id={`${field.fields[0].name}-label`}>{field.title}</InputLabel>
          <Select
            labelId={`${field.fields[0].name}-label`}
            id={field.fields[0].name}
            name={field.fields[0].name}
            label={field.title}
            value={form[field.fields[0].name] || (field.fields[0].type === "multi-select" ? [] : "")}
            onChange={handleSelectChange}
            multiple={field.fields[0].type === "multi-select"}
            sx={{ minWidth: 200 }}
          >
            {field.fields.map((f, i) => (
              // <Field key={i} field={f} form={form} setForm={setForm} />
              <MuiMenuItem key={i} value={(f as FormField).default}>
                {f.title}
              </MuiMenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return (
      <FormGroup sx={{ m: 1, p: 1, border: "1px solid black", alignItems: "start" }}>
        <FormLabel component="caption">{field.title}</FormLabel>
        {field.fields?.map((f, i) => (
          <Field key={i} field={f} form={form} setForm={setForm} />
        ))}
      </FormGroup>
    );
  } else if ("name" in field && field.name) {
    if (
      field.type === "button" ||
      field.type === "hidden" ||
      field.type === "image" ||
      field.type === "reset" ||
      field.type === "submit"
    ) {
      return <></>;
    }

    if (field.default && (typeof form[field.name] === "undefined" || form[field.name] === null)) {
      setForm((previous) => ({
        ...previous,
        [field.name]: field.default,
      }));
    }

    if (field.type === "checkbox") {
      return (
        <FormControlLabel
          label={field.title}
          labelPlacement="start"
          control={
            <Checkbox
              sx={{ ml: 2 }}
              id={field.name}
              name={field.name}
              // defaultValue={field.default}
              required={field.required}
              checked={typeof form[field.name] !== "undefined" ? form[field.name] : field.default || false}
              onChange={handleCheckBoxChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
      );
    }

    if (field.type === "color") {
      return (
        <FormControlLabel
          label={field.title}
          labelPlacement="start"
          control={
            <Input
              sx={{ ml: 2, width: 100 }}
              id={field.name}
              name={field.name}
              type="color"
              required={field.required}
              value={form[field.name] || field.default || ""}
              onChange={handleChange}
            />
          }
        />
      );
    }

    if (field.type === "radio") {
      return (
        <FormControlLabel
          label={field.title}
          labelPlacement="start"
          value={field.default}
          control={<Radio sx={{ ml: 2 }} />}
        />
      );
    }

    if (field.type === "rating") {
      return (
        <FormControlLabel
          label={field.title}
          labelPlacement="start"
          control={
            <Rating
              sx={{ ml: 2 }}
              id={field.name}
              name={field.name}
              value={form[field.name] || field.default}
              onChange={(_event: React.SyntheticEvent<Element, Event>, value: number | null) =>
                setForm((previous) => ({
                  ...previous,
                  [field.name]: value,
                }))
              }
            />
          }
        />
      );
    }

    if (field.type === "select" || field.type === "multi-select") {
      return <MuiMenuItem value={field.default}>{field.title}</MuiMenuItem>;
    }

    if (field.type === "switch") {
      return (
        <FormControlLabel
          label={field.title}
          labelPlacement="start"
          control={
            <Switch
              sx={{ ml: 2 }}
              id={field.name}
              name={field.name}
              // defaultValue={field.default}
              required={field.required}
              checked={typeof form[field.name] !== "undefined" ? form[field.name] : field.default || false}
              onChange={handleCheckBoxChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
      );
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
  const { user } = useUser();
  const [openToast, setOpenToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string>("");
  const [toastType, setToastType] = React.useState<InvocationType>(InvocationType.success);

  if (!actions || !actions.length) {
    return <></>;
  }

  return (
    <Paper sx={{ position: "sticky", bottom: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        {actions?.map((action: FormAction, index) => (
          <BottomNavigationAction
            key={index}
            label={action.title}
            onClick={async () => {
              try {
                if (!user) {
                  throw new Error("np user");
                }

                const funcVerService = new FunctionVersionService(user);

                let formToUse = form;

                if (action.transform) {
                  const response = await funcVerService.run(action.transform, { form }, { test: true });

                  if (response.error) {
                    throw new Error(response.error.message);
                  }

                  formToUse = response.result;
                }

                const response = await funcVerService.run(action.run, { form: formToUse }, { test: true });

                if (response.error) {
                  throw new Error(response.error.message);
                }

                setToastMessage(JSON.stringify(response.result));
                setToastType(InvocationType.success);
                setOpenToast(true);
              } catch (error) {
                setToastMessage(String(error));
                setToastType(InvocationType.error);
                setOpenToast(true);
              }
            }}
          />
        ))}
      </BottomNavigation>
      <Toast message={toastMessage} open={openToast} type={toastType} onClose={() => setOpenToast(false)} />
    </Paper>
  );
};

export default MenuItemForms;
