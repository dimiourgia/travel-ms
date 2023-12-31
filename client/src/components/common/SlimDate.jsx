import { useState, useRef, useEffect } from "react";
import { titleCase, formatDate } from "../../utils/handyFunctions";
import chevron_down from "../../assets/chevron-down.svg";
import { formatDate2 } from "../../utils/handyFunctions";



export default function SlimDate(props){
    const title = props.title || "Title";
    const date = props.date 
    const onChange = props.onChange
    const [value, setValue] = useState(date || Date.now());

    const handleChange= (e)=>{
       setValue(e.target.value)
       console.log(e.target.value)
       onChange(e)
    }


    return(<>
        <div className="min-w-[200px] w-full md:w-fit max-w-[403px] h-[73px] flex-col justify-start items-start gap-2 inline-flex">
            {/* title */}
            <div className="text-zinc-600 text-sm font-cabin">{title}</div>

            {/* input */}
            <div className="w-full h-full bg-white items-center flex">
                <div className="text-neutral-700 w-full  h-full text-sm font-normal font-cabin">
                    <div className=" w-full z-100 relative h-full decoration:none px-6 py-2 border rounded-md border border-neutral-300 inline-flex justify-center items-center cursor-pointer">
                        <div className="flex relative w-full gap-4 justify-center items-center" >
                            <input className='slim absolute w-full h-full opacity-0 focus-visible:outline-0 cursor-hover' onChange={handleChange} type='date'/>
                            <div className="text-gray-600 bg-white whitespace-nowrap text-base font-medium font-cabin">{formatDate(value)}</div>
                            <div className="h-6 w-6">
                                <img src={chevron_down} alt="open" />
                            </div>
                        </div>        
                    </div>
                </div>
            </div>
      </div>

    </>)
}
