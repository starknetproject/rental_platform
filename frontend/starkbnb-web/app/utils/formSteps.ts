import { title } from "process";
import { text } from "stream/consumers";

export type Field = {
    title: string, required: boolean, inputType: string, options?: string[]
}

// The Field Type is for the title of each of the fields contained in each steps, whether or not they are
// required, the type of input and (if its a select field), the options.

export type StepProps = {
    id: number, title: string, fields: Field[]
}

// The StepProps type is the type for the each of the child objects contained in the stepsConfig

export type Step = Record<string, StepProps>

// They Step type is then for each of the children of the stepsConfig, so that we don't have to annotate types for everything

export const stepsConfig: Record<string, StepProps> = {
    basicInfo: {
        id: 1, title: 'Basic Information',
        fields: [
            {
                title: 'Property Title', required: true, inputType: 'text'
            },
            {
                title: 'Property Description', required: true, inputType: 'textarea'
            },
            {
                title: 'Property Type', required: true, inputType: 'select', options: ['Entire Home', 'Private Room', 'Shared Room']
            },
            {
                title: 'Property Price (in STRK)', required: true, inputType: 'number'
            },
            {
                title: 'Currency', required: true, inputType: 'select', options: ['STRK']
            },
        ]
    }, 
    locationDetails: {
        id: 2, title: 'Location Details',
        fields: [
            {
                title: 'Address', required: true, inputType: 'text'
            }, 
            {
                title: 'City', required: true, inputType: 'text'
            },
            {
                title: 'State', required: true, inputType: 'text'   
            },
            {
                title: 'Zip', required: true, inputType: 'text'
            },
            {
                title: 'Country', required: true, inputType: 'text'
            },
        ]
    },
    propertyDetails: {
        id: 3, title: 'Property Details',
        fields: [
            {
                title: 'Property Size', required: true, inputType: 'number'
            },
            {
                title: 'Number of Bedrooms', required: true, inputType: 'number'
            },
            {
                title: 'Number of Bathrooms', required: true, inputType: 'number'
            },
            {
                title: 'Number of Beds', required: true, inputType: 'number'
            },
        ]
    },
    amenitiesAndPolicies: {
        id: 4, title: 'Property Details',
        fields: [
            
        ]
    },
    mediaUpload: {
        id: 5, title: 'Images and Videos',
        fields: [

        ]
    },
    safetyAndSecurity: {
        id: 6, title: 'Safety and Security Details',
        fields: [

        ]
    },
    additionalInfo: {
        id: 7, title: 'Addtional Property Info',
        fields: [

        ]
    },
}