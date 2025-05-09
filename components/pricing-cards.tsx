"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

interface PricingCardsProps {
  plans: PricingPlan[]
}

export default function PricingCards({ plans }: PricingCardsProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.1,
      },
    }),
  }

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              className={cn(
                "bg-white rounded-xl overflow-hidden relative group transition-all duration-300",
                plan.highlighted
                  ? "shadow-xl border-purple-200 border-2 md:scale-105 z-10"
                  : "shadow-md border hover:shadow-lg hover:-translate-y-1",
              )}
            >
              {plan.highlighted && (
                <div className="bg-gradient-to-r from-purple-600 to-purple-500 absolute inset-x-0 -top-2 h-2 rounded-t-xl" />
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-1">
                  <span className="text-gray-400 line-through text-lg">${plan.originalPrice}</span>
                  <span className="text-4xl font-bold ml-2">${plan.price}</span>
                  <span className="text-sm text-gray-500 ml-1">USD</span>
                </div>
                <div className="text-sm text-gray-500 mb-6">{plan.trial}</div>
                <Button
                  className={cn(
                    "w-full transition-all duration-300",
                    plan.highlighted
                      ? "bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg"
                      : "bg-gray-800 hover:bg-gray-900",
                  )}
                >
                  Get Started
                </Button>
              </div>

              <div className="border-t">
                <div className="p-4 border-b flex items-center justify-between">
                  <span className="text-sm">QuickAds Watermark on Downloaded Ads</span>
                  <span>{plan.features.watermark}</span>
                </div>

                <div className="p-4 border-b bg-gray-50">
                  <span className="text-sm font-medium">Ads Inspiration</span>
                </div>

                <div className="p-4 border-b flex items-center justify-between">
                  <span className="text-sm">Search 10M+ ads library</span>
                  {plan.features.searchLibrary ? (
                    plan.highlighted ? (
                      <div className="h-5 w-5 bg-purple-600 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <Check className="h-5 w-5 text-purple-600" />
                    )
                  ) : (
                    <span>-</span>
                  )}
                </div>

                <div className="p-4 border-b bg-gray-50">
                  <span className="text-sm font-medium">Design</span>
                </div>

                <div className="p-4 border-b flex items-center justify-between">
                  <span className="text-sm">Saved Brandkits (i.e. Logos)</span>
                  <span>{plan.features.brandkits}</span>
                </div>
              </div>

              {plan.highlighted && (
                <div className="absolute -top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  MOST POPULAR
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
