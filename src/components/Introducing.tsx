import Image from 'next/image';

const Introducing = () => {
  return (
    <div className="relative bg-[#13253E] section-3">
      <div className="flex flex-col items-center justify-center">
        <h2 className="section-3-heading">LOOK NO FURTHER</h2>
        
          <p className="sec3-intro">INTRODUCING</p>
          <h2 className="rmyo text-[#ED552C]">Roamyo</h2>
          <p className="prfect-travel">Your Perfect Travel Partner</p>
        
        <div className="mt-8 flex justify-center introImg relative z-10">
          <Image src="/images/intro.png" alt="Roamyo Mascot" height={308} width={343}/>
        </div>
      </div>
      
      {/* Wave shape at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#F6F7FF]"></div>
    </div>
  );
};

export default Introducing; 