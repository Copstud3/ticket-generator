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

  // Handle form updates with correct structure for ticket or attendee
  const handleFormUpdate = useCallback((section: keyof FormData, data: FormData[keyof FormData]) => {
    setFormData(prev => {
      // Only update if data has actually changed
      if (JSON.stringify(prev[section]) === JSON.stringify(data)) {
        return prev;
      }
      return {
        ...prev,
        [section]: data
      };
    });
  }, []);

  // Handle next step
  const nextStep = useCallback(() => {
    setStep(prev => prev + 1);
  }, []);

  // Handle previous step
  const prevStep = useCallback(() => {
    setStep(prev => prev - 1);
  }, []);

  // Go back to the first step
  const firstStep = useCallback(() => {
    setStep(1);
  }, []);

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
          formData={formData}
        />
      )}
    </main>
  );
}
