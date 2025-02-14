"use client"

import { useState, useCallback } from "react";
import AttendeeDetails from "./components/AttendeeDetails";
import TicketSelection from "./components/TicketSelection";
import Ready from "./components/Ready";

interface FormData {
  ticket?: {
    ticketType: string;  // Changed to match TicketSelection component
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

  const handleFormUpdate = useCallback((section: keyof FormData, data: any) => {
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

  const nextStep = useCallback(() => {
    setStep(prev => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setStep(prev => prev - 1);
  }, []);

  const firstStep = useCallback(() => {
    setStep(1);
  }, []);

  return (
    <main>
      {step === 1 && (
        <TicketSelection 
          onNext={nextStep}
          data={formData.ticket}
          onUpdate={(data) => {
            handleFormUpdate('ticket', data);
          }}
        />
      )}
      {step === 2 && (
        <AttendeeDetails 
          onNext={nextStep} 
          onPrev={prevStep}
          data={formData.attendee}
          onUpdate={(data) => handleFormUpdate('attendee', data)}
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