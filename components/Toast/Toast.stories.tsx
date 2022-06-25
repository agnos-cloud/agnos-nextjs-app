import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";

import Toast from "./Toast";

export default {
  title: "Components/Toast",
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const WithSingleMessage = Template.bind({});
WithSingleMessage.args = {
  message: "This toast has a single message",
  open: true,
};

export const WithArrayOfMessages = Template.bind({});
WithArrayOfMessages.args = {
  message: [
    "This toast has an array message",
    "This is the second message in the array",
    "This is the third message in the array",
  ],
  open: true,
};

export const PositionAtTopLeft = Template.bind({});
PositionAtTopLeft.args = {
  message: "This toast is located at the top-left position",
  open: true,
  position: ["top", "left"],
};

export const PositionAtTopRight = Template.bind({});
PositionAtTopRight.args = {
  message: "This toast is located at the top-right position",
  open: true,
  position: ["top", "right"],
};
