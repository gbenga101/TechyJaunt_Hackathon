import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./Input";

interface PasswordInputProps {
  label: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

// Matches Register + Reset Password screens: eye/eye-off toggle inside the field
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, required, error, placeholder, value, onChange, name }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          label={label}
          required={required}
          error={error}
          placeholder={placeholder}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          name={name}
          className="pr-11"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 bottom-3 text-text-muted hover:text-primary"
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={0}
        >
          {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";