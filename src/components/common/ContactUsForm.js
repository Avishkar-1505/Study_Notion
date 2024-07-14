import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {apiConnector} from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis"
import CountryCode from "../../data/countrycode.json"


const ContactUsForm = () => {
    
    const [loading , setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccess}
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging data", data);

        try{
            setLoading(true);
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            console.log("Logging Response", response)
            setLoading(false);
        }
        catch(error){

        }
    }

    useEffect(() => {
        if(isSubmitSuccess) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    }, [reset, isSubmitSuccess]);


  return (
    <form 
    className="flex flex-col gap-7"
    onSubmit={handleSubmit(submitContactForm)}>

        <div className="flex flex-col gap-5 lg:flex-row">
            {/* First name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="firstname" className="lable-style">First Name</label>
                <input
                    type='text'
                    name='firstname'
                    id='firstname'
                    placeholder='Enter first name'
                    className='form-style'
                    {...register("firstname", {required:true})}

                >
                {
                   errors.firstname && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your name.
                    </span>
                   )
                }   
                </input>
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="lastname" className="lable-style">Last Name</label>
                <input
                    type='text'
                    name='lastname'
                    id='last'
                    placeholder='Enter first name'
                    className='form-style'
                    {...register("lastname")}

                >  
                </input>
            </div>

        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 ">
                <label htmlFor="email" className="lable-style">Email Address</label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Enter first name'
                    className='form-style'
                    {...register("email", {required:true})}

                >
                {
                   errors.email && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your email address.
                    </span>
                   )
                }   
                </input>
        </div>

        {/* Phone num */}
        <div className="flex flex-col gap-2">
            <label htmlFor="phonenumber" className="lable-style">
            Phone Number
            </label>

            <div className="flex gap-5">
                <div className="flex w-[14%] flex-col gap-2">
                    <select
                        name="dropdown"
                        id="dropdown"
                        placeholder="Enter Phone Number"
                        className="form-style"
                        {...register("countrycode", { required: true })}
                    >
                        {
                            CountryCode.map( (element, index) => {
                                return(
                                    <option key={index} value={element.code}>
                                        {element.code} - {element.country   }
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                
                <div className='w-[86%]'>
                    <input
                        type='number'
                        name='phonenumber'
                        id='phonenumber'
                        placeholder='Phone Number'
                        className='form-style'
                        {...register("phoneNo", {
                            required:{value:true, message: "Please Enter Phone Number" },
                            maxLength: {value:10, message:"Invalid Phone Number"},
                            minLength: {value:8, message:"Invalid Puhone Number"}
                        } )
                        }
                    />
                    {
                        errors.phoneNo && (
                            <span className="-mt-1 text-[12px] text-yellow-100">{errors.phoneNo.message}</span>
                        )
                    }
                </div>
            </div>
        </div>


        {/* message */}
        <div className='flex flex-col'>
            <label htmlFor='message'>Message</label>
            <textarea
                name='message'
                id="message"
                cols='30'
                rows='7'
                placeholder='Enter Your message here'
                className='form-style'
                {...register("message", {required:true})}
            />
            {
                errors.message && (
                    <span>
                        Please Enter Your Message
                    </span>
                )
            }
        </div>

        {/* Button */}
        <button 
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
        type='submit'
        >Send Message</button>

    </form>
  )
}

export default ContactUsForm