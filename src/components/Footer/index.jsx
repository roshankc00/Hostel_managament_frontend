import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black py-8 text-white w-full rounded-t-[30px]">
      <div className="container mx-auto max-w-[1280px]">
        <div className="flex items-center justify-evenly gap-3 flex-col sm:flex-row">
          <div className="flex items-center justify-center flex-col w-full sm:border-r border-white h-full sm:py-1">
            <h2 className="text-xl font-semibold mb-2">Legal</h2>
            <ul className="text-base flex items-center justify-center flex-col">
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center w-full sm:border-r border-white sm:py-4">
            <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
            <ul className="text-base flex items-center md:justify-evenly justify-center gap-3">
              <li>
                <a
                  href="https://www.facebook.com"
                  rel="noreferrer"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  <FaFacebook size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  rel="noreferrer"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  <FaTwitter size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  rel="noreferrer"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  <FaInstagram size={24} />
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center flex-col w-full">
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p>Email: </p> <p>contact@nepalhostels.com</p>
            <p>Phone: +977-456-7890</p>
          </div>
        </div>
        <p className="pt-2 sm:ml-[6vw] text-gray-300 text-center sm:text-left">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
