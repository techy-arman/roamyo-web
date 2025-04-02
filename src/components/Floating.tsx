"use client";
import Image from "next/image";

const Floating = () => {
  return (
    <div className="bg-[#F6F7FF] py-40 font-gilroy overflow-hidden">
      <div className="max-w-full flex flex-col items-center justify-center mx-auto px-4">
        <Image
          src="/images/flying.jpg"
          alt="No Stress"
          width={1153}
          height={450}
          className="floatingImg"
        />
        <div className="flex flex-col items-center justify-center">
          <p className="float-head uppercase">
            Tell Roamyo what you like - <br className="md:hidden block" /> Budget, destination, vibe.
          </p>
          <h2 className="float-head2">
            Get a detailed itinerary in minutes <br/>
            <span className="text-[#ED552C]">No spreadsheets, no stress.</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Floating;
