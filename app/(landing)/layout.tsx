"use client"


const LandingLayout=({children}:{
    children:React.ReactNode
})=>{
    return (
        <main className="
         h-full overflow-auto mx-auto  bg-[#111827] ">
            <div className="max-w-screen-xl  mx-auto h-full w-full">
            {children}
            </div>
        </main>
    )
}

export default LandingLayout;



