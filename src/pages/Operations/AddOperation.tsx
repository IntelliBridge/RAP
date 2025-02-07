import PageTemplate from "../../../layouts/PageTemplate";
import AddOperationForm from "./add_operation_form.tsx"

export default function AddOperation() {
  
  return (
    <PageTemplate 
      mainContent={<AddOperationForm />}
    />
  );
};

