import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  
  return (
    <section className="bg-white ">
        <div className=" container flex flex-row items-center mx-auto py-12">
          <div>
            <h1 className="text-7xl font-black font-sans">Dynamic Page Designer <br />
              <span className="text-primary">At Your Keypress</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg">
                Enjoy Free Page Designer Draw Your Own Form
            </p>
            <Link href={"/pageDesigner/list"}>
              <Button className="mt-8 text-lg rounded-full py-7  px-6 font-bold">Click to Own it</Button>
            </Link>
          </div>
          <div>
            
          </div>
        </div>
      </section>
  );
}
