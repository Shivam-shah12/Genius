import Image from "next/image";

interface EmptyProps{
  label:string
}

export const Empty=({label}:EmptyProps)=>{
    return (
        <div className="h-full w-full flex flex-col p-4">
           <div className="relative w-72 h-72 mx-auto my-4">
              <Image alt="empty" src="/empty.jpg" fill/>
           </div>
           <div>
             <p className="text-sm text-muted-foreground text-center">{label}</p>
           </div>
        </div>
    )

}