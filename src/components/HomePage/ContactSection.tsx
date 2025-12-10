import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "../../lib/supabase";

const ContactSection: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [contactFormSubmitting, setContactFormSubmitting] = useState(false);
  const [contactFormSuccess, setContactFormSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setContactFormSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          first_name: contactForm.firstName,
          last_name: contactForm.lastName,
          email: contactForm.email,
          project_type: contactForm.projectType,
          message: contactForm.message,
        },
      ]);

      if (error) throw error;

      setContactFormSuccess(true);
      setContactForm({
        firstName: "",
        lastName: "",
        email: "",
        projectType: "",
        message: "",
      });
      setTimeout(() => setContactFormSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setContactFormSubmitting(false);
    }
  };

  return (
    <>
      {/* Extended Beige Separator Line After About Section */}
      <div className="flex justify-center py-16 bg-black">
        <div className="w-[250px] md:w-[800px] h-0.5 relative">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, transparent, #D7B387 10%, #D7B387 90%, transparent)",
            }}
          />
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to discuss your next project?
            </p>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From material selection to design consultation, our team is here
              to provide insight, samples, and support tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <div className="font-semibold text-white">
                      Visit Our Showroom
                    </div>
                    <div className="text-gray-300">
                      181 Grigoriou Lambraki St., Thessaloniki 543 42
                      <br />
                      Fotiadis – Bathroom & Tiles
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <div className="font-semibold text-white">Call Us</div>
                    <div className="text-gray-300">210 440 85 85</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <div className="font-semibold text-white">Email Us</div>
                    <div className="text-gray-300">
                      info@artenomaterials.com
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-950 text-white shadow-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors rounded-2xl">
                <h4 className="font-semibold text-white mb-2">
                  Business Hours
                </h4>
                <div className="space-y-1 text-gray-300">
                  <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                  <div>Saturday: 9:00 AM - 2:00 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
            </div>

            <div>
              {contactFormSuccess ? (
                <div className="bg-green-900/20 border border-green-500 text-green-400 px-6 py-4 rounded-lg">
                  <p className="font-semibold">Thank you for your message!</p>
                  <p className="text-sm mt-1">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block font-medium text-gray-300 mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={contactForm.firstName}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-lg shadow-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="...."
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block font-medium text-gray-300 mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={contactForm.lastName}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            lastName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-lg shadow-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="...."
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-medium text-gray-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-lg shadow-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="....@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="project"
                      className="block font-medium text-gray-300 mb-2"
                    >
                      Project Type
                    </label>
                    <select
                      id="project"
                      value={contactForm.projectType}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          projectType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-lg shadow-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors dropdown-custom"
                      required
                    >
                      <option value="" className="bg-white text-black">
                        Select a project type
                      </option>
                      <option
                        value="residential"
                        className="bg-white text-black"
                      >
                        Residential
                      </option>
                      <option
                        value="commercial"
                        className="bg-white text-black"
                      >
                        Commercial
                      </option>
                      <option
                        value="industrial"
                        className="bg-white text-black"
                      >
                        Industrial
                      </option>
                      <option value="other" className="bg-white text-black">
                        Other
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-medium text-gray-300 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-lg shadow-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactFormSubmitting}
                    className="w-full text-black py-3 px-6 rounded-lg font-semibold transition-colors hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: "#D7B387" }}
                  >
                    {contactFormSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
