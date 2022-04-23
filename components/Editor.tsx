import { useEffect } from "react";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import agnosTypeDef from "../constants/types/agnos";
import axiosTypeDef from "../constants/types/axios";
import requestTypeDef from "../constants/types/request";
import requireFromUrlTypeDef from "../constants/types/require-from-url";

export interface EditorProps {
  language?: string | undefined;
  value: string | undefined;
  schemas?: any[];
  onChange?: (value: string | undefined, event: any) => void;
  onValidationError?: (errors: any[]) => void;
}

const Editor = ({
  language = "json",
  schemas,
  value,
  onChange,
  onValidationError,
}: EditorProps) => {
  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      if (language === "json" && schemas) {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
          validate: true,
          schemaValidation: "error",
          schemas,
        });
      } else if (language === "javascript") {
        // validation settings
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: !true,
          noSyntaxValidation: false,
        });

        // compiler options
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
          target: monaco.languages.typescript.ScriptTarget.ES6,
          allowNonTsExtensions: true,
        });

        // extra libraries
        var libSource = [
          agnosTypeDef,
          axiosTypeDef,
          requestTypeDef,
          requireFromUrlTypeDef,
        ].join("\n");
        var libUri = "ts:filename/agnos.d.ts";
        monaco.languages.typescript.javascriptDefaults.addExtraLib(
          libSource,
          libUri
        );
        // When resolving definitions and references, the editor will try to use created models.
        // Creating a model for the library allows "peek definition/references" commands to work with the library.
        // monaco.editor.createModel(
        //   libSource,
        //   "typescript",
        //   monaco.Uri.parse(libUri)
        // );
      }
    }
  }, [monaco]);

  const handleEditorValidation = (markers: any) => {
    if (onValidationError) {
      onValidationError(markers);
    }
  };

  return (
    <MonacoEditor
      defaultLanguage={language}
      defaultValue={value}
      language={language}
      value={value}
      theme="vs-dark"
      height="400px"
      width="100%"
      onChange={onChange}
      onValidate={handleEditorValidation}
    />
  );
};

export default Editor;
