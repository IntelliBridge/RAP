import { TextInput } from "../../../components/FormInputs/TextInput";
import { DatePickerInput } from "../../../components/FormInputs/DatePickerInput";
import { Formik, Form } from "formik";
import {
  Button,
  ButtonGroup,
  Fieldset,
} from '@trussworks/react-uswds';

import Config from '../../config';

const config = Config();
const { endpoints } = config;


type Operation = {
  agencyName: string,
  uniqueEntityId: string,
  cageNcageNo: string,
  fullName: string,
  primaryPhoneNumber: string,
  emailAddress: string,
  vendor: string,
  nameOfOperation: string,
  startDate: string,
  endDate: string,
  streetAddressLine1: string,
  streetAddressLine2: string,
  city: string,
  stateTerritoryMilitaryPost: string,
  zipCode: string,
  urbanization: string
};


const initialValues: Operation = {
  agencyName: '',
  uniqueEntityId: '',
  cageNcageNo: '',
  fullName: '',
  primaryPhoneNumber: '',
  emailAddress: '',
  vendor: '',
  nameOfOperation: '',
  startDate: '',
  endDate: '',
  streetAddressLine1: '',
  streetAddressLine2: '',
  city: '',
  stateTerritoryMilitaryPost: '',
  zipCode: '',
  urbanization: ''
};


const handleSubmit = async (operation: Operation) => {

  try {
    await fetch(endpoints.operations, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(operation),
    });

    alert('Submitted for Review');

  } catch (error) {
    console.error('Error adding operation:', error);
    alert('Failed to add Operation');
  }
};



export default function AddOperationForm()  {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        {/* Submitter Information */}
        <Fieldset legend="Submitter Information" legendStyle="large">
          
          {/* Agency Name Group */}
          <Fieldset legend="Agency Name" >
            <TextInput name="agencyName" label="Agency Name" required={true} type="text" />
            <TextInput name="uniqueEntityId" label="Unique Entity ID" required={true} type="text" />
            <TextInput name="cageNcageNo" label="CAGE/NCAGE No." required={true} type="text" />
          </Fieldset>
          
          {/* Person Submitting Group */}
          <Fieldset legend="Person Submitting">
            <TextInput name="fullName" label="Full name" type="text" />
            <TextInput name="primaryPhoneNumber" label="Primary phone number" type="text" />
            <TextInput name="emailAddress" label="Email address" type="text" />
          </Fieldset>
        </Fieldset>
        
        {/* Vendor Search */}
        <Fieldset legend="Vendor Search" legendStyle="large">
          
          {/* Search vendor Group */}
          <Fieldset legend="Search vendor">
            <TextInput name="vendor" label="Search vendor" type="search" />
          </Fieldset>
        </Fieldset>
        
        {/* Operation Details */}
        <Fieldset legend="Operation Details" legendStyle="large">
          
          {/* Name of Operation Group */}
          <Fieldset legend="Name of Operation">
            <TextInput name="nameOfOperation" label="Name of operation" required={true} type="text" />
          </Fieldset>
          
          {/* POP (Period of Performance) Group */}
          <Fieldset legend="POP (Period of Performance)">
            <DatePickerInput name="startDate" label="Start date" />
            <DatePickerInput name="endDate" label="End date" />
          </Fieldset>
          
          {/* Location of Operation Group */}
          <Fieldset legend="Location of Operation">
            <TextInput name="streetAddressLine1" label="Street address line 1" type="text" />
            <TextInput name="streetAddressLine2" label="Street address line 2" type="text" />
            <TextInput name="city" label="City" required={true} type="text" />
            <TextInput name="stateTerritoryMilitaryPost" label="State, territory or military post" required={true} type="text" />
            <TextInput name="zipCode" label="Zip code" type="text" />
            <TextInput name="urbanization" label="Urbanization (Puerto Rico only)" type="text" />
          </Fieldset>
        </Fieldset>
        <ButtonGroup>
          <Button type="button" unstyled>Cancel</Button>
          <Button type="button">Save Draft</Button>
          <Button type="submit">Submit for Review</Button>
        </ButtonGroup>
      </Form>
    </Formik>
  );
};
