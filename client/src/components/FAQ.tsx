import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What services does MR LUBE EXPERT offer?",
    answer:
      "We offer comprehensive automotive services including engine oil changes, wheel alignment, AC service, brake service, suspension repair, tire service, car detailing, foam wash, engine inspection, and paint protection. All services are performed by certified technicians using modern diagnostic equipment.",
  },
  {
    id: "2",
    question: "How do I book a service appointment?",
    answer:
      "You can book a service appointment through our website using the 'Book a Service' page. Simply fill in your vehicle details, select the service you need, choose your preferred date and time, and submit the form. You can also call us directly at +91 9538223688 or +91 7676317355 to schedule an appointment.",
  },
  {
    id: "3",
    question: "What is your service turnaround time?",
    answer:
      "Service turnaround time varies depending on the type of service. Basic services like oil changes typically take 30-45 minutes. More complex services like wheel alignment or AC service may take 1-2 hours. We'll provide you with an estimated time when you book your appointment.",
  },
  {
    id: "4",
    question: "Do you provide warranty on your services?",
    answer:
      "Yes, we provide warranty on all our services. The warranty period varies depending on the service type. For example, oil changes come with a 3-month warranty, while major repairs come with a 6-month warranty. Please ask our staff for specific warranty details when you visit.",
  },
  {
    id: "5",
    question: "What types of vehicles do you service?",
    answer:
      "We service all types of vehicles including sedans, SUVs, hatchbacks, two-wheelers, and commercial vehicles. Our certified technicians have experience with all major brands and models. Whether you drive a domestic or imported vehicle, we have the expertise to service it.",
  },
  {
    id: "6",
    question: "Are your technicians certified and experienced?",
    answer:
      "Yes, all our technicians are certified and have extensive experience in the automotive service industry. Our team undergoes regular training to stay updated with the latest automotive technologies and service standards. We maintain high quality standards to ensure your vehicle receives the best care.",
  },
  {
    id: "7",
    question: "What are your working hours?",
    answer:
      "Our working hours are Monday to Friday: 9:00 AM - 6:00 PM, Saturday: 9:00 AM - 2:00 PM, and we are closed on Sundays. We recommend booking your appointment in advance to ensure availability, especially during peak hours.",
  },
  {
    id: "8",
    question: "Do you offer emergency roadside assistance?",
    answer:
      "While we primarily operate from our workshop, we recommend contacting us immediately if you face any vehicle issues. We can provide guidance over the phone and arrange for your vehicle to be brought to our facility if needed. Please call us at +91 9538223688 for emergency assistance.",
  },
  {
    id: "9",
    question: "How much does a typical service cost?",
    answer:
      "Service costs vary depending on the type of service and your vehicle model. Basic services like oil changes start from ₹500-1000, while more comprehensive services may cost more. We provide transparent pricing and will give you a detailed quote before starting any work. Contact us for specific pricing information.",
  },
  {
    id: "10",
    question: "Can I wait while my vehicle is being serviced?",
    answer:
      "Yes, you can wait at our facility while your vehicle is being serviced. We have a comfortable waiting area where you can relax. For longer services, we recommend dropping off your vehicle and returning at the scheduled time. You can also use our WhatsApp service to stay updated on your vehicle's status.",
  },
];

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our services and how we can help you
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:border-accent/50"
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-card hover:bg-card/80 transition-colors text-left"
                aria-expanded={expandedId === item.id}
                aria-controls={`faq-content-${item.id}`}
              >
                <span className="text-lg font-semibold text-foreground pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${
                    expandedId === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Accordion Content */}
              <div
                id={`faq-content-${item.id}`}
                className={`overflow-hidden transition-all duration-300 ${
                  expandedId === item.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 py-4 bg-background/50 border-t border-border text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center p-8 bg-card rounded-lg border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our team is here to help. Contact us directly for any additional information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919538223688"
              className="px-6 py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Call Us
            </a>
            <a
              href="https://wa.me/919538223688"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Chat on WhatsApp
            </a>
            <a
              href="/contact"
              className="px-6 py-3 bg-card border border-border text-foreground font-semibold rounded-lg hover:bg-card/80 transition-colors"
            >
              Contact Form
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
