"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
  Bars3Icon,
  GlobeAltIcon, // Added for Language
} from "@heroicons/react/24/outline";

// ==========================================
// 🎨 IMAGE CONFIGURATION
// ==========================================
const SITE_IMAGES = {
  logo: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=orange&shade=600",
  hero_background:
    "https://images.unsplash.com/photo-1721508490084-1b1de5b230d4?q=80&w=3508&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Artisan Hands

  // Trending Product Thumbnails
  product_1_thumb:
    "https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Silk Saree
  product_2_thumb:
    "https://images.unsplash.com/photo-1657395330801-2214c0d02e41?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Blue Pottery
  product_3_thumb:
    "https://images.unsplash.com/photo-1765329104390-959cc478c188?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWluaWF0dXJlJTIwQXJ0fGVufDB8MHwwfHx8MA%3D%3D", // Miniature Art
  product_4_thumb:
    "https://media.istockphoto.com/id/478131300/photo/traditional-rajasthani-footwear.webp?a=1&b=1&s=612x612&w=0&k=20&c=eN6al2U1rmEazbDoawSza-OiAOrU0fI1g2eI06E4YVg=", // Jutti

  // Collection / Category Images
  collection_weavers:
    "https://plus.unsplash.com/premium_photo-1675078975682-11dee6051f69?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHdlYXZlcnN8ZW58MHwwfDB8fHww",
  collection_pottery:
    "https://images.unsplash.com/photo-1675101337462-a19b63af8b1b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90dGVyc3xlbnwwfDB8MHx8fDA%3D",
  collection_odop:
    "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/93456ad5-17c0-5e1b-8fd2-f4e8cf258ced/5949b9bf-4fcd-5321-8acb-1118236b6f52.jpg",

  // Menu Dropdown Placeholders
  menu_placeholder:
    "https://images.unsplash.com/photo-1598556885374-2785566f1994?auto=format&fit=crop&q=80&w=600",

  // Footer
  footer_bg:
    "https://images.unsplash.com/photo-1609881583306-39c8b7eea68b?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

// ==========================================
// 🗣️ LANGUAGE DATA
// ==========================================
const TRANSLATIONS = {
  English: {
    heroTitle: "The Heart of India's Creative Economy",
    heroSubtitle:
      "Connecting urban markets directly to rural artisans. No middlemen. Authentic, sustainable, and handmade.",
    trendingTitle: "Direct from the Artisan",
    shopButton: "Shop Authentic Crafts",
    nav1: "Our Artisans",
    nav2: "ODOP Initiative",
  },
  Hindi: {
    heroTitle: "भारत की रचनात्मक अर्थव्यवस्था का हृदय",
    heroSubtitle:
      "शहरी बाजारों को सीधे ग्रामीण कारीगरों से जोड़ना। कोई बिचौलिया नहीं। प्रामाणिक, टिकाऊ और हस्तनिर्मित।",
    trendingTitle: "सीधे कारीगर से",
    shopButton: "प्रामाणिक शिल्प खरीदें",
    nav1: "हमारे कारीगर",
    nav2: "ओडीओपी पहल",
  },
  Telugu: {
    heroTitle: "భారతదేశ సృజనాత్మక ఆర్థిక వ్యవస్థ యొక్క గుండె",
    heroSubtitle:
      "పట్టణ మార్కెట్లను నేరుగా గ్రామీణ చేతివృత్తుల వారితో అనుసంధానించడం. మధ్యవర్తులు లేరు.",
    trendingTitle: "నేరుగా చేతివృత్తుల వారి నుండి",
    shopButton: "హస్తకళలను షాపింగ్ చేయండి",
    nav1: "మా చేతివృత్తులవారు",
    nav2: "ODOP చొరవ",
  },
};

const navigation = {
  categories: [
    {
      name: "Textiles & Weaving",
      featured: [
        { name: "Bhagalpuri Silk", href: "/product/1" },
        { name: "Banarasi Sarees", href: "/product/1" },
        { name: "Cotton Handloom", href: "/product/1" },
      ],
      collection: [
        { name: "Savita Devi's Collection", href: "/product/1" },
        { name: "New Arrivals", href: "/product/1" },
        { name: "Sustainable Fabrics", href: "/product/1" },
      ],
      categories: [
        { name: "Sarees", href: "/product/1" },
        { name: "Dupattas", href: "/product/1" },
        { name: "Fabrics", href: "/product/1" },
      ],
    },
    {
      name: "Pottery & Decor",
      featured: [
        { name: "Jaipur Blue Pottery", href: "/product/2" },
        { name: "Terracotta", href: "/product/2" },
        { name: "Miniature Art", href: "/product/3" },
      ],
      collection: [
        { name: "Ramesh Lal's Workshop", href: "/product/2" },
        { name: "Rani Singh Miniatures", href: "/product/3" },
        { name: "Home Decor", href: "/product/2" },
      ],
      categories: [
        { name: "Vases", href: "/product/2" },
        { name: "Wall Plates", href: "/product/2" },
        { name: "Tableware", href: "/product/2" },
      ],
    },
  ],
  pages: [
    { name: "Our Artisans", href: "#" },
    { name: "ODOP Initiative", href: "#" },
  ],
};

const trendingProducts = [
  {
    id: 1,
    name: "Bhagalpuri Tussar Silk Saree",
    artisan: "Savita Devi",
    color: "Crimson Red",
    price: "₹4,500",
    href: "/product/1",
    imageSrc: SITE_IMAGES.product_1_thumb,
    imageAlt: "Authentic Bhagalpuri Tussar silk saree with golden sheen.",
  },
  {
    id: 2,
    name: "Jaipur Blue Pottery Vase",
    artisan: "Ramesh Lal",
    color: "Cobalt Blue",
    price: "₹1,200",
    href: "/product/2",
    imageSrc: SITE_IMAGES.product_2_thumb,
    imageAlt: "Traditional Blue Pottery vase with floral motifs.",
  },
  {
    id: 3,
    name: "Mewar Miniature Art",
    artisan: "Rani Singh",
    color: "Natural Colors",
    price: "₹8,500",
    href: "/product/3",
    imageSrc: SITE_IMAGES.product_3_thumb,
    imageAlt: "Intricate miniature painting.",
  },
  {
    id: 4,
    name: "Handcrafted Mojari (Jutti)",
    artisan: "Raju",
    color: "Tan Leather",
    price: "₹950",
    href: "/product/4",
    imageSrc: SITE_IMAGES.product_4_thumb,
    imageAlt: "Traditional handcrafted leather juttis.",
  },
];

const collections = [
  {
    name: "Meet the Weavers",
    description: "Direct from Bhagalpur | Zero Middlemen",
    imageSrc: SITE_IMAGES.collection_weavers,
    imageAlt: "Artisan working on a handloom.",
    href: "/product/1",
  },
  {
    name: "The Art of Clay",
    description: "Supporting Jaipur's Blue Pottery Legacy",
    imageSrc: SITE_IMAGES.collection_pottery,
    imageAlt: "Detailed shot of pottery textures.",
    href: "/product/2",
  },
  {
    name: "One District One Product",
    description: "Official partners of the ODOP Initiative",
    imageSrc: SITE_IMAGES.collection_odop,
    imageAlt: "Collection of colorful Indian handicrafts.",
    href: "/product/4",
  },
];

const testimonials = [
  {
    id: 1,
    quote:
      "I always wanted to support rural artisans, but verifying authenticity was hard. This platform connects me directly to the makers like Savita Devi!",
    attribution: "Aditi Menon, Bangalore (Software Engineer)",
  },
  {
    id: 2,
    quote:
      "The transparency in pricing is refreshing. Knowing that the money goes to the artisan and not a middleman makes me feel good about my purchase.",
    attribution: "Rohan Gupta, Delhi",
  },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English"); // State for Language

  const t = TRANSLATIONS[currentLang]; // Get current translations

  return (
    <div className="bg-stone-50 font-sans">
      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-stone-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <TabGroup className="mt-2">
              <div className="border-b border-stone-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-stone-900 data-selected:border-orange-600 data-selected:text-orange-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pt-10 pb-8"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="aspect-square overflow-hidden rounded-lg bg-stone-100 group-hover:opacity-75">
                            <img
                              src={SITE_IMAGES.menu_placeholder}
                              alt={item.name}
                              className="object-cover object-center w-full h-full"
                            />
                          </div>
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-stone-900"
                          >
                            <span
                              className="absolute inset-0 z-10"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            {/* Mobile Language Switcher */}
            <div className="px-4 py-6 border-t border-stone-200">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Select Language
              </label>
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="block w-full rounded-md border-stone-300 py-2 pl-3 pr-10 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Telugu">Telugu (తెలుగు)</option>
              </select>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative z-10">
        <nav aria-label="Top">
          {/* Top navigation - Earthen Theme */}
          <div className="bg-orange-900 text-white">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <p className="flex-1 text-center text-sm font-medium lg:flex-none">
                Supporting the "Make in India" Initiative | ODOP Partner
              </p>
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a
                  href="#"
                  className="text-sm font-medium hover:text-orange-100"
                >
                  Create account
                </a>
                <span aria-hidden="true" className="h-6 w-px bg-orange-700" />
                <a
                  href="#"
                  className="text-sm font-medium hover:text-orange-100"
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white border-b border-stone-200 shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="hidden lg:flex lg:items-center">
                  <Link href="/">
                    <span className="text-2xl font-bold text-orange-800 tracking-wider">
                      KALAKAR
                    </span>
                  </Link>
                </div>

                <div className="hidden h-full lg:flex">
                  <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                    <div className="flex h-full space-x-8">
                      {navigation.categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          <div className="relative flex">
                            <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-stone-700 transition-colors duration-200 ease-out hover:text-orange-700 data-open:border-orange-600 data-open:text-orange-600">
                              {category.name}
                            </PopoverButton>
                          </div>
                          <PopoverPanel
                            transition
                            className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-stone-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in shadow-lg ring-1 ring-black/5"
                          >
                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured.map((item) => (
                                      <div
                                        key={item.name}
                                        className="group relative text-base sm:text-sm"
                                      >
                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-stone-100 group-hover:opacity-75">
                                          <img
                                            src={SITE_IMAGES.menu_placeholder}
                                            alt={item.name}
                                            className="object-cover object-center"
                                          />
                                        </div>
                                        <a
                                          href={item.href}
                                          className="mt-6 block font-medium text-stone-900"
                                        >
                                          <span
                                            className="absolute inset-0 z-10"
                                            aria-hidden="true"
                                          />
                                          {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
                                          Shop now
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                    {category.collection.map((item) => (
                                      <div key={item.name}>
                                        <p className="font-medium text-stone-900">
                                          {item.name}
                                        </p>
                                      </div>
                                    ))}
                                    {category.categories.map((item) => (
                                      <div key={item.name}>
                                        <a
                                          href={item.href}
                                          className="hover:text-orange-600"
                                        >
                                          {item.name}
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </Popover>
                      ))}

                      {/* Dynamic Nav Links */}
                      <a
                        href="#"
                        className="flex items-center text-sm font-medium text-stone-700 hover:text-orange-700"
                      >
                        {t.nav1}
                      </a>
                      <a
                        href="#"
                        className="flex items-center text-sm font-medium text-stone-700 hover:text-orange-700"
                      >
                        {t.nav2}
                      </a>
                    </div>
                  </PopoverGroup>
                </div>

                <div className="flex flex-1 items-center justify-end">
                  {/* Mobile Menu Trigger */}
                  <div className="flex lg:hidden">
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(true)}
                      className="-ml-2 rounded-md bg-white p-2 text-stone-400"
                    >
                      <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                  </div>

                  <div className="flex items-center lg:ml-8">
                    {/* LANGUAGE SWITCHER (Desktop) */}
                    <div className="hidden lg:flex items-center mr-4">
                      <GlobeAltIcon className="h-5 w-5 text-stone-400 mr-1" />
                      <select
                        value={currentLang}
                        onChange={(e) => setCurrentLang(e.target.value)}
                        className="bg-transparent text-sm text-stone-700 font-medium focus:outline-none cursor-pointer hover:text-orange-700"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Telugu">Telugu</option>
                      </select>
                    </div>

                    <a
                      href="#"
                      className="p-2 text-stone-400 hover:text-stone-500"
                    >
                      <MagnifyingGlassIcon className="size-6" />
                    </a>
                    <a
                      href="#"
                      className="p-2 text-stone-400 hover:text-stone-500 lg:ml-4"
                    >
                      <UserIcon className="size-6" />
                    </a>
                    <a
                      href="#"
                      className="group -m-2 flex items-center p-2 lg:ml-4"
                    >
                      <ShoppingBagIcon className="size-6 shrink-0 text-stone-400 group-hover:text-stone-500" />
                      <span className="ml-2 text-sm font-medium text-stone-700 group-hover:text-stone-800">
                        0
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative bg-stone-900">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <img
              src={SITE_IMAGES.hero_background}
              alt="Hands of an indian artisan working on pottery"
              className="size-full object-cover object-center opacity-60"
            />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 py-32 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="mt-4 text-xl text-stone-300">{t.heroSubtitle}</p>
            <div className="mt-8">
              <a
                href="#trending"
                className="inline-block rounded-md border border-transparent bg-orange-600 px-8 py-3 font-medium text-white hover:bg-orange-700"
              >
                {t.shopButton}
              </a>
            </div>
          </div>
        </div>

        {/* Trending Products */}
        <section
          id="trending"
          aria-labelledby="trending-heading"
          className="bg-white"
        >
          <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
              <h2
                id="trending-heading"
                className="text-2xl font-bold tracking-tight text-stone-900"
              >
                {t.trendingTitle}
              </h2>
              <a
                href="#"
                className="hidden text-sm font-semibold text-orange-600 hover:text-orange-500 sm:block"
              >
                See everything &rarr;
              </a>
            </div>

            <div className="relative mt-8">
              <div className="relative w-full overflow-x-auto">
                <ul
                  role="list"
                  className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
                >
                  {trendingProducts.map((product) => (
                    <li
                      key={product.id}
                      className="inline-flex w-64 flex-col text-center lg:w-auto"
                    >
                      <div className="group relative">
                        <div className="aspect-square w-full overflow-hidden rounded-md bg-stone-200">
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                          />
                        </div>
                        <div className="mt-6">
                          <p className="text-sm text-stone-500">
                            {product.artisan}
                          </p>
                          <h3 className="mt-1 font-semibold text-stone-900">
                            <Link href={product.href}>
                              <span className="absolute inset-0" />
                              {product.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-stone-900">{product.price}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Collections */}
        <section aria-labelledby="collections-heading" className="bg-stone-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
              <h2
                id="collections-heading"
                className="text-2xl font-bold text-stone-900"
              >
                Explore Heritage
              </h2>

              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">
                {collections.map((collection) => (
                  <div key={collection.name} className="group relative">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                      <img
                        src={collection.imageSrc}
                        alt={collection.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-6 text-sm text-stone-500">
                      <a href={collection.href}>
                        <span className="absolute inset-0" />
                        {collection.name}
                      </a>
                    </h3>
                    <p className="text-base font-semibold text-stone-900">
                      {collection.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-orange-50 relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-7xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-orange-900 sm:text-4xl">
              What Conscious Buyers Say
            </h2>
            <div className="mt-16 space-y-16 lg:grid lg:grid-cols-2 lg:space-y-0 lg:gap-x-8">
              {testimonials.map((testimonial) => (
                <blockquote
                  key={testimonial.id}
                  className="bg-white p-8 rounded-xl shadow-sm border border-orange-100"
                >
                  <p className="text-lg text-stone-600 italic">
                    "{testimonial.quote}"
                  </p>
                  <footer className="mt-6">
                    <p className="text-base font-semibold text-orange-800">
                      {testimonial.attribution}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-stone-900 text-stone-300">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold">KALAKAR</h3>
              <p className="mt-4 text-sm">
                Bridging the gap between India's rural artisans and the world.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold">Initiatives</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>One District One Product (ODOP)</li>
                <li>Make in India</li>
                <li>Artisan Welfare</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold">Contact</h3>
              <p className="mt-4 text-sm">Group 4 - Design Thinking Project</p>
              <p className="text-sm">Jaipur Institute of Management</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
