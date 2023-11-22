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
        Native Plug pvt. ltd
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
            incidunt voluptates cum odio vel impedit obcaecati aliquid hic
            aspernatur reiciendis minus laborum inventore modi accusantium esse.
            Id eius vitae perspiciatis a aliquam minima adipisci cupiditate hic,
            ea pariatur velit quod doloribus corporis sit, mollitia dolore,
            maxime blanditiis quibusdam amet. Quo animi optio nesciunt tempora
            enim, aperiam praesentium velit inventore unde nam sapiente id saepe
            esse autem modi quis quos pariatur! Expedita cupiditate doloremque
            asperiores repellat eaque quibusdam perspiciatis. Asperiores facere,
            omnis hic mollitia maiores at fugit, obcaecati aliquid quis,
            suscipit voluptatem odio voluptatum voluptas animi delectus expedita
            voluptates magnam accusamus.{" "}
          </p>
        </div>
        <div className={styles.mission}>
          <h2 className="text-center font-normal text-4xl">Our Mission</h2>
          <p className="my-6 text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
            facilis quasi iusto eius ea neque aspernatur. Ex sapiente iusto
            accusantium voluptatibus soluta ullam corrupti. Inventore tempore
            illum praesentium a eaque totam et eveniet accusamus omnis, rem
            expedita unde distinctio consectetur, tenetur amet ipsum quibusdam
            alias voluptates velit odit quidem. Quae similique, distinctio a id
            molestias quisquam itaque nesciunt laudantium blanditiis dolorum
            repellendus impedit cum assumenda eum nisi vel inventore ad
            laboriosam? A doloremque quam asperiores repudiandae beatae. Nam
            tempore, id sunt recusandae quisquam soluta blanditiis ratione.
            Optio ipsam quam eius, minima sint asperiores perspiciatis veniam
            reprehenderit rerum recusandae nobis veritatis.
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
