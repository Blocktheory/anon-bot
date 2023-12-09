"use client";

import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  KeyboardEvent,
  RefObject,
} from "react";

export interface IInputFieldProps {
  type?: string;
  name?: string;
  label?: string | React.ReactElement;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
  placeholder?: string | undefined;
  id?: string;
  error?: boolean;
  value?: string | number;
  setValue?: (val: string) => void;
  isOptionalLabel?: boolean;
  min?: string;
  step?: string;
  searchIcon?: string;
  autoComplete?: "on" | "off";
  maxLength?: number;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  OnClear?: (val: string) => void;
  required?: boolean;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  inputRef?: RefObject<HTMLInputElement>;
  isSearch?: boolean;
}

const InputField: FC<IInputFieldProps> = (props) => {
  const {
    label,
    type,
    className,
    inputClassName,
    name,
    id,
    placeholder,
    value,
    onChange,
    min,
    step,
    autoComplete,
    maxLength,
    onKeyDown,
    required,
    onFocus,
    onBlur,
    inputRef,
    isSearch = false,
    searchIcon,
  } = props;

  return (
    <div className={`relative ${className ?? ""}`}>
      {label && (
        <label className="label mb-1 block text-text-100" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        type={type}
        id={id}
        name={name}
        className={`paragraph2_regular placeholder:text-text-300 focus:ring-transparent block w-full rounded-xl border border-grey-300 bg-grey-white p-4 text-text-500 caret-black focus:outline-none ${
          isSearch ? "pl-12" : ""
        } ${inputClassName ?? ""}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value as string | number}
        min={min}
        step={step}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onKeyDown={onKeyDown}
        onWheel={() => (document.activeElement as HTMLElement).blur()}
        required={required}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {isSearch ? (
        <img
          className="absolute left-4 top-1/2 -translate-y-1/2"
          src={searchIcon}
          alt="search"
        />
      ) : null}
    </div>
  );
};
export default InputField;
