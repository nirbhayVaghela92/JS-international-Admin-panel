import logo from "@/assets/logos/logo.png";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({className}:{className?:string}) {
  return (
    <div className={cn("relative h-18", className)}>
      <Image
        src={logo}
        fill
        className="object-contain"
        alt="logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
