import Footer from "../../components/Footer";
import styles from "./aboutUsSection.module.css";

function AboutUsSection() {
  return (
    <main className="w-full">
      <div className="container bg-black m-auto w-[80%] md:w-[90%] sm:w-[98%] rounded-xl">
        <img
          className="rounded-xl opacity-50 w-[100%] md:h-[356px] m-auto object-cover"
          src="https://www.hiusa.org/wp-content/uploads/2023/03/HI-Pigeon-Point-Lighthouse-hostel-three-women-in-bunks-1000x550-min.jpg"
          alt="sdsdsd"
        />
      </div>

      <div className="relative bottom-[4em] md:bottom-[9em] h-24 w-24 md:h-52 md:w-52  m-auto rounded-full flex items-center justify-center">
        <img
          className="rounded-full"
          src="https://thumbs.dreamstime.com/z/vector-logo-hostel-hotel-183952515.jpg?fbclid=IwAR2iR_vsB0TH0KXfBGwCELx6YgBnZjBRQBdViasIXyuNQPR2JFrKcQiYyu8"
          alt=""
        />
      </div>
      <h1 className="text-center text-[25px] font-[600]  md:font-[400] md:text-[50px] md:mt-[-2.4em] mt-[-1.5em]">
        Khojdau
      </h1>
      <div className={styles.aboutUsSection}>
        <div className={styles.about}>
          <p className="text-justify">
            {" "}
            <span className=" text-[#308] font-[700] text-[36px] ml-10 md:ml-40">
              W
            </span>
            elcome to our Hostel Finding website where we help the students of
            the kathmandu valley to find out the hostel out there we are trying
            to merge all the hostels of the kathmandu valley in our website. so
            there will be no any difficulty for the students to findout the
            hostels with the better facility and better place
          </p>
        </div>
        <div className={styles.vision}>
          <h2 className="text-center font-normal text-4xl">Our Vision</h2>
          <p className="my-6 text-justify">
            In today's fast-paced world, finding accommodation becomes a
            daunting task, especially in densely populated cities like Kathmandu
            Valley. Even prominent figures, with extensive networks, face
            challenges in locating suitable places to stay, as highlighted in
            various news articles. This struggle extends to the general public,
            including students and employees, who face time constraints. This
            predicament has fueled the brokerage industry, which has grown
            significantly. However, in this age of information technology, where
            internet penetration is substantial in Nepal, this issue is
            solvable. Our vision is to create a platform that directly connects
            customers with owners, eliminating the need for intermediaries and
            putting an end to the brokerage industry. Simultaneously, we aim to
            provide an exceptional experience to our users, allowing them to
            explore accommodations online as if they were physically visiting
            the sites. Central to our mission is the utmost priority placed on
            preventing fraud, ensuring a secure and trustworthy platform for
            all.
          </p>
        </div>
        <div className={styles.mission}>
          <h2 className="text-center font-normal text-4xl">Our Mission</h2>
          <p className="my-6 text-justify">
            Our mission at our platform is to revolutionize the hostel-seeking
            experience in Kathmandu Valley. Initially servicing specific
            locations due to resource limitations, we're committed to extending
            our reach across the entirety of the valley. Our goal is to
            alleviate the confusion faced by visitors when seeking
            accommodations in the capital city. By providing a platform for
            hostels to register and showcase individual rooms with authentic
            photos, we aim to empower our audience to explore and directly book
            accommodations without intermediaries. Ensuring genuine and reliable
            information is crucial; thus, any fraudulent data uploaded by hostel
            owners will face serious consequences as we prioritize authenticity.
            While we don't facilitate monetary transactions, our platform's
            primary focus is to connect audiences with hostel owners, offering a
            transparent and trustworthy interface for seamless hostel
            exploration and booking.
          </p>
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}

export default AboutUsSection;
