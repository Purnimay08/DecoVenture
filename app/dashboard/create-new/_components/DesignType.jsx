import Image from 'next/image'
import React, { useState } from 'react'

function DesignType({selectedDesignTye}) {
    const Designs = [  // ✅ Corrected variable name
        { name: 'Modern', image: '/modern.png' },      // ✅ Fixed image paths
        { name: 'Industrial', image: '/Industrial.png' },
        { name: 'Bohemian', image: '/Bohemian.png' },
        { name: 'Traditional', image: '/Traditional.png' },
        { name: 'Rustic', image: '/Rustic.png' },
        { name: 'Minimalist', image: '/Minimalist.png' },
    ]
    const [selectedOption,setSelectedOption]=useState();

    return (
        <div className="mt-5">
            <label className="text-gray-500">Interior Design Type</label>
            <div className="grid grid-cols-2 mt-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {Designs.map((design, index) => (  // ✅ Used correct variable name
                    <div key={index} onClick={()=>{setSelectedOption(design.name);selectedDesignTye(design.name)}}>
                        <Image 
                            src={design.image} 
                            width={100} 
                            height={100}  // ✅ Explicit height to prevent Next.js errors
                            alt={design.name}
                            className={`h-[70px] rounded-md 
                            hover:scale-105 transition-all 
                            cursor-pointer ${design.name==selectedOption&&'border-2 border-primary rounded-md'}`}
                        />
                        <h2>{design.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DesignType;
