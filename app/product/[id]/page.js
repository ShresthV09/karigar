"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

// ==========================================
// 🎨 PRODUCT IMAGE CONFIGURATION - UPDATE LINKS HERE
// ==========================================
const PRODUCT_IMAGES = {
  // Product 1: Silk Saree
  p1_main:
    "https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  p1_detail:
    "https://images.unsplash.com/photo-1610189012906-4c0aa9b9781e?q=80&w=2348&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  // Product 2: Blue Pottery
  p2_main:
    "https://images.unsplash.com/photo-1657395330801-2214c0d02e41?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  p2_detail:
    "https://plus.unsplash.com/premium_photo-1679809444327-c5818f22ac21?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  // Product 3: Miniature Art
  p3_main:
    "https://images.unsplash.com/photo-1765329104390-959cc478c188?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWluaWF0dXJlJTIwQXJ0fGVufDB8MHwwfHx8MA%3D%3D0",

  // Product 4: Jutti (Footwear)
  p4_main:
    "https://media.istockphoto.com/id/478131300/photo/traditional-rajasthani-footwear.webp?a=1&b=1&s=612x612&w=0&k=20&c=eN6al2U1rmEazbDoawSza-OiAOrU0fI1g2eI06E4YVg=",
};

// DATABASE
const productDatabase = {
  1: {
    name: "Bhagalpuri Tussar Silk Saree",
    price: "₹4,500",
    rating: 5,
    artisan: "Savita Devi",
    location: "Bhagalpur, Bihar (The Silk City)",
    story:
      "I weave Bhagalpuri silk sarees, just like my mother did. It takes me and my daughter almost 10 days to weave one saree. By buying here, you save me from selling to the local middleman for just ₹1,500.",
    description:
      '<p>Authentic Bhagalpuri silk, known as the "Queen of all silks." Handwoven with pure tussar silk threads, featuring traditional geometric motifs. This product carries the Silk Mark authentication.</p>',
    images: [
      { id: 1, src: PRODUCT_IMAGES.p1_main, alt: "Silk Saree Full View" },
      { id: 2, src: PRODUCT_IMAGES.p1_detail, alt: "Silk Texture" },
    ],
    details: [
      { name: "Material", items: ["Pure Tussar Silk", "Natural Dyes"] },
      { name: "Artisan Experience", items: ["Savita Devi: 25+ Years"] },
      {
        name: "Impact",
        items: ["100% Direct to Artisan", "Supports Girl Child Education"],
      },
    ],
  },
  2: {
    name: "Jaipur Blue Pottery Vase",
    price: "₹1,200",
    rating: 4,
    artisan: "Ramesh Lal",
    location: "Jaipur, Rajasthan",
    story:
      "Blue pottery is unique—we don't use clay. We use quartz stone powder. It is fragile, like glass. I used to fear shipping it, but this platform helps me pack it safely for you.",
    description:
      "<p>Traditional Blue Pottery from Jaipur, made using quartz stone powder, powdered glass, Multani Mitti (Fuller's Earth), borax, gum and water. Recognized by its distinctive Persian blue dye.</p>",
    images: [
      { id: 1, src: PRODUCT_IMAGES.p2_main, alt: "Blue Pottery Vase" },
      { id: 2, src: PRODUCT_IMAGES.p2_detail, alt: "Pottery Close up" },
    ],
    details: [
      { name: "Material", items: ["Quartz Powder", "Glass", "Natural Glaze"] },
      { name: "Care", items: ["Handle with care", "Wash gently"] },
      { name: "Origin", items: ["GI Tagged: Jaipur Blue Pottery"] },
    ],
  },
  3: {
    name: "Mewar Miniature Painting",
    price: "₹8,500",
    rating: 5,
    artisan: "Rani Singh",
    location: "Udaipur, Rajasthan",
    story:
      "This art requires patience. I use a single-hair brush made from squirrels to paint the fine details of the jewelry. The colors come from grinding stones like Lapis Lazuli.",
    description:
      "<p>Exquisite miniature painting done on silk cloth using a single-hair brush. The colors are derived from natural stones and minerals.</p>",
    images: [{ id: 1, src: PRODUCT_IMAGES.p3_main, alt: "Miniature Painting" }],
    details: [
      { name: "Dimensions", items: ["12x18 inches"] },
      { name: "Technique", items: ["Mewar Style", "Natural Stone Colors"] },
    ],
  },
  4: {
    name: "Handcrafted Mojari (Jutti)",
    price: "₹950",
    rating: 5,
    artisan: "Raju",
    location: "Patiala, Punjab",
    story:
      "These shoes breathe. The leather is cured naturally. The embroidery is done by the women in our village while we shape the leather.",
    description:
      "<p>Traditional leather Mojaris (Juttis) handcrafted with intricate embroidery. Perfect for festive occasions and comfortable for daily wear.</p>",
    images: [{ id: 1, src: PRODUCT_IMAGES.p4_main, alt: "Punjabi Jutti" }],
    details: [
      { name: "Material", items: ["Genuine Leather", "Silk Thread"] },
      { name: "Type", items: ["Unisex Design"] },
    ],
  },
};

