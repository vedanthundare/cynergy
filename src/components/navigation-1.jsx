"use client";
import React from "react";

function Navigation1({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "work", label: "Our Work" },
    { id: "careers", label: "Careers" },
    { id: "contact", label: "Contact Us" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-gray-900 dark:text-white font-inter font-bold text-xl"
            >
              Cynergy Studios
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.id === "careers" ? (
                <a
                  key={item.id}
                  href="/careers"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-inter"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-inter"
                >
                  {item.label}
                </button>
              )
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) =>
                item.id === "careers" ? (
                  <a
                    key={item.id}
                    href="/careers"
                    className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-inter"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-inter"
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function Navigation1Story() {
  const handleNavigate = (sectionId) => {
    console.log("Navigating to:", sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navigation1 onNavigate={handleNavigate} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-700 dark:text-gray-300 font-inter">
            Navigation component shown above. This is a demo page to show the
            navigation in context.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navigation1;