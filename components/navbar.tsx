"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DropdownItem {
  icon: React.ReactNode
  title: string
  description?: string
}

interface FeatureItem extends DropdownItem {}

interface UseCaseItem extends DropdownItem {}

const featureItems: FeatureItem[] = [
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    ),
    title: "Discover Ads",
    description: "Check our huge Research Library with over million ads from tiktok,meta,etc.",
  },
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M12 8L16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    title: "Image Ads",
    description: "Simple Prompt to Video ads and Static image ads.",
  },
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
        </svg>
      </div>
    ),
    title: "Video Ads",
    description: "AI Video Editor for High-Impact Social Ads for Low Attention Spans",
  },
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    title: "Optimize & Publish",
    description: "Manage, schedule Campaigns, Ad and Social Media Posts.",
  },
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M2.90625 20.2491C3.82834 18.6531 5.1542 17.3278 6.75064 16.4064C8.34708 15.485 10.1579 15 12.0002 15C13.8424 15 15.6532 15.4851 17.2497 16.4065C18.8461 17.3279 20.1719 18.6533 21.094 20.2493"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    title: "For Virtual Fashion Photoshoots",
    description: "Upload Your Apparel Photo & Describe Any Model To Get Stunning Outputs.",
  },
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    title: "AI Photoshoots",
    description:
      "Bring your product life with our fast, flexible and fine tuned AI product photo generator & AI image generator",
  },
]

const useCaseItems: UseCaseItem[] = [
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    ),
    title: "For HR",
  },
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    ),
    title: "For Instagram",
  },
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    ),
    title: "For Ecommerce",
  },
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    ),
    title: "For Instagram Story",
  },
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    ),
    title: "For Festive Post",
  },
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    ),
    title: "For Tik Tok Videos",
  },
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    ),
    title: "For Tik Tok Raw Agency",
  },
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    ),
    title: "For International Business",
  },
  {
    icon: (
      <div className="w-6 h-6 text-purple-600">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    ),
    title: "For Social Media Scheduling",
  },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const featuresRef = useRef<HTMLDivElement>(null)
  const useCasesRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        featuresRef.current &&
        !featuresRef.current.contains(event.target as Node) &&
        useCasesRef.current &&
        !useCasesRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 5L21 12L13 19V5Z" fill="white" />
                <path d="M3 5L11 12L3 19V5Z" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-bold">Quickads</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Features Dropdown */}
            <div ref={featuresRef} className="relative">
              <button
                onClick={() => toggleDropdown("features")}
                className={cn(
                  "flex items-center gap-1 py-2 transition-colors",
                  activeDropdown === "features" ? "text-purple-600" : "hover:text-purple-600",
                )}
              >
                <span>Features</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    activeDropdown === "features" ? "rotate-180" : "",
                  )}
                />
              </button>

              {/* Features Dropdown Menu */}
              <div
                className={cn(
                  "absolute top-full left-0 mt-1 w-[800px] bg-white rounded-xl shadow-lg border overflow-hidden transition-all duration-300 ease-in-out origin-top",
                  activeDropdown === "features"
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
                )}
              >
                <div className="grid grid-cols-3 gap-4 p-6">
                  {featureItems.map((item, index) => (
                    <div key={index} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      {item.icon}
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Use Cases Dropdown */}
            <div ref={useCasesRef} className="relative">
              <button
                onClick={() => toggleDropdown("useCases")}
                className={cn(
                  "flex items-center gap-1 py-2 transition-colors",
                  activeDropdown === "useCases" ? "text-purple-600" : "hover:text-purple-600",
                )}
              >
                <span>Use Cases</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    activeDropdown === "useCases" ? "rotate-180" : "",
                  )}
                />
              </button>

              {/* Use Cases Dropdown Menu */}
              <div
                className={cn(
                  "absolute top-full left-0 mt-1 w-[800px] bg-white rounded-xl shadow-lg border overflow-hidden transition-all duration-300 ease-in-out origin-top",
                  activeDropdown === "useCases"
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
                )}
              >
                <div className="grid grid-cols-3 gap-4 p-6">
                  {useCaseItems.map((item, index) => (
                    <div key={index} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      {item.icon}
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link href="#" className="py-2 transition-colors hover:text-purple-600">
              Partner Program
            </Link>

            <Link href="#" className="py-2 font-medium transition-colors hover:text-purple-600">
              Pricing
            </Link>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("language")}
                className="flex items-center gap-1 py-2 transition-colors hover:text-purple-600"
              >
                <span>En</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    activeDropdown === "language" ? "rotate-180" : "",
                  )}
                />
              </button>
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a  className="text-sm font-medium  shadow-md bg-white text-black py-3 px-6 rounded-md">
              Login
            </a>
            <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-200">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 lg:hidden transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{ top: "64px" }}
      >
        <nav className="h-full overflow-y-auto py-6 px-4 flex flex-col">
          <div className="space-y-2">
            <div className="border-b pb-2">
              <button
                className="flex items-center justify-between w-full py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => toggleDropdown("mobileFeatures")}
              >
                <span className="font-medium">Features</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    activeDropdown === "mobileFeatures" ? "rotate-180" : "",
                  )}
                />
              </button>

              {activeDropdown === "mobileFeatures" && (
                <div className="pl-4 py-2 space-y-3 animate-in slide-in-from-top duration-200">
                  {featureItems.slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b pb-2">
              <button
                className="flex items-center justify-between w-full py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => toggleDropdown("mobileUseCases")}
              >
                <span className="font-medium">Use Cases</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    activeDropdown === "mobileUseCases" ? "rotate-180" : "",
                  )}
                />
              </button>

              {activeDropdown === "mobileUseCases" && (
                <div className="pl-4 py-2 space-y-3 animate-in slide-in-from-top duration-200">
                  {useCaseItems.slice(0, 6).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="#" className="block py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors border-b pb-4">
              Partner Program
            </Link>

            <Link
              href="#"
              className="block py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors border-b pb-4 font-medium"
            >
              Pricing
            </Link>

            <Link href="#" className="block py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors border-b pb-4">
              Login
            </Link>

            <div className="pt-2">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-200">
                Get Started
              </Button>
            </div>

            <div className="border-t pt-4 mt-4">
              <button
                className="flex items-center justify-between w-full py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => toggleDropdown("mobileLanguage")}
              >
                <span>Language: English</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    activeDropdown === "mobileLanguage" ? "rotate-180" : "",
                  )}
                />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
