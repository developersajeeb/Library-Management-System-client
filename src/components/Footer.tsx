import { Separator } from "@/components/ui/separator";
import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import { NavLink } from "react-router";

const footerLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Books",
    href: "/books",
  },
  {
    title: "Create Book",
    href: "/create-book",
  },
  {
    title: "Borrow Summary",
    href: "/borrow-summary",
  }
];

const Footer = () => {
  return (
      <footer className="bg-gray-100 px-4">
        <div className="">
          <div className="py-12 flex flex-col justify-start items-center">
            {/* Logo */}
            <img src="/image/logo.png" alt="EduShelf" className="w-full max-w-40" />

            <ul className="mt-6 flex items-center gap-4 flex-wrap justify-center">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <NavLink
                    to={href}
                    className="text-muted-foreground hover:text-foreground font-medium"
                  >
                    {title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground text-center">
              &copy; {new Date().getFullYear()}{" "}
              <NavLink to="/" target="_blank">
                EduShelf
              </NavLink>
              . Develop by <a href="https://developersajeeb.com" target="_blank" className="font-bold">DeveloperSajeeb</a>.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <NavLink to="#" target="_blank">
                <TwitterIcon className="h-5 w-5" />
              </NavLink>
              <NavLink to="#" target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </NavLink>
              <NavLink to="#" target="_blank">
                <TwitchIcon className="h-5 w-5" />
              </NavLink>
              <NavLink to="#" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </NavLink>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;