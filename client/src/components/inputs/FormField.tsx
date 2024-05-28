import { ForwardRefRenderFunction, Ref, forwardRef } from 'react';

interface FormFieldProps{
    className?: string;
    labelName?: string;
    type?: "text" | "file" | "button" | 'password' | 'number' | 'email';
    name: string;
    placeholder?: string;
    register: any;
    autoFocus?: boolean;  
    error?: string | undefined | null; 
    disable?: boolean;
    labelClass?:string;
}

const FormField: ForwardRefRenderFunction<HTMLInputElement, FormFieldProps> = ({
    className = "",
    labelName,
    type = "text",
    name,
    placeholder,
    register,
    autoFocus,   
    error, 
    disable = false,
    labelClass,
}, ref: Ref<HTMLInputElement>) => ( 
    <div>
        <div className="flex items-center gap-2 mb-2">
        <label
            htmlFor={name}
            className={`block  ${labelClass || "font-normal text-gray-500"}`}
        >
            {labelName}
        </label> 
        </div>
        <input
            autoFocus={autoFocus}
            type={type}
            id={name}
            name={name}
            ref={ref}
            className={`
                ${className}  
                bg-gray-50 border border-gray-300 text-gray-600 rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full px-4 py-3 shadow
            `}
            placeholder={placeholder} 
            {...register} 
            required 
            aria-invalid={error ? "true" : "false"}
            disabled={disable}  
            autoComplete="current-password"
        />
        {error && (
            <span className='flex items-center text-xs text-[#f64949fe] mt-0.5 '>{error}</span>
        )}
    </div>
);
 
export default forwardRef(FormField);