import Image from "next/image";

const Planning = () => {
  return (
    <div className="relative z-20 bg-[#F6F7FF] section2 font-gilroy">
      <div className="w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="text-center">
          <h2 className="text-[#0F1B2B] section2-heading">
            Lost in the Planning Spiral? <br/>
            We’ve Been There.
          </h2>
        </div>

        {/* Cards Section */}
        <div className="flex md:flex-row flex-col w-full items-stretch justify-center gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-sm flex flex-col items-center justify-center text-center card1">
            <div className="w-full flex items-center justify-center">
              {/* Image placeholder */}
              <div className="crying-img w-[297px] h-[319px] relative">
                <Image src="/images/Crying.gif" alt="3 Hours on Google" fill />
              </div>
            </div>
            <h3 className="crying-title">
              3 Hours On Google,
              <br className="hidden lg:block"/>
              Still No Plan.
            </h3>
            <p className="text-[#0F1B2B] afterLine relative">
              100 Options, Zero Decisions.
            </p>
            <p className="appealing text-[#0F1B2B]">
              "Just Wing It" Sounding More &nbsp;
              <br className="hidden lg:block break-words"/>
              Appealing By The Minute?
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-8">
            {/* Card 2 */}
            <div className="bg-white shadow-sm flex flex-col items-center justify-center w-full card2">
              <p className=" text-[#0F1B2B] BucketList w-full text-left">
                #BudgetVsBucketList
              </p>
              <h3 className=" text-[#13263E] Budget w-full text-left">
                Dream Trip, Tight Budget
                <br />
                How Do You Make It Work?
              </h3>
              <div className="w-full flex items-center justify-center">
                {/* Image placeholder */}
                <div className="sec2-Img relative">
                  <Image
                    src="/images/Tarazu.gif"
                    alt="3 Hours on Google"
                    fill
                  />
                </div>
              </div>
            </div>
            {/* card 3 */}
            <div className="bg-white shadow-sm flex flex-col items-start w-full card3">
              <p className="BucketList text-[#0F1B2B] pl-8">
                #NotMyVibe
              </p>
              <h3 className=" text-[#13263E] Budget pl-8">
              Generic, one-size-fits-all packages? 
              </h3>
              <div className="w-full flex items-center justify-center">
                {/* Image placeholder */}
                <div className="card3Img relative">
                  <Image src="/images/Bus.gif" alt="3 Hours on Google" fill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planning;
