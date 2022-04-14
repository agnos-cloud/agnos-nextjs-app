import type { HTMLInputTypeAttribute } from "react";

export interface Form {
  title: string;
  actions?: Array<FormAction>;
  disableNavigation: boolean; // if true you can't navigate to the Next or Previous form
  fields?: Array<FormField | FormFieldGroup>;
}

export interface FormAction {
  title: string;
  run: () => void; // inside this func we will fetch field, component, env and design variables and make them available to the eval function
  // the eval function should return an axios config object so we can make the request on its behalf
}

export interface FormField {
  name: string;
  title: string;
  default?: any;
  type?: HTMLInputTypeAttribute;
}

export interface FormFieldGroup {
  title: string;
  fields?: Array<FormField | FormFieldGroup>;
}

/**
 * create react component from json form fields
 * https://www.youtube.com/watch?v=NMxMWOZC-Ec
 * https://stackoverflow.com/questions/31234500/create-react-component-dynamically
 */
