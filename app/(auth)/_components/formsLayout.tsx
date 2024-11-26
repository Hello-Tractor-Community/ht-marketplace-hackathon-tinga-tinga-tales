'use client'

import Image from "next/image";
import React from "react";

// type FormsProps = {
//     component: React.ReactNode
// }

export default function FormsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-my_bg_image min-h-screen w-full bg-no-repeat flex justify-center items-center p-4">
            <div className="w-full max-w-4xl md:min-w-[60%] lg:w-[60%] xl:w-[80%] 2xl:w-[80%] h-auto min-h-[60vh] bg-white/80 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">
                <div className="w-full p-6 flex flex-col justify-center items-center space-y-8">
                    <div className="w-full max-w-[250px] h-auto relative aspect-[250/92]">
                        <Image
                            src="/logos/HT_LOGO_RGB_Orange.png"
                            alt="Logo Image"
                            className={"object-contain"}
                            priority
                            width={250}
                            height={250}
                        />
                    </div>
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}