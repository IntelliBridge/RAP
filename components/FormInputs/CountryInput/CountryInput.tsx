import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import SelectInput, { SelectInputDefaultEmptyLabel, SelectInputProps, SelectOption } from "../SelectInput/SelectInput";
import "./CountryInput.scss";
import countries from "./countries.json";
import "/node_modules/flag-icons/css/flag-icons.min.css";
interface CountriesListItem {
  capital: string;
  code: string;
  continent: string;
  flag_1x1: string;
  flag_4x3: string;
  iso: boolean;
  name: string;
}

export const countryNameLookup: { [code: string]: string } = {};

countries.forEach((country) => {
  countryNameLookup[country.code] = country.name;
});

type CountrySelectorBaseProps = Omit<SelectInputProps, "options" | "afterInput">;

interface CountrySelectorProps extends CountrySelectorBaseProps {
  usaFirst?: boolean;
  name: string;
}

export default function CountryInput({ usaFirst = true, name, ...props }: CountrySelectorProps) {
  const { values } = useFormikContext<Record<string, string>>();
  const [afterInput, setAfterInput] = useState(<></>);
  useEffect(() => {
    const afterInput = !values[name] ? <></> : <span className={`fi fi-${values[name]}`}></span>;
    setAfterInput(afterInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values[name]]);
  const countriesList = countries as CountriesListItem[];
  const options: SelectOption[] = countriesList.map(({ name, code }) => ({ label: name, value: code }));
  if (usaFirst) {
    options.unshift({ value: "us", label: "United States of America", key: "usa-start" });
  }
  options.unshift({ value: "", label: SelectInputDefaultEmptyLabel });
  return (
    <div className="country-input-component">
      <SelectInput {...props} name={name} options={options} displayType="country" afterInput={afterInput} />
    </div>
  );
}