export default function ProductPage() {
  const params = useParams();
  const id = params.id;

  // Fallback to ID 1 if page is visited directly without ID or invalid ID
  const product = productDatabase[id] || productDatabase["1"];

  return (
    <div className="bg-stone-50 min-h-screen font-sans">
      {/* HEADER (Minimal version for Product Page) */}
      <header className="bg-white border-b border-stone-200 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-orange-800 font-bold text-xl tracking-wider"
          >
            Karigar
          </Link>
          <Link
            href="/"
            className="text-sm text-stone-500 hover:text-orange-600"
          >
            Back to Store
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 py-10">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image Gallery */}
            <TabGroup className="flex flex-col-reverse">
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-6">
                  {product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-stone-900 uppercase hover:bg-stone-50 focus:outline-none focus:ring focus:ring-orange-500/50"
                    >
                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <img
                          alt={image.alt}
                          src={image.src}
                          className="size-full object-cover"
                        />
                      </span>
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanels>
                {product.images.map((image) => (
                  <TabPanel key={image.id}>
                    <img
                      alt={image.alt}
                      src={image.src}
                      className="aspect-square w-full object-cover sm:rounded-lg shadow-md border border-stone-200"
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            {/* Product Info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* AUTHENTICITY BADGES */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800 border border-orange-200">
                  Direct from Artisan
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 border border-blue-200">
                  ODOP Certified
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-stone-900">
                {product.name}
              </h1>
              <div className="mt-3 flex justify-between items-end border-b border-stone-200 pb-4">
                <p className="text-3xl tracking-tight text-orange-800 font-semibold">
                  {product.price}
                </p>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`size-5 shrink-0 ${
                        product.rating > rating
                          ? "text-orange-500"
                          : "text-stone-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-stone-500">
                    ({product.rating} stars)
                  </span>
                </div>
              </div>

              {/* ARTISAN STORY CARD */}
              <div className="mt-6 bg-orange-50 rounded-xl p-6 border border-orange-100">
                <h3 className="text-lg font-bold text-stone-900 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-orange-600" />
                  Meet {product.artisan}
                </h3>
                <p className="mt-1 text-sm text-stone-500 uppercase tracking-wide font-semibold">
                  {product.location}
                </p>
                <blockquote className="mt-4 border-l-4 border-orange-500 pl-4 italic text-stone-700">
                  "{product.story}"
                </blockquote>
              </div>

              <div className="mt-6">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className="space-y-6 text-base text-stone-700 leading-relaxed"
                />
              </div>

              <form className="mt-6">
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center rounded-md border border-transparent bg-orange-700 px-8 py-3 text-base font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-sm"
                  >
                    Support {product.artisan} (Buy Now)
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center rounded-md px-6 py-3 text-stone-500 bg-white border border-stone-300 hover:bg-stone-50"
                  >
                    <HeartIcon className="size-6 shrink-0" />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
                <p className="mt-4 text-center text-xs text-stone-500">
                  100% of proceeds go directly to the artisan's verified bank
                  account.
                </p>
              </form>

              {/* Details Accordion */}
              <section aria-labelledby="details-heading" className="mt-12">
                <div className="divide-y divide-stone-200 border-t border-stone-200">
                  {product.details.map((detail) => (
                    <Disclosure key={detail.name} as="div">
                      {({ open }) => (
                        <>
                          <h3>
                            <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left hover:bg-stone-50 px-2 -mx-2 rounded-md transition-colors">
                              <span
                                className={`text-sm font-medium ${
                                  open ? "text-orange-700" : "text-stone-900"
                                }`}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="block size-6 text-orange-400" />
                                ) : (
                                  <PlusIcon className="block size-6 text-stone-400" />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel className="pb-6 px-2">
                            <ul className="list-disc space-y-1 pl-5 text-sm text-stone-700">
                              {detail.items.map((item) => (
                                <li key={item} className="pl-2">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
