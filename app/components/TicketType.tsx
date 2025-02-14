import React from 'react';

interface TicketTypeProps {
  accessType: string;
  ticketsLeft: number;
  totalTickets: number;
  price: string | number;
}

const TicketType = ({ accessType, ticketsLeft, price, totalTickets }: TicketTypeProps) => {
  return (
    <div className="border-2 border-[#197686] p-2  rounded-[12px] flex justify-between items-center gap-2">
      <div className="flex flex-col ">
      <p className="font-roboto font-semibold text-[24px] text-left mb-2">
          {typeof price === 'number' ? `$${price}` : price}
        </p>
        <p className='font-roboto xl:text-[16px]'>{accessType} ACCESS</p>
        <p className="text-left font-roboto xl:text-[16px]">{ticketsLeft}/{totalTickets}</p>
      </div>
    </div>
  );
};

export default TicketType;