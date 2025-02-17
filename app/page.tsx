"use client";

import { useState, useCallback } from "react";
import AttendeeDetails from "./components/AttendeeDetails";
import TicketSelection from "./components/TicketSelection";
import Ready from "./components/Ready";

interface FormData {
  ticket?: {
    type: string;
    quantity: string;
  };
  attendee?: {
    fullName: string;
    email: string;
    avatarUrl: string;
    about?: string;
  };
}

export default function Page() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});

  const handleFormUpdate = useCallback((section: keyof FormData, data: FormData[keyof FormData]) => {
    setFormData(prev => {
      if (JSON.stringify(prev[section]) === JSON.stringify(data)) {
        return prev;
      }
      return {
        ...prev,
        [section]: data
      };
    });
  }, []);

  const nextStep = useCallback(() => {
    setStep(prev => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setStep(prev => prev - 1);
  }, []);

  const firstStep = useCallback(() => {
    setStep(1);
  }, []);

  // Transform data for Ready component
  const getReadyFormData = () => {
    return {
      data: {
        type: formData.ticket?.type || "",
        quantity: formData.ticket?.quantity || "0"
      },
      attendee: formData.attendee
    };
  };

  return (
    <main>
      {step === 1 && (
        <TicketSelection
          onNext={nextStep}
          data={formData.ticket || { type: '', quantity: '' }}  
          onUpdate={(data) => {
            handleFormUpdate("ticket", { type: data.ticketType, quantity: data.quantity });
          }}
        />
      )}
      {step === 2 && (
        <AttendeeDetails
          onNext={nextStep}
          onPrev={prevStep}
          data={formData.attendee || { fullName: '', email: '', avatarUrl: '', about: '' }} 
          onUpdate={(data) => handleFormUpdate("attendee", data)}  
        />
      )}
      {step === 3 && (
        <Ready
          onPrev={firstStep}
          formData={getReadyFormData()}
        />
      )}
    </main>
  );
}