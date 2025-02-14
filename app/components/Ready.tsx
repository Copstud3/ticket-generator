import React from "react";
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import Image from "next/image";
import ticketBg from "@/public/images/ticket-bg.png";
import barCode from "@/public/images/Bar Code.png";

interface ReadyProps {
  onPrev: () => void;
  formData: {
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
  };
}

const Ready = ({ onPrev, formData }: ReadyProps) => {
  const { ticket, attendee } = formData;

  return (
    <section className="text-center mt-12 p-12 border-2 mx-[500px] border-dark-mint-green rounded-[40px] bg-[#041E23] max-sm:p-6 max-sm:w-[350px] max-sm:mx-auto  md:w-[600px] md:mx-auto md:h-[1100px] max-sm:h-[1100px]">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-jeju text-[32px]">Ready</h1>
          <p className="font-roboto text-[16px]">Step 3/3</p>
        </div>
        <ProgressBar currentStep={3} totalSteps={3} />
      </div>
      <div className="mt-8 flex flex-col gap-4 xl:mb-[66px] ">
        <p className="font-alatsi text-[32px]">Your Ticket is Booked!</p>
        <p className="font-roboto text-[16px] text-[#fafafa]">
          You can download or Check your email for a copy
        </p>
      </div>
      <div className="xl:-mb-[420px] max-sm:mt-[45px] ">
        <div className="justify-center flex items-center">
          <Image src={ticketBg} alt="ticket" />
        </div>
        <div className="bg-transparent border border-[#24A0B5] rounded-[16px] w-[260px] h-[446px] mx-auto relative -top-[580px]"></div>
        <p className="font-roadrage text-[62px] text-white max-sm:text-[45px] relative  -top-[1000px] xl:mx-3 xl:leading-[40px] xl:text-[34px]">
          Techember Fest &quot;25
        </p>
        <p className="relative -left-[4px] -top-[1000px] font-roboto text-[15px]">
          📍 04 Rumens road, Ikoyi, Lagos
        </p>
        <p className="relative -left-[4px] -top-[1000px] font-roboto text-[15px]">
          📅 March 15, 2025 | 7:00 PM
        </p>

        {/* User Avatar Image */}
        {attendee?.avatarUrl && (
          <div className="relative  -top-[990px] -mb-[120px] flex justify-center">
            <Image
              src={attendee.avatarUrl}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        <div className="w-[232px] h-[160px] p-2 mx-auto border border-[#133D44] relative -top-[850px] bg-[#08343C]">
          <div className="grid grid-cols-3 mb-1">
            <div>
              <p className="text-left text-[10px] text-white/70 -mr-7 font-roboto">
                Name
              </p>
              <p className="text-left text-[12px] text-white font-roboto">
                {attendee?.fullName || "N/A"}
              </p>
            </div>
            <hr className="transform rotate-90 border-t-1 border-white/20 relative -left-1 top-[38px] w-[80px] mx-auto" />
            <div>
              <p className="text-left text-[10px] text-white/70 -ml-5 font-roboto">
                Email
              </p>
              <p className="text-left text-[12px] text-white -ml-5 font-roboto overflow-ellipsis overflow-hidden">
                {attendee?.email || "N/A"}
              </p>
            </div>
          </div>
          <hr className="border-t-1 border-white/20" />
          <div className="grid grid-cols-2 gap-[70px] mb-1">
            <div>
              <p className="text-left text-[10px] text-white/70 -mr-7 mt-1 font-roboto">
                Ticket Type
              </p>
              <p className="text-left text-[12px] text-white font-roboto">
                {ticket?.type || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-left text-[10px] text-white/70 -ml-5 mt-1 font-roboto">
                Ticket for
              </p>
              <p className="text-left text-[12px] text-white -ml-5 font-roboto">
                {ticket?.quantity || "0"}
              </p>
            </div>
          </div>
          <hr className="border-t-1 border-white/20 mb-2" />
          <p className="font-roboto text-left text-white/30 text-[12px] mb-1">
            Special Request?
          </p>
          <p className="font-roboto text-left text-white text-[10px] line-clamp-3">
            {attendee?.about || "None"}
          </p>
        </div>
        <Image
          src={barCode}
          alt="bar code"
          className="mx-auto relative md:-top-[780px] max-sm:-top-[810px]"
        />
      </div>
      <div className="flex justify-center items-center gap-8 max-sm:flex-col-reverse max-sm:gap-4 w-full relative md:-top-[250px] max-sm:-top-[750px]">
        <Button text="Book another ticket" variant="default" onClick={onPrev} />
        <Button text="Download Ticket" variant="filled" />
      </div>
    </section>
  );
};

export default Ready;
