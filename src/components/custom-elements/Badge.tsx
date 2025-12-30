import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

function BadgeContainer({
    badgeStatus,
    badgeName,
    badgeImageUrl,
    className,
}: {
    badgeStatus?: 'active' | 'inactive';
    badgeName: string;
    badgeImageUrl: string;
    className?: string;
}) {
    return (
        <div className={cn("flex justify-center mb-6", className)}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg relative
${badgeStatus === 'active'
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                    : 'bg-gray-300'
                }`}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <Image
                        src={badgeImageUrl}
                        alt={badgeName || "Badge"}
                        width={50}
                        height={50}
                        className="object-cover w-full h-full overflow-hidden rounded-full"
                        loading='lazy'
                    />
                </div>
            </div>
        </div>
    )
}

export default BadgeContainer;