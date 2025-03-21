import { useState } from "react";
import { Film,RotateCcw,Send,CircleCheckBig    } from 'lucide-react';
import { movies } from "../Data/movise";
  
function FormMovie () {
    const [selectedOption, setSelectedOption] = useState("");
    const [textInput, setTextInput] = useState({});
    const [dataError,setDataError] = useState({});
    const [formSucceed,setFormSucceed] = useState(false)

    const BackToForm=()=>{
        resetValue();
        setFormSucceed(false);
    }
    const ThenSubmit = (event) => {
        event.preventDefault();
        setDataError({})
        CheckCorrectValue()?setFormSucceed(true):console.log("❌ => ", dataError)
    };
    const CheckCorrectValue = () =>{
        let tempError={}
        if(!("name" in textInput) ||textInput.name === ""){tempError.name = "โปรดใส่ชื่อของคุณ"}
        if(!("email" in textInput) ||textInput.email === ""){tempError.email="โปรดใส่อีเมลของคุณ"}
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(textInput.email)){tempError.email="รูปแบบอีเมลไม่ถูกต้อง"}
        if(!selectedOption){tempError.selectedOption="กรุณาเลือกหนังที่คุณชอบ"}
        setDataError(tempError)
        return Object.keys(tempError).length === 0;
    }
    const resetValue = () =>{
        setSelectedOption("")
        setTextInput({})
        setDataError({})
    }
    //render
    function RenderAsteriskRed() {
    return <span className="text-red-500"> *</span>;
    }
    function RenderLableAndInput (nameInput,typeInput,text,placeHolder){
    return(
        <>
        <label className="mt-4" htmlFor={nameInput}>{text}<RenderAsteriskRed/></label>
                <input className={`border rounded-md p-2 my-2 w-full ${
                                    nameInput in dataError ? "border-red-500" : "border-gray-400"
                                }`} 
                     id={nameInput} type={typeInput} name={nameInput} placeholder={placeHolder}
                     value={textInput[nameInput] || ""}
                     onChange={(event)=>setTextInput({ ...textInput, [nameInput]: event.target.value })}
                    ></input>
                    {nameInput in dataError ?<span className="text-sm text-red-500">{dataError[nameInput]}</span>:null}
        </>
)       
    }
    function RenderShowDataInput(topicName,detaInTopic,className){
        return(
            <div className="grid grid-cols-3 gap-1">
                        <p className="text-sm font-medium text-gray-500">{topicName}</p>
                        <p className={`${className}`}>{detaInTopic}</p>
            </div>
        )
    }
    return(
        <>
        <section className="w-full max-w-md shadow- mx-2">
            <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-purple-700 to-indigo-600 text-white" >
                <h1 className="font-semibold tracking-tight flex items-center gap-2 text-2xl"> <Film/>Movie Survey</h1>
            </div>
{formSucceed?
        <section className="bg-white p-6">
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                <h2 className="text-xl text-green-800 flex items-center gap-2 mb-4"><CircleCheckBig/>ส่งแบบสำรวจสำเร็จ!</h2>
                <div className="space-y-3">

                    {RenderShowDataInput("ชื่อ:",textInput.name,"text-sm")}
                    {RenderShowDataInput("อีเมล:",textInput.email,"text-sm")}
                    {RenderShowDataInput("หนังที่เลือก:",selectedOption,"text-sm font-medium text-purple-700 ")}
                    <div className="mt-4 pt-4 border-t border-gray-300">
                        <p className="text-sm font-medium text-gray-500 mb-2">ความคิดเห็น</p>
                        <h3 className="text-sm bg-gray-50 p-3 rounded-md">{textInput.director}</h3>
                    </div>
                </div>            
            </div>
            <button className=" cursor-pointer rounded-md text-sm text-white h-10 px-4 py-2 w-full flex items-center justify-center gap-2 mt-4 bg-black" 
            onClick={BackToForm}> <RotateCcw size={18}/>ทำแบบสำรวจใหม่</button>
        </section>
: // form
        <section>
            <form onSubmit={ThenSubmit} className="flex flex-col p-8 bg-white">
                {RenderLableAndInput("name","text","ชื่อ","กรุณากรอกชื่อของคุณ")}
                {RenderLableAndInput("email","email","อีเมล","example@email.com")}

                <h2 className="mt-4 mb-3">เลือกหนังที่คุณชอบ<RenderAsteriskRed/></h2>
                <div className={`flex flex-col justify-around h-120 px-3 mb-2 ${"selectedOption" in dataError?`border rounded-md border-red-500`:null}`}>
                        {movies.map((movie) => (
                            <label key={movie.title} className="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-50">
                                <input
                                    type="radio"
                                    name="option"
                                    value={movie.title}
                                    checked={selectedOption === movie.title}
                                    onChange={(event) => setSelectedOption(event.target.value)}
                                    className="mt-0.5"
                                />
                                <div>
                                    <span className="font-medium">{`${movie.title} (${movie.year})`}</span>
                                    <span className="block text-gray-500">{`Director: ${movie.director}`}</span>
                                </div>
                            </label>
                        ))}
                </div>
                {"selectedOption" in dataError?<span className="text-sm text-red-500">{dataError.selectedOption}</span>:null}

                <label htmlFor="comment" className="mt-6 mb-2">ความคิดเห็นเกี่ยวกับหนัง</label>
                <textarea className="rounded-md border border-gray-300 p-2 " rows="4"placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
                    value={textInput.director || ""}
                    onChange={(event)=>setTextInput({ ...textInput, director: event.target.value })}
                ></textarea>
                
                <hr className="text-gray-300 my-6"/>
                
                <div className="flex flex-row justify-between">
                    <button className="cursor-pointer rounded-md border text-sm border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center gap-1"
                                        type="button" onClick={resetValue} ><RotateCcw size={15} />รีเซ็ต</button> 
                    <button className="cursor-pointer rounded-md text-sm font-medium h-10 px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-600 text-white flex items-center gap-1"
                    type="submit"><Send size={15}/>ส่งแบบสำรวจ</button>
                </div>
            </form>
        </section>
    }
    </section>
        </>
    )
}
export default FormMovie