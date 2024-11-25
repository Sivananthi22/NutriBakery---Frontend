import React from 'react';
import nutribakery from '../Images/NB4.png';

function Footer() {
    return (
        <footer className="footer-section bg-[#915F57] py-8 text-[#F2D3D3]">
            <div className="container mx-auto max-w-8xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Left Section */}
                <div className="footer-left text-center md:text-left">
                    <img src={nutribakery} alt="Nutri Bakery" className="mx-auto md:mx-0 mb-4 w-28" />
                    <h2 className="text-2xl font-semibold text-[#D1D9E7]">Receive Delicious Updates</h2>
                    <p className="mt-2 text-lg">Subscribe for the latest updates on special offers and new products!</p>
                    <div className="mt-4">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="p-3 rounded-md bg-[#F2D3D3] text-[#915F57] w-full mb-3 focus:outline-none focus:ring focus:ring-[#E77E80]"
                        />
                        <button className="bg-[#EEB0B2] text-[#5A3A21] px-6 py-2 rounded-full w-full md:w-auto hover:bg-[#D1D9E7] transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Center Links */}
                <div className="footer-links text-center md:text-left md:pl-48">
                    <h2 className="text-2xl font-semibold text-[#D1D9E7] mb-4">Quick Links</h2>
                    {['Home', 'Menu', 'Event Orders', 'Blog', 'Contact Us', 'Reviews'].map((link, idx) => (
                        <a href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-lg block mb-2 hover:text-[#E77E80]" key={idx}>
                            {link}
                        </a>
                    ))}
                </div>

                {/* Right Social Media */}
                <div className="footer-social text-center md:text-right">
                    <h2 className="text-2xl font-semibold text-[#D1D9E7] mb-4">Connect with Us</h2>
                    <p className="text-lg mb-4">Follow us for the latest updates!</p>
                    <div className="flex justify-center md:justify-end space-x-4">
                        {['facebook', 'instagram', 'linkedin'].map((platform, idx) => (
                            <a href={`https://${platform}.com`} target="_blank" rel="noopener noreferrer" className="hover:text-[#E77E80]" key={idx}>
                                <i className={`bx bxl-${platform} text-3xl`}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="container mx-auto mt-8 text-center border-t border-[#EEB0B2] pt-4 text-sm max-w-7xl">
                &copy; 2024 NutriBakery. All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;
