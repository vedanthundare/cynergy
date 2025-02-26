"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function MainComponent() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactFormError, setContactFormError] = useState("");
  const [contactFormSuccess, setContactFormSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      element.scrollIntoView({ behavior: "smooth" });
      window.scrollBy(0, -navOffset);
      setIsMenuOpen(false);
    }
  };
  const projectTypes = ["all", "web", "mobile", "ai"];
  const projects = [
    {
      id: 1,
      type: "web",
      title: "TechHealth Connect",
      description:
        "Revolutionized healthcare access through a telemedicine platform that connects patients with specialists. Implemented real-time video consultations and secure medical record sharing.",
      challenge:
        "Creating a HIPAA-compliant platform that handles sensitive medical data while providing a seamless user experience.",
      tech: ["React", "Node.js", "WebRTC", "AWS", "HIPAA Compliance"],
      image: "/projects/telemedicine.jpg",
    },
    {
      id: 2,
      type: "mobile",
      title: "EcoTracker",
      description:
        "Developed a mobile app that helps users track and reduce their carbon footprint through AI-powered recommendations and community engagement.",
      challenge:
        "Processing complex environmental data in real-time while maintaining app performance.",
      tech: ["React Native", "TensorFlow", "Node.js", "MongoDB", "AWS"],
      image: "/projects/eco-app.jpg",
    },
    {
      id: 3,
      type: "ai",
      title: "RetailGenius AI",
      description:
        "Built an AI-powered inventory management system for retail chains, reducing waste by 40% and improving stock prediction accuracy.",
      challenge:
        "Integrating multiple data sources and creating accurate prediction models for diverse product categories.",
      tech: ["Python", "TensorFlow", "FastAPI", "PostgreSQL", "Docker"],
      image: "/projects/retail-ai.jpg",
    },
    {
      id: 4,
      type: "web",
      title: "CreativeFlow Studio",
      description:
        "Designed and developed a collaborative platform for creative professionals, featuring real-time design tools and project management.",
      challenge:
        "Building a performant real-time collaboration system with complex state management.",
      tech: ["Next.js", "Three.js", "WebSocket", "Redis", "AWS"],
      image: "/projects/creative-platform.jpg",
    },
    {
      id: 5,
      type: "mobile",
      title: "UrbanMove",
      description:
        "Created a smart city transportation app that integrates multiple modes of transport with real-time tracking and AI route optimization.",
      challenge:
        "Coordinating multiple transportation APIs and providing accurate real-time updates.",
      tech: ["Flutter", "GraphQL", "Node.js", "PostgreSQL", "Google Maps API"],
      image: "/projects/urban-transport.jpg",
    },
  ];
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.type === filter);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <div className="text-4xl md:text-6xl font-bold text-[#111827] font-inter mb-6">
          CYNERGY
        </div>
        <div className="flex space-x-2">
          <div className="dot-1 w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
          <div className="dot-2 w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
          <div className="dot-3 w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
        </div>
        <style jsx>{`
    .dot-1, .dot-2, .dot-3 {
      animation: dotPulse 1.5s infinite;
    }
    .dot-2 {
      animation-delay: 0.2s;
    }
    .dot-3 {
      animation-delay: 0.4s;
    }
    @keyframes dotPulse {
      0%, 100% {
        opacity: 0.2;
        transform: scale(0.8);
      }
      50% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `}</style>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#FFFFFF]">
      <nav
        className={`fixed w-full z-40 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a
              href="/"
              className="text-[#111827] text-2xl font-semibold font-inter"
            >
              Cynergy Studios
            </a>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setShowContactModal(true)}
                className="px-6 py-2 text-[#4B5563] hover:text-[#111827] font-inter text-base transition-colors duration-200"
              >
                Contact Us
              </button>
              <a
                href="/careers"
                className="bg-[#0EA5E9] text-white px-6 py-2 rounded-full font-inter font-medium hover:bg-[#0284C7] transition-all duration-300"
              >
                Join Our Team
              </a>
            </div>
          </div>
        </div>
      </nav>

      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold font-inter text-[#111827]">
                Contact Us
              </h3>
              <button
                onClick={() => {
                  setShowContactModal(false);
                  setContactFormData({ name: "", email: "", message: "" });
                  setContactFormError("");
                  setContactFormSuccess(false);
                }}
                className="text-[#4B5563] hover:text-[#111827]"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                setContactFormError("");
                setContactFormSuccess(false);

                try {
                  const response = await fetch("/api/submit-contact", {
                    method: "POST",
                    body: JSON.stringify(contactFormData),
                  });

                  const result = await response.json();

                  if (result.error) {
                    setContactFormError(result.error);
                  } else {
                    setContactFormSuccess(true);
                    setContactFormData({ name: "", email: "", message: "" });
                    setTimeout(() => {
                      setShowContactModal(false);
                      setContactFormSuccess(false);
                    }, 2000);
                  }
                } catch (err) {
                  setContactFormError(
                    "Failed to submit message. Please try again."
                  );
                }
              }}
            >
              {contactFormSuccess && (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg">
                  Thank you for your message! We'll be in touch soon!
                </div>
              )}

              {contactFormError && (
                <div className="bg-red-50 text-red-800 p-4 rounded-lg">
                  {contactFormError}
                </div>
              )}

              <div>
                <label
                  htmlFor="modal-name"
                  className="block text-sm font-medium text-[#4B5563] mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="modal-name"
                  name="name"
                  required
                  value={contactFormData.name}
                  onChange={(e) =>
                    setContactFormData({
                      ...contactFormData,
                      name: e.target.value,
                    })
                  }
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all duration-300 font-inter"
                />
              </div>
              <div>
                <label
                  htmlFor="modal-email"
                  className="block text-sm font-medium text-[#4B5563] mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="modal-email"
                  name="email"
                  required
                  value={contactFormData.email}
                  onChange={(e) =>
                    setContactFormData({
                      ...contactFormData,
                      email: e.target.value,
                    })
                  }
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all duration-300 font-inter"
                />
              </div>
              <div>
                <label
                  htmlFor="modal-message"
                  className="block text-sm font-medium text-[#4B5563] mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  required
                  value={contactFormData.message}
                  onChange={(e) =>
                    setContactFormData({
                      ...contactFormData,
                      message: e.target.value,
                    })
                  }
                  rows="4"
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all duration-300 font-inter"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#0EA5E9] text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-[#0284C7] transition-all duration-300 flex items-center justify-center group"
              >
                Send Message
                <i className="fas fa-paper-plane ml-2 transform group-hover:translate-x-1 transition-transform"></i>
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="h-20"></div>
      <section
        id="home"
        className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#E0F2F1] to-[#E3F2FD]"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-float-1 absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#0EA5E9]/5 blur-3xl"></div>
          <div className="animate-float-2 absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#10B981]/5 blur-3xl"></div>
          <div className="animate-rotate absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#0EA5E9]/10 rounded-full"></div>
          <div className="animate-rotate-reverse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#10B981]/10 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-5rem)] flex items-center">
          <div className="w-full max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold font-inter text-[#111827] mb-8 leading-tight animate-fade-in">
              Empowering Ideas,
              <br />
              Building Tomorrow
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#4B5563] font-inter mb-12 max-w-2xl mx-auto animate-slide-up">
              We're a digital agency that transforms visionary concepts into
              exceptional digital experiences, combining innovation with
              precision craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up">
              <button
                onClick={() => scrollToSection("work")}
                className="w-full sm:w-auto bg-[#0EA5E9] text-white px-8 py-4 rounded-full font-inter font-medium hover:bg-[#0284C7] transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                Explore Our Work
                <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto bg-transparent text-[#111827] px-8 py-4 rounded-full font-inter font-medium hover:bg-[#111827]/5 transition-all duration-300"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="py-32 px-6 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold font-inter text-[#111827] text-center mb-20">
            About Us
          </h2>

          <div className="mb-24 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold font-inter text-[#111827] mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-[#4B5563] font-inter mb-8">
              To empower businesses through innovative digital solutions that
              drive growth and create lasting impact. We combine cutting-edge
              technology with creative excellence to transform ideas into
              exceptional digital experiences.
            </p>
          </div>

          <div className="mb-24">
            <h3 className="text-2xl font-semibold font-inter text-[#111827] text-center mb-12">
              Our Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "globe",
                  title: "Web Development",
                  description:
                    "Responsive websites and progressive web applications",
                },
                {
                  icon: "mobile-alt",
                  title: "App Development",
                  description: "Native and cross-platform mobile applications",
                },
                {
                  icon: "search",
                  title: "SEO Services",
                  description:
                    "Search engine optimization and digital presence",
                },
                {
                  icon: "palette",
                  title: "Design Services",
                  description: "UI/UX design and graphic design solutions",
                },
                {
                  icon: "robot",
                  title: "AI Solutions",
                  description: "Chatbots, ML models, and computer vision",
                },
                {
                  icon: "brain",
                  title: "LLM Services",
                  description: "Custom LLM fine-tuning and implementations",
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <i
                    className={`fas fa-${service.icon} text-3xl text-[#0EA5E9] mb-4`}
                  ></i>
                  <h4 className="text-xl font-semibold font-inter text-[#111827] mb-3">
                    {service.title}
                  </h4>
                  <p className="text-[#4B5563] font-inter">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold font-inter text-[#111827] text-center mb-12">
              Meet Our Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Harsh Doshi",
                  role: "Marketing & Client Outreach",
                  image: "/team/harsh.jpg",
                },
                {
                  name: "Asmit Dash",
                  role: "ML/AI & Backend Specialist",
                  image: "/team/asmit.jpg",
                },
                {
                  name: "Vedant Hundare",
                  role: "Web Development & Cloud Expert",
                  image: "/team/vedant.jpg",
                },
                {
                  name: "Vidhi Bhanushali",
                  role: "UI/UX & Graphics Design Specialist",
                  image: "/team/vidhi.jpg",
                },
              ].map((member) => (
                <div key={member.name} className="text-center group">
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9] to-[#10B981] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/200x200.png?text=" +
                          member.name;
                      }}
                    />
                  </div>
                  <h4 className="text-xl font-semibold font-inter text-[#111827] mb-2">
                    {member.name}
                  </h4>
                  <p className="text-[#4B5563] font-inter">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold font-inter text-[#111827] text-center mb-20">
            Our Work
          </h2>

          <div className="flex justify-center mb-12 space-x-4">
            {projectTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-full font-inter font-medium transition-all duration-300 ${
                  filter === type
                    ? "bg-[#0EA5E9] text-white"
                    : "bg-[#F9FAFB] text-[#4B5563] hover:bg-[#E0F2F1]"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold font-inter text-[#111827] mb-4">
                    {project.title}
                  </h3>
                  <p className="text-[#4B5563] font-inter mb-6">
                    {project.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold font-inter text-[#111827] mb-2">
                      The Challenge
                    </h4>
                    <p className="text-[#4B5563] font-inter">
                      {project.challenge}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#F3F4F6] text-[#4B5563] text-sm font-inter rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="py-32 px-6 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold font-inter text-[#111827] mb-6">
              Let's Create Something Amazing Together
            </h2>
            <p className="text-xl text-[#4B5563] font-inter max-w-2xl mx-auto">
              Have a project in mind? We'd love to hear about it. Drop us a
              message, and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                setContactFormError("");
                setContactFormSuccess(false);

                try {
                  const response = await fetch("/api/submit-contact", {
                    method: "POST",
                    body: JSON.stringify(contactFormData),
                  });

                  const result = await response.json();

                  if (result.error) {
                    setContactFormError(result.error);
                  } else {
                    setContactFormSuccess(true);
                    setContactFormData({ name: "", email: "", message: "" });
                  }
                } catch (err) {
                  setContactFormError(
                    "Failed to submit message. Please try again."
                  );
                }
              }}
            >
              {contactFormSuccess && (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg">
                  Thank you for your message! We'll be in touch soon!
                </div>
              )}

              {contactFormError && (
                <div className="bg-red-50 text-red-800 p-4 rounded-lg">
                  {contactFormError}
                </div>
              )}

              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-[#4B5563] mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  value={contactFormData.name}
                  onChange={(e) =>
                    setContactFormData({
                      ...contactFormData,
                      name: e.target.value,
                    })
                  }
                  placeholder="John Doe"
                  className="w-full px-6 py-4 rounded-lg border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all duration-300 font-inter"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-[#4B5563] mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  value={contactFormData.email}
                  onChange={(e) =>
                    setContactFormData({
                      ...contactFormData,
                      email: e.target.value,
                    })
                  }
                  placeholder="john@example.com"
                  className="w-full px-6 py-4 rounded-lg border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all duration-300 font-inter"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-[#4B5563] mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  value={contactFormData.message}
                  onChange={(e) =>
                    setContactFormData({
                      ...contactFormData,
                      message: e.target.value,
                    })
                  }
                  rows="4"
                  placeholder="Tell us about your project..."
                  className="w-full px-6 py-4 rounded-lg border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all duration-300 font-inter"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#0EA5E9] text-white px-8 py-4 rounded-lg font-inter font-medium hover:bg-[#0284C7] transition-all duration-300 flex items-center justify-center group"
              >
                Send Message
                <i className="fas fa-paper-plane ml-2 transform group-hover:translate-x-1 transition-transform"></i>
              </button>
            </form>

            <div className="space-y-12">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-semibold font-inter text-[#111827] mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-[#0EA5E9]">
                      <i className="fas fa-envelope text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#111827]">Email Us</h4>
                      <a
                        href="mailto:hello@cynergystudios.com"
                        className="text-[#4B5563] hover:text-[#0EA5E9] transition-colors"
                      >
                        hello@cynergystudios.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="text-[#0EA5E9]">
                      <i className="fas fa-phone text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#111827]">Call Us</h4>
                      <a
                        href="tel:+15551234567"
                        className="text-[#4B5563] hover:text-[#0EA5E9] transition-colors"
                      >
                        (555) 123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="text-[#0EA5E9]">
                      <i className="fas fa-map-marker-alt text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#111827]">Visit Us</h4>
                      <p className="text-[#4B5563]">
                        123 Innovation Street
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-semibold font-inter text-[#111827] mb-6">
                  Connect With Us
                </h3>
                <div className="flex space-x-6">
                  {[
                    { icon: "twitter", url: "https://twitter.com" },
                    { icon: "linkedin", url: "https://linkedin.com" },
                    { icon: "instagram", url: "https://instagram.com" },
                    { icon: "github", url: "https://github.com" },
                  ].map((platform) => (
                    <a
                      key={platform.icon}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4B5563] hover:text-[#0EA5E9] transition-colors duration-300"
                    >
                      <i className={`fab fa-${platform.icon} text-2xl`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-[#F9FAFB] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <h3 className="text-2xl font-semibold font-inter text-[#111827] mb-4">
                Cynergy Studios
              </h3>
              <p className="text-[#4B5563] font-inter">
                Creating digital experiences that inspire and innovate.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold font-inter text-[#111827] mb-4">
                Connect
              </h3>
              <div className="flex space-x-4">
                {["twitter", "linkedin", "instagram"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="text-[#4B5563] hover:text-[#0EA5E9] transition-colors duration-300"
                  >
                    <i className={`fab fa-${platform} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <a
                href="/careers"
                className="inline-block bg-[#0EA5E9] text-white px-8 py-3 rounded-full font-inter font-medium hover:bg-[#0284C7] transition-all duration-300"
              >
                Join Our Team
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-[#4B5563] font-inter text-center">
              © 2025 Cynergy Studios. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, -20px) rotate(5deg); }
        }

        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(-5deg); }
        }

        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes rotate-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }

        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.2s both;
        }

        .animate-float-1 {
          animation: float-1 20s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 25s ease-in-out infinite;
        }

        .animate-rotate {
          animation: rotate 40s linear infinite;
        }

        .animate-rotate-reverse {
          animation: rotate-reverse 35s linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.4s both;
        }

        /* Improved button interactions */
        button {
          transition: all 0.3s ease-out;
        }

        button:active {
          transform: scale(0.98);
        }

        /* Enhanced focus states for accessibility */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid #0EA5E9;
          outline-offset: 2px;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Responsive typography */
        @media (max-width: 640px) {
          h1 {
            font-size: 2.5rem;
          }
          h2 {
            font-size: 2rem;
          }
          p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;