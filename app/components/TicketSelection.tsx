"use client";

import { useState, useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";
import TicketType from "./TicketType";
import Button from "./Button";

interface Ticket {
  accessType: "REGULAR" | "VIP" | "VVIP";
  ticketsLeft: number;
  totalTickets: number;
  price: number | "Free";
}

interface TicketSelectionProps {
  onNext: () => void;
  data?: {
    ticketType?: string;
    quantity?: string;
  };
  onUpdate?: (data: { ticketType: string; quantity: string }) => void;
}

const EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

const TicketSelection = ({ onNext, data, onUpdate }: TicketSelectionProps) => {
  const [selected, setSelected] = useState<string | null>(data?.ticketType || null);
  const [quantity, setQuantity] = useState<string>(data?.quantity || "");
  const [error, setError] = useState<string>("");
  const isInitialMount = useRef(true);

  const tickets: Ticket[] = [
    { accessType: "REGULAR", ticketsLeft: 20, price: "Free", totalTickets: 52 },
    { accessType: "VIP", ticketsLeft: 20, price: 50, totalTickets: 52 },
    { accessType: "VVIP", ticketsLeft: 20, price: 150, totalTickets: 52 },
  ];

  // Load saved data from localStorage with expiration check
  useEffect(() => {
    if (!data && isInitialMount.current) {
      const savedData = localStorage.getItem("ticketSelection");

      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          const now = new Date().getTime();

          // Check if data is expired
          if (now - parsed.timestamp > EXPIRATION_TIME) {
            localStorage.removeItem("ticketSelection");
            setSelected(null);
            setQuantity("");
          } else {
            setSelected(parsed.ticketType || null);
            setQuantity(parsed.quantity || "");
          }
        } catch {
          console.error("Error parsing ticketSelection from localStorage");
        }
      }
      isInitialMount.current = false;
    }
  }, [data]);

  // Handle updates to parent and localStorage
  useEffect(() => {
    if (!isInitialMount.current && selected && quantity) {
      const dataToSave = {
        ticketType: selected,
        quantity,
        timestamp: new Date().getTime(),
      };
      
      localStorage.setItem("ticketSelection", JSON.stringify(dataToSave));
      
      // Only call onUpdate if the data has actually changed
      if (
        data?.ticketType !== selected ||
        data?.quantity !== quantity
      ) {
        onUpdate?.({ ticketType: selected, quantity });
      }
    }
  }, [selected, quantity, data, onUpdate]);

  const handleTicketSelect = (ticketType: string) => {
    setSelected(ticketType);
    setError("");
  };

  const handleQuantityChange = (newQuantity: string) => {
    setQuantity(newQuantity);
    setError("");
  };

  const handleNext = () => {
    if (!selected) {
      setError("Please select a ticket type");
      return;
    }
    if (!quantity || quantity === "0") {
      setError("Please select the number of tickets");
      return;
    }

    const selectedTicket = tickets.find((t) => t.accessType === selected);
    if (selectedTicket && Number(quantity) > selectedTicket.ticketsLeft) {
      setError(`Only ${selectedTicket.ticketsLeft} tickets available`);
      return;
    }

    setError("");
    onNext();
  };
  return (
    <section className="text-center mt-12 p-12 border-2 mx-[500px] border-dark-mint-green rounded-[40px] mb-12 bg-[#041E23] max-sm:p-6 max-sm:w-[350px] max-sm:mx-auto md:w-[600px] md:mx-auto xl:w-[700px]">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start">
          <h1 className="font-jeju text-[32px]">Ticket Selection</h1>
          <p className="font-roboto text-[16px]">Step 1/3</p>
        </div>
        <ProgressBar currentStep={1} totalSteps={3} />
      </div>
      <div className="bg-[#08252B] p-6 border-2 border-[#0E464F] rounded-[32px] mt-8 flex flex-col gap-8 max-sm:bg-transparent max-sm:border-hidden max-sm:p-0">
        <div className="bg-gradient-to-br from-[#0E464F] from-10% to-[#08252B] to-80% border-2 border-[#0E464F] rounded-[40px] p-6 flex flex-col items-center justify-center">
          <p className="font-roadrage text-[62px] text-white max-sm:text-[48px]">
            Techember Fest '25
          </p>
          <p className="font-roboto text-[16px] mx-[120px] text-center max-sm:mx-[30px] md:mx-[80px]">
            Join us for an unforgettable experience at [Event Name]! Secure your spot now.
          </p>
          <p className="max-sm:hidden">📍 [Event Location] | March 15, 2025 | 7:00 PM</p>
          <p className="md:hidden mt-3 text-[18px]">📍 [Event Location]</p>
          <p className="md:hidden text-[18px]">March 15, 2025 | 7:00 PM</p>
        </div>
        <hr className="border-[#07373F] border-t-4 max-sm:border-2" />
        <div>
          <p className="text-left font-roboto text-[16px]">Select ticket type:</p>
          <div className="bg-[#052228] border-2 border-dark-mint-green mt-2 rounded-[24px]">
            <div className="grid grid-cols-3 m-4 gap-6 max-sm:grid-cols-1">
              {tickets.map((ticket) => (
                <div
                  key={ticket.accessType}
                  onClick={() => handleTicketSelect(ticket.accessType)}
                  className={`cursor-pointer transition-all duration-200 ${
                    selected === ticket.accessType ? "bg-[#12464E] text-white rounded-[12px]" : "bg-transparent"
                  }`}
                  role="radio"
                  aria-checked={selected === ticket.accessType}
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleTicketSelect(ticket.accessType);
                    }
                  }}
                >
                  <TicketType {...ticket} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-left font-roboto text-[16px]">Number of tickets</p>
          <select
            className="border-2 border-dark-mint-green bg-[#07373F] w-full p-3 text-white focus-none outline-none mt-2 rounded-[12px]"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            aria-label="Select number of tickets"
          >
            <option value="">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        {error && <p className="text-[#24A0B5] text-sm text-left" role="alert">{error}</p>}
        <div className="flex justify-center mx-3 items-center gap-8 max-sm:flex-col-reverse max-sm:gap-4">
          <Button text="Cancel" variant="default" />
          <Button text="Next" variant="filled" onClick={handleNext} />
        </div>
      </div>
    </section>
  );
};

export default TicketSelection;