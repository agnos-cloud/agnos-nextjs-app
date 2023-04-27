import { JsonSchemaEditor } from "@components/model";

export interface CreateProjectModelFormProps {
  onChange: (model: string) => void;
}

function CreateProjectModelForm(props: CreateProjectModelFormProps) {
  const { onChange } = props;

  const handleSchemaChange = (schema: string) => {
    onChange(schema);
  };

  return (
    <>
      <JsonSchemaEditor onSchemaChange={handleSchemaChange} />
    </>
  );
}

export default CreateProjectModelForm;
