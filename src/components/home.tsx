import React from "react";
import HeroSection from "./HeroSection";
import ImageGrid from "./ImageGrid";
import ExplanationSection from "./ExplanationSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-black">dora.run</h1>
        </div>
        <div className="flex items-center space-x-6">
          <a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            Examples
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            Docs
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            Blog
          </a>
          <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800">
            Sign In
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ImageGrid />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ExplanationSection />
        </div>

        {/* Additional Content Section */}
        <div className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Ready to create your own AI art?
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Start generating beautiful, unique artwork with our advanced AI
                tools today.
              </p>
              <div className="mt-8 flex justify-center">
                <button className="px-6 py-3 text-base font-medium text-white bg-black rounded-md hover:bg-gray-800 mr-4">
                  Get Started
                </button>
                <button className="px-6 py-3 text-base font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">dora.run</h3>
              <p className="mt-2 text-sm text-gray-600">
                AI-powered art generation platform for creators and designers.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Product
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Resources
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-100 pt-8">
            <p className="text-sm text-gray-600 text-center">
              &copy; {new Date().getFullYear()} dora.run. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
