import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 rounded-t-[30px]">
      <div className="flex flex-col md:flex-row-reverse justify-between px-12 max-w-[1280px]">
        <div className="mb-4 md:mb-0 flex flex-row items-center justify-center gap-6">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com"
            className="outline-1 text-[20px] text-white"
          >
            <FaFacebook />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com"
            className="outline-1 text-[20px] text-white"
          >
            <FaInstagram />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.twitter.com"
            className="outline-1 text-[20px] text-white"
          >
            <FaTwitter />
          </a>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p>Phone: +977-456-7890</p>
          <p>contact@nepalhostels.com</p>
        </div>
        <div className="flex flex-col">
          <p className="text-center text-xl mt-4 md:mt-2">
            &copy; Native Plug {new Date().getFullYear()}
          </p>
          <a href="/privacy" className="text-center underline mt-1">
            Privacy Policy
          </a>
          <a href="/terms" className="text-center underline mt-1">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
