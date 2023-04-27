import * as React from "react";
import { useSchemaState, defaultSchema } from "./state";
import { SchemaEditorProps } from "./JsonSchemaEditor.types";
import { Flex, ChakraProvider, extendTheme, type ThemeConfig } from "@chakra-ui/react";

import { SchemaRoot } from "./schema-root";
import { Whoops } from "./whoops";
import { SchemaObject } from "./schema-object";
import { SchemaArray } from "./schema-array";
import { useTheme } from "@mui/material";

export * from "./JsonSchemaEditor.types";

export const JsonSchemaEditor = (props: SchemaEditorProps) => {
  const { onSchemaChange, readOnly, data } = props;
  const theme = useTheme();

  const schemaState = useSchemaState({
    jsonSchema: data ?? defaultSchema(),
    isReadOnly: readOnly ?? false,
    fieldId: 0,
  });

  const jsonSchemaState = schemaState.jsonSchema; // useHookstate(schemaState.jsonSchema);

  const config: ThemeConfig = {
    initialColorMode: theme.palette.mode,
    useSystemColorMode: false,
  };

  const chakraTheme = extendTheme({ config });

  return (
    <ChakraProvider theme={chakraTheme}>
      {schemaState.isValidSchema ? (
        <Flex m={2} direction="column">
          <SchemaRoot
            onSchemaChange={onSchemaChange}
            schemaState={schemaState.jsonSchema}
            isReadOnly={schemaState.isReadOnly}
          />

          {jsonSchemaState.type.value === "object" && (
            <SchemaObject schemaState={jsonSchemaState} isReadOnly={schemaState.isReadOnly ?? false} />
          )}

          {jsonSchemaState.type.value === "array" && (
            <SchemaArray schemaState={jsonSchemaState} isReadOnly={schemaState.isReadOnly ?? false} />
          )}
        </Flex>
      ) : (
        <Flex alignContent="center" justifyContent="center">
          <Whoops />
        </Flex>
      )}
    </ChakraProvider>
  );
};
