'use client'

// import { z } from "zod";
// import { formSchema } from "./ServiceUploadSchema";
// import { useFieldArray, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { stepsConfig } from '@/app/utils/formSteps'

import { FieldErrors, useForm, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { Field, StepProps, stepsConfig } from "../utils/formSteps"
import { useState } from "react"

// type FormData = z.infer<typeof formSchema>

// const UploadServiceForm = () => {

//     const [currentStep, setCurrentStep] = useState<number>(1);
//     const {
//         register, handleSubmit, control, formState: {errors}
//     } = useForm<FormData>({
//         resolver: zodResolver(formSchema), 
//         defaultValues: {
//             basicInfo: {}, locationDetails: {}, amenities: [{name: ""}], safetyAndSecurity: [{name: ""}], additionalInfo: [{name: ""}]
//         }
//     });

//     const { fields: amentiyFields, append: appendAmenity, remove: removeAmenity } = useFieldArray({
//         control,
//         name: "amenities"
//     })
//     const { fields: safetyFields, append: appendSafety, remove: removeSafety } = useFieldArray({
//         control,
//         name: "safetyAndSecurity"
//     })
//     const { fields: additionalFields, append: appendInfo, remove: removeInfo } = useFieldArray({
//         control,
//         name: "additionalInfo"
//     })

//     const onSubmit = (data: FormData) => {
//         console.log(data)
//         alert("Form Submitted Successfully")
//     }

//     const handleNext = () => {
//         if (currentStep < 6) setCurrentStep(currentStep + 1)
//     }

//     const handleBack = () => {
//         if (currentStep > 1) setCurrentStep(currentStep - 1)
//     }

//     return (
//         <form action="">
//             {
//                 currentStep === 1 && (
//                     <div>
//                         <h2>{stepsConfig?.[currentStep].title}</h2>
//                         {Object.entries(stepsConfig).map(([key, value]) => {

//                             return value.fields.map((field) => {
//                                 if (field.inputType === 'text' || field.inputType === 'number') return (
//                                     <div>
//                                         <label htmlFor="">{field.title}</label>
//                                         <input type={field.inputType} {...register(`${key}.${value}`)}/>
//                                     </div>
//                                 )
//                             })
//                         })}
//                     </div>
//                 )
//             }
//         </form>
//     )
// }

// export default UploadServiceForm;


// Another Approach

type FormValues = {
    [key: string]: {
        [key: string] : string | number
    }
}

type DynamicFieldProps = {
    field: Field, register: UseFormRegister<FormValues>, setValue: UseFormSetValue<FormValues>, errors: FieldErrors<FormValues>, stepKey: string
}

type StepComponentProps = {
    stepData: StepProps, stepKey: string, register: UseFormRegister<FormValues>, setValue: UseFormSetValue<FormValues>, errors: FieldErrors<FormValues>
}

const DynamicField = ({field, register, errors, setValue, stepKey}: DynamicFieldProps) => {

    const fieldId = `${stepKey}.${field.title.replace(/\s+/g, '')}`;

    switch (field.inputType) {
        case 'text':
            return (
                <input type="text" id="" {...register(field.title)} placeholder={field.title}
                className={`w-full ${errors[stepKey]?.[field.title] ? 'border border-red-500' : '*:'}`}
                />
            )
        
        case 'number':
            return (
                <input type="number" min={1} id="" {...register(fieldId, {valueAsNumber: true})} placeholder={field.title}
                className={`w-full ${errors[stepKey]?.[field.title] ? 'border border-red-500' : '*:'}`}
                /> 
            )

        case 'textarea':
            return (
                <textarea 
                    {...register(fieldId)} 
                    placeholder={field.title} 
                    className={`w-full ${errors[stepKey]?.[field.title] ? 'border border-red-500' : '*:'}`}
                    id=""
                />
                // </textarea>
            )

        case 'select':
            return (
                <select {...register(fieldId)} value={field?.options?.[0]} id="">
                    {
                        field.options?.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))
                    }
                </select>
            )
        
        default: return null;
    }
}

const StepComponent = ({stepData, stepKey, setValue, register, errors}: StepComponentProps) => {
    return (
        <div>
            <h2>{stepData.title}</h2>
            <div>
                {stepData.fields.map((field) => (
                    <div key={field.title}>
                        <label htmlFor={field.title.replace(/\s+/g, '')}>
                            {field.title}
                            {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <DynamicField
                            field={field} 
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            stepKey={stepKey}
                        />
                        {
                            errors[stepKey]?.[field.title] && (
                                <p className="text-sm text-red-500">
                                    {errors[stepKey]?.[field.title]?.message as string}
                                </p>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState<number>(1)
    const {
        register, handleSubmit, control, formState: {errors}, setValue
    } = useForm<FormValues>({
        defaultValues: Object.keys(stepsConfig).reduce((acc, key) => {
            acc[key] = {};
            stepsConfig[key].fields.forEach((field) => {
                acc[key][field.title.replace(/\s+/g, '')] = '';
            });
            return acc;
        }, {} as FormValues)
    })

    const getCurrentStepData = (): {stepData: StepProps; stepKey: string} | null => {
        const entry = Object.entries(stepsConfig).find(([_, step]) => step.id === currentStep)
        return entry ? { stepData: entry[1], stepKey: entry[0] } : null;
    };

    const onSubmit = (data: FormValues) => {
        console.log(data);
    }

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, Object.keys(stepsConfig).length))
    }

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const currentStepInfo = getCurrentStepData()

    if (!currentStepInfo) return null

    const { stepData, stepKey } = currentStepInfo

    return (
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="w-full max-w-2xl mx-auto space-y-6"
                >
                <StepComponent
                    stepData={stepData}
                    stepKey={stepKey}
                    register={register}
                    setValue={setValue}
                    errors={errors}
                />
                
                <div className="flex justify-between pt-6">
                    <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className={`px-4 py-2 rounded-md text-sm font-medium 
                        ${currentStep === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                    Back
                    </button>
                    
                    <button
                    type={currentStep === Object.keys(stepsConfig).length ? 'submit' : 'button'}
                    onClick={currentStep === Object.keys(stepsConfig).length ? undefined : handleNext}
                    // disabled={isSubmitting}
                    className={`px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600`}
                    >
                    {currentStep === Object.keys(stepsConfig).length ? 'Submit' : 'Next'}
                    </button>
                </div>
            </form>
  );
};

export default MultiStepForm;