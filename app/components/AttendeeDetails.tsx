"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import ImageUpload from "./ImageUpload";
import ProgressBar from "./ProgressBar";
import mail from "@/public/images/mail.png";
import Button from "./Button";

interface AttendeeDetailsProps {
  onNext?: () => void;
  onPrev?: () => void;
  data?: {
    fullName?: string;
    email?: string;
    avatarUrl?: string;
    about?: string;
  };
  onUpdate?: (data: {
    fullName: string;
    email: string;
    avatarUrl: string;
    about?: string;
  }) => void;
}

const AttendeeDetails = ({ onNext, onPrev, data, onUpdate }: AttendeeDetailsProps) => {
  const [formData, setFormData] = useState({
    fullName: data?.fullName || "",
    email: data?.email || "",
    avatarUrl: data?.avatarUrl || "",
    about: data?.about || "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    avatarUrl: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    avatarUrl: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      avatarUrl: "",
    };

    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.avatarUrl) {
      newErrors.avatarUrl = "Profile photo is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      const newFormData = { ...formData, [field]: value };
      setFormData(newFormData);
      setTouched(prev => ({ ...prev, [field]: true }));
      if (onUpdate) {
        onUpdate(newFormData); // Call onUpdate directly here
      }
    },
    [formData, onUpdate]
  );

  const handleImageUrl = useCallback(
    (url: string) => {
      const newFormData = { ...formData, avatarUrl: url };
      setFormData(newFormData);
      setTouched(prev => ({ ...prev, avatarUrl: true }));
      setErrors(prev => ({ ...prev, avatarUrl: "" }));
      if (onUpdate) {
        onUpdate(newFormData); // Call onUpdate directly here
      }
    },
    [formData, onUpdate]
  );

  const handleNext = () => {
    setTouched({
      fullName: true,
      email: true,
      avatarUrl: true,
    });

    const isValid = validateForm();

    if (!isValid) return;

    if (onNext) {
      onNext();
    }
  };

  const isFormValid =
    formData.fullName.trim() &&
    formData.email.trim() &&
    validateEmail(formData.email) &&
    formData.avatarUrl;

  return (
    <section className="text-center mt-12 p-12 border-2 mx-[500px] border-dark-mint-green rounded-[40px] mb-12 bg-[#041E23] max-sm:p-6 max-sm:w-[350px] max-sm:mx-auto md:w-[600px] md:mx-auto xl:w-[700px]">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="font-jeju text-[32px] max-sm:text-[24px]">Attendee Details</h1>
          <p className="font-roboto text-[16px]">Step 2/3</p>
        </div>
        <ProgressBar currentStep={2} totalSteps={3} />
      </div>
      <div className="bg-[#08252B] p-6 border-2 border-[#0E464F] rounded-[32px] mt-8 flex flex-col gap-8 max-sm:bg-transparent max-sm:border-hidden max-sm:p-0">
        <div className="bg-[#052228] p-6 border-2 border-[#07373F] rounded-[24px]">
          <p className="text-left">Upload Profile Photo *</p>
          <div>
            <ImageUpload onImageUrl={handleImageUrl} />
          </div>
          {touched.avatarUrl && !formData.avatarUrl && (
            <p className="text-[#24A0B5] font-semibold font-roboto text-sm mt-2 text-left">
              Profile photo is required
            </p>
          )}
        </div>
        <hr className="border-[#07373F] border-t-4" />
        <div>
          <p className="text-left font-roboto text-[16px]">Enter your name: *</p>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className={`border ${
              touched.fullName && !formData.fullName.trim()
                ? "border-[#24A0B5]"
                : "border-dark-mint-green"
            } bg-[#08252b] w-full p-3 text-white focus-none outline-none mt-2 rounded-[12px]`}
            required
          />
          {touched.fullName && !formData.fullName.trim() && (
            <p className="text-[#24A0B5] font-semibold font-roboto text-sm mt-2 text-left">
              Name is required
            </p>
          )}
        </div>
        <div>
          <p className="text-left font-roboto text-[16px]">Enter your email *</p>
          <div
            className={`flex justify-center items-center rounded-[12px] border ${
              touched.email && (!formData.email.trim() || !validateEmail(formData.email))
                ? "border-[#24A0B5]"
                : "border-dark-mint-green"
            } bg-[#08252b] w-full mt-2`}
          >
            <Image src={mail} alt="mail" className="ml-[14px]" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="p-3 text-white bg-transparent w-full focus-none outline-none placeholder:text-white"
              placeholder="hello@avioflagos.io"
              required
            />
          </div>
          {touched.email && !formData.email.trim() && (
            <p className="text-[#24A0B5] font-semibold font-roboto text-sm mt-2 text-left">
              Email is required
            </p>
          )}
          {touched.email && formData.email.trim() && !validateEmail(formData.email) && (
            <p className="text-[#24A0B5] font-semibold font-roboto text-sm mt-2 text-left">
              Please enter a valid email
            </p>
          )}
          
        </div>
        <div>
          <p className="text-left font-roboto text-[16px] ">About the project</p>
          <input
              type="text"
              // value={formData.about}
              className="p-3 text-white bg-[#08252b] pb-[60px] w-full focus-none outline-none placeholder:text-gray mt-2 rounded-[12px] border border-dark-mint-green"
              placeholder="Textarea"
              onChange={(e) => handleInputChange("text", e.target.value)}
              maxLength={120}
              required
            />
            </div>
        <div className="flex justify-center items-center mx-3 gap-8 max-sm:flex-col-reverse max-sm:gap-4">
          <Button text="Back" variant="default" onClick={onPrev} />
          <Button
            text="Get My Free Ticket"
            variant="filled"
            onClick={handleNext}
            disabled={!isFormValid}
            className={!isFormValid ? "opacity-50 cursor-not-allowed" : ""}
          />
        </div>
      </div>
    </section>
  );
};

export default AttendeeDetails;