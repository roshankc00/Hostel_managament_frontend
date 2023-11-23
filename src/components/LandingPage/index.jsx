const LandingPage = () => {
  return (
    <main className="mx-auto flex items-center justify-center md:block ">
      <div className="flex flex-center justify-between mx-6 gap-4 md:flex-row flex-col-reverse">
        <div className="flex flex-col gap-10 justify-center">
          <h1 className="md:text-5xl text-center md:text-left text-4xl text-[#63a0df]">
            Best Hostel{" "}
            <span className="block font-bold text-[#4869c6]">facilities</span>
          </h1>
          <div className="bg-[#4869c6] block mx-auto md:mx-0 w-[80%] h-1"></div>
          <p className="text-[#63a0df] text-lg flex flex-col items-center md:items-start">
            This is the only place you&apos;ll have to visit{" "}
            <span className="text-xl">to find and create your own hostel.</span>
          </p>
          <button className="bg-[#4869c6] w-[8rem] flex justify-center rounded-lg text-white py-[0.5rem] mx-auto md:mx-0">
            Get Started!
          </button>
        </div>

        <div>
          <img
            src="/landing_image.svg"
            alt="Landing Page Image"
            className="lg:w-[30rem] w-[25rem] lg:mr-[5rem] mr-0 h-[50vh]"
          />
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
