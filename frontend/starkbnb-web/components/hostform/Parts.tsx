import { z } from "zod"
import { basicInfoSchema, locationDetailsSchema } from "./ServiceUploadSchema"
import { ReactNode } from "react"

type BasicInfoType = z.infer<typeof basicInfoSchema>
type LocationDetailsType = z.infer<typeof locationDetailsSchema>

type FormWrapper = {
    title: string,
    children: ReactNode
}

export const FormWrapper = ({title, children}: FormWrapper) => {
    return (
        <div className="py-4">
            <h2 className="text-center mx-0 mb-8 font-semibold">{title}</h2>
            <div className="mx-auto w-fit flex flex-col gap-5">
                {children}
            </div>
        </div>
    )
}

export const BasicInfo = () => {
    return (
        <FormWrapper title="Basic Property Info">
            <div className="">
                <label htmlFor="" className="block">Property Title</label>
                <span className="">
                    <input type="text" className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full"/>
                </span>
            </div>
            <div>
                <label htmlFor="">Property Description</label>
                <textarea name="Property description" id="" className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full min-h-8" 
                    placeholder="Enter your description"
                />
            </div>
            <div>
                <label htmlFor="" className="block">Property Type</label>
                <select name="Property Type" id="" className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full">
                    <option value="entire-home">Entire Home</option>
                    <option value="private-room">Private Room</option>
                    <option value="shared-room">Shared Room</option>
                </select>
            </div>
            <div>
                <label htmlFor="">Property Price (STRK per night)</label>
                <input type="text" className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full"/>
            </div>
            {/* <div>
                <label htmlFor="">Currency</label>
                <input type="text" className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full"/>
            </div> */}
        </FormWrapper>
    )
}

export const LocationDetails = () => {
    return (
        <FormWrapper title="Location Details">
            <div>
                <label htmlFor="">Address</label>
                <input type="text" className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full" />
            </div>
            <div>
                <label htmlFor="">City</label>
                <input type="text" className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full" />
            </div>
            <div>
                <label htmlFor="">State/Province</label>
                <input type="text" className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full" />
            </div>
            <div>
                <label htmlFor="">Country</label>
                <input type="text" className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full" />
            </div>
            <div>
                <label htmlFor="">Neighborhood</label>
                <input type="text" className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full" />
            </div>
        </FormWrapper>
    )
}

export const OtherDetails = () => {
    return (
        <FormWrapper title="More details">
            <div>
                <label htmlFor="">More later...</label>
                <input type="text" className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full" />
            </div>
        </FormWrapper>
    )
}