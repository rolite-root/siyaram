import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 bg-[url('/.png')] bg-cover bg-center text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image
              src="/logo.svg"
              alt="Siyaram Nursery and Farm Logo"
              width={150}
              height={80}
            />
            <h4 className="text-lg font-semibold mt-4 text-gray-600">Contacts</h4>
            <p className="text-gray-600">
              <strong>Address:</strong> NH-66, CUNCOLIM, South Goa-403703
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> +91 9309588100
            </p>
            <p className="text-gray-600">
              <strong>Hours:</strong> All day 8 AM to 8 PM
            </p>
            <h4 className="text-lg font-semibold mt-4 text-gray-600">Follow Us</h4>
            <div className="flex gap-4 mt-2 text-gray-600">
              {["facebook", "twitter", "instagram", "pinterest", "youtube"].map(
                (platform) => (
                  <Link href="#" key={platform} aria-label={platform}>
                    <span className="text-gray-500 hover:text-gray-800">
                      <i className={`fab fa-${platform} text-2xl`}></i>
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-600">About</h4>
            <ul className="text-gray-600 space-y-2">
              {[
                { text: "About us", href: "/about" },
                { text: "Delivery Information", href: "/delivery" },
                { text: "Privacy Policy", href: "/privacy-policy" },
                { text: "Terms & Conditions", href: "/terms" },
                { text: "Contact Us", href: "/contact" },
              ].map(({ text, href }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-gray-800">
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-600">My Account</h4>
            <ul className="text-gray-600 space-y-2">
              {[
                { text: "Sign In", href: "/login" },
                { text: "View Cart", href: "/cart" },
                { text: "My Wishlist", href: "/wishlist" },
                { text: "Track My Order", href: "/trackorder" },
                { text: "Help", href: "/support" },
              ].map(({ text, href }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-gray-800"> 
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-600">Install App</h4>
            <p className="text-gray-600 mb-4 text-gray-600">
              From App Store or Google Play
            </p>
            <div className="flex gap-4">
              <Link href="https://www.apple.com/app-store/">
                  <Image
                    src="/images/app.jpg" 
                    alt="Download on the App Store"
                    width={140}
                    height={40}
                  />
                
              </Link>
              <Link href="https://play.google.com/store">
                
                  <Image
                    src="/images/play.jpg" 
                    alt="Get it on Google Play"
                    width={140}
                    height={40}
                  />
                
              </Link>
            </div>
            <h4 className="text-lg font-semibold mt-8 text-gray-600">We accept Secure Payment Gateways</h4>
            <div className="flex gap-4 mt-4 text-gray-600">
              {["visa", "mastercard", "paytm", "gpay"].map((gateway) => (
                <Image
                  key={gateway}
                  src={`/images/${gateway}.png`} 
                  alt={`${gateway} logo`}
                  width={50}
                  height={30}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          © 2024, Siyaram Nursery
        </div>
      </div>
    </footer>
  );
};

export default Footer;
