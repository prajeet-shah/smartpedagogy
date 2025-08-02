import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-xl font-bold mb-2">SmartPedagogy</h2>
          <p className="text-sm text-gray-400">
            Empowering education with AI. Built with ❤️ by students.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Product</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <a href="/features" className="hover:underline">
                Features
              </a>
            </li>
            <li>
              <a href="/pricing" className="hover:underline">
                Pricing
              </a>
            </li>
            <li>
              <a href="/roadmap" className="hover:underline">
                Roadmap
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <a href="/faq" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <svg
                className="w-6 h-6 text-gray-300 hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.207 11.385.6.113.793-.258.793-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.808 1.304 3.495.997.108-.775.42-1.304.763-1.603-2.665-.304-5.466-1.333-5.466-5.931 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.526.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.65.243 2.873.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.804 5.624-5.475 5.921.431.372.815 1.104.815 2.224 0 1.606-.015 2.9-.015 3.292 0 .322.19.694.8.576C20.565 22.297 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z" />
              </svg>
            </a>
            {/* Add more social icons like Twitter, LinkedIn here */}
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SmartPedagogy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
