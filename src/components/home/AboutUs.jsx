import React from 'react'
import AboutUsImg from '../../assets/images/shopping-img.webp'

export default function AboutUs() {
    return (
        <section className="py-16 bg-gray-100 mb-8">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col md:flex-row items-center gap-10">

                    {/* Left Column - Text */}
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Discover Quality Products, Delivered With Care
                        </h2>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                            At <span className="font-semibold text-green-600">EcoFresh</span>, we aim to create a smooth and reliable online shopping experience.
                            From fashion and electronics to everyday essentials, we bring a wide range of quality products together in one convenient place.
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                            Our focus is simple — convenience, trust, and customer satisfaction.
                            We make it easy to browse, shop, and manage your orders with confidence.
                        </p>
                    </div>

                    {/* Right Column - Image */}
                    <div className="md:w-1/2">
                        <img
                            src={AboutUsImg}
                            alt="Online shopping experience"
                            className="w-full h-auto rounded-lg shadow-md border-8 border-amber-50"
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}