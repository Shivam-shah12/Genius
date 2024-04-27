import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LandingNavbar } from "@/components/mycompo/landing-navbar";
// import  {LandingHero} from '@/components/mycompo/landingHero';
import LandingHero from "@/components/mycompo/LandingHero";
import LandingContent from "@/components/mycompo/LandingContent"
// const font=new Montserrat({
//   weight:600,
// })
export default function page() {
  return (
    <div className="h-full">
      <LandingNavbar/>
      <LandingHero/>
      <LandingContent/>
    </div>
  );
}
