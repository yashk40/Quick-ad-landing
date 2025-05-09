"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "Can I Customize The Ad Templates Provided By Quickads?",
    answer:
      "Yes, all templates in Quickads are fully customizable. You can change colors, fonts, text, images, and layouts to match your brand identity. Our intuitive editor makes it easy to personalize any template without design skills.",
  },
  {
    question: "Do I Need Any Design Or Coding Skills To Use Quickads?",
    answer:
      "No, Quickads is designed to be user-friendly for everyone, regardless of technical background. Our drag-and-drop interface and pre-designed templates eliminate the need for coding or design expertise. You can create professional-looking ads in minutes.",
  },
  {
    question: "Can I Use Quickads To Create Ads For Social Media Platforms?",
    answer:
      "Quickads supports all major social media platforms including Facebook, Instagram, TikTok, LinkedIn, Twitter, and more. Our templates are optimized for each platform's specifications and best practices to ensure your ads perform well.",
  },
  {
    question: "How Many Ads Can I Create With My Subscription?",
    answer:
      "The number of ads you can create depends on your subscription plan. Our Basic plan allows for up to 50 ads per month, Small Business plan includes 200 ads per month, and our Agency/Pro plan offers unlimited ad creation. Check our pricing page for detailed information.",
  },
  {
    question: "Can I Cancel My Subscription At Any Time?",
    answer:
      "Yes, you can cancel your subscription at any time. There are no long-term commitments or cancellation fees. If you cancel, you'll still have access to your subscription until the end of your current billing period.",
  },
]

// Individual FAQ item component with its own useInView hook
function FAQItem({
  faq,
  index,
  expandedIndex,
  toggleFAQ,
}: {
  faq: FAQItem
  index: number
  expandedIndex: number | null
  toggleFAQ: (index: number) => void
}) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    delay: 100,
  })

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-white rounded-xl overflow-hidden shadow-md border hover:shadow-lg transition-shadow duration-300"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <button onClick={() => toggleFAQ(index)} className="flex justify-between items-center w-full p-6 text-left">
        <span className="font-medium text-gray-800 pr-4">
          {index + 1}. {faq.question}
        </span>
        <div
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center border transition-all duration-300",
            expandedIndex === index
              ? "bg-purple-600 border-purple-600 text-white rotate-0"
              : "bg-white border-gray-200 text-gray-400 hover:border-purple-200 hover:text-purple-600",
          )}
        >
          {expandedIndex === index ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>

      <AnimatePresence>
        {expandedIndex === index && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">{faq.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section className="py-20 bg-[#f9f7fe] relative overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-12 -left-24 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="md:sticky md:top-24">
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded-full mb-4 shadow-sm">
              QUESTIONS
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-600">
              In Case You Missed
              <br />
              Anything
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Still have questions? We're here to help you find the perfect plan for your needs.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg">
              Try Now
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform rotate-45"
              >
                <path d="M8 12L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 8L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Button>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} expandedIndex={expandedIndex} toggleFAQ={toggleFAQ} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
