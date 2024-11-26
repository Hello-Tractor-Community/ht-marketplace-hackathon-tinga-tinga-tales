import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-background text-black">
            <div className="container px-4 py-8 sm:py-12 mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center lg:justify-items-start">
                    {/* Branding Section */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">Hello Tractor</h2>
                        <p className="text-sm text-gray-400 max-w-xs mx-auto sm:mx-0">
                            Your trusted partner in agricultural machinery. Quality tractors and equipment for modern
                            farming needs.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h3 className="text-lg font-semibold text-black">Contact Us</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm justify-center sm:justify-start">
                                <Phone className="h-5 w-5 text-primary"/>
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm justify-center sm:justify-start">
                                <Mail className="h-5 w-5 text-primary"/>
                                <span>contact@hellotractor.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm justify-center sm:justify-start">
                                <MapPin className="h-5 w-5 text-primary"/>
                                <span className="max-w-[200px]">123 Farming Avenue, Agricultural District</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h3 className="text-lg font-semibold text-black">Follow Us</h3>
                        <div className="flex space-x-4 justify-center sm:justify-start">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-primary transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-6 w-6"/>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-primary transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-6 w-6"/>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-primary transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-6 w-6"/>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 sm:mt-12 border-t border-gray-700 pt-6 text-center">
                    <p className="text-center text-xs sm:text-sm text-gray-400">
                        © 2024 Hello Tractor. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

