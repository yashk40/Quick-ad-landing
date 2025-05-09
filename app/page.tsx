"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import PricingCards from "@/components/pricing-cards"
import FAQSection from "@/components/faq-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

type PlanType = "software" | "service"
type BillingType = "monthly" | "yearly" | "lifetime"

interface PricingPlan {
  name: string
  originalPrice: number
  price: number
  trial: string
  features: {
    watermark: string
    searchLibrary: boolean
    brandkits: number
  }
  highlighted?: boolean
}

export default function PricingPage() {
  const [planType, setPlanType] = useState<PlanType>("software")
  const [billingType, setBillingType] = useState<BillingType>("monthly")

  // Pricing data for different combinations
  const pricingData: Record<PlanType, Record<BillingType, PricingPlan[]>> = {
    software: {
      monthly: [
        {
          name: "Basic Plan",
          originalPrice: 29,
          price: 1,
          trial: "5 Days Trial",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 3,
          },
        },
        {
          name: "Small Business",
          originalPrice: 59,
          price: 1,
          trial: "5 Days Trial",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 5,
          },
          highlighted: true,
        },
        {
          name: "Agency / Pro",
          originalPrice: 99,
          price: 1,
          trial: "5 Days Trial",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 20,
          },
        },
      ],
      yearly: [
        {
          name: "Basic Plan",
          originalPrice: 290,
          price: 199,
          trial: "14 Days Trial",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 5,
          },
        },
        {
          name: "Small Business",
          originalPrice: 590,
          price: 399,
          trial: "14 Days Trial",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 10,
          },
          highlighted: true,
        },
        {
          name: "Agency / Pro",
          originalPrice: 990,
          price: 699,
          trial: "14 Days Trial",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 30,
          },
        },
      ],
      lifetime: [
        {
          name: "Basic Plan",
          originalPrice: 499,
          price: 349,
          trial: "30 Days Money Back",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 10,
          },
        },
        {
          name: "Small Business",
          originalPrice: 999,
          price: 699,
          trial: "30 Days Money Back",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 20,
          },
          highlighted: true,
        },
        {
          name: "Agency / Pro",
          originalPrice: 1999,
          price: 1299,
          trial: "30 Days Money Back",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 50,
          },
        },
      ],
    },
    service: {
      monthly: [
        {
          name: "Starter",
          originalPrice: 49,
          price: 29,
          trial: "7 Days Trial",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 2,
          },
        },
        {
          name: "Professional",
          originalPrice: 99,
          price: 79,
          trial: "7 Days Trial",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 8,
          },
          highlighted: true,
        },
        {
          name: "Enterprise",
          originalPrice: 199,
          price: 149,
          trial: "7 Days Trial",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 25,
          },
        },
      ],
      yearly: [
        {
          name: "Starter",
          originalPrice: 490,
          price: 290,
          trial: "14 Days Trial",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 5,
          },
        },
        {
          name: "Professional",
          originalPrice: 990,
          price: 790,
          trial: "14 Days Trial",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 15,
          },
          highlighted: true,
        },
        {
          name: "Enterprise",
          originalPrice: 1990,
          price: 1490,
          trial: "14 Days Trial",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 40,
          },
        },
      ],
      lifetime: [
        {
          name: "Starter",
          originalPrice: 799,
          price: 499,
          trial: "30 Days Money Back",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 10,
          },
        },
        {
          name: "Professional",
          originalPrice: 1499,
          price: 999,
          trial: "30 Days Money Back",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 25,
          },
          highlighted: true,
        },
        {
          name: "Enterprise",
          originalPrice: 2999,
          price: 1999,
          trial: "30 Days Money Back",
          features: {
            watermark: "No",
            searchLibrary: true,
            brandkits: 60,
          },
        },
      ],
    },
  }

  const currentPlans = pricingData[planType][billingType]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <HeroSection
        planType={planType}
        billingType={billingType}
        onPlanTypeChange={setPlanType}
        onBillingTypeChange={setBillingType}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${planType}-${billingType}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <PricingCards plans={currentPlans} />
        </motion.div>
      </AnimatePresence>

      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}
