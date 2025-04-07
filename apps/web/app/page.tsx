
"use client"

import {Button} from "@repo/ui/button"
import { useRouter } from "next/navigation";



export default function Page() {

  const router = useRouter();

  return (
  
    <main className="flex flex-col items-center justify-center min-h-screen p-24 ">

      <Button 
      variant="primary" 
      size="lg" 
      className="p-2"
      onClick={() => {
        router.push("/draw");
      }}
      
      >
        Start Drawing
      </Button>
          
    </main>
  );
}
