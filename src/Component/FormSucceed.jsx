import { CircleCheckBig, RotateCcw } from "lucide-react";

function SurveyResult({ textInput, selectedOption, BackToForm }) {
    const RenderShowDataInput = (topicName, dataInTopic, className) => (
        <div className="grid grid-cols-3 gap-1">
            <p className="text-sm font-medium text-gray-500">{topicName}</p>
            <p className={`${className}`}>{dataInTopic || "ไม่มีข้อมูล"}</p>
        </div>
    );

    return (
        <section className="bg-white p-6">
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                <h2 className="text-xl text-green-800 flex items-center gap-2 mb-4">
                    <CircleCheckBig /> ส่งแบบสำรวจสำเร็จ!
                </h2>
                <div className="space-y-3">
                    {RenderShowDataInput("ชื่อ:", textInput.name, "text-sm")}
                    {RenderShowDataInput("อีเมล:", textInput.email, "text-sm")}
                    {RenderShowDataInput("หนังที่เลือก:", selectedOption, "text-sm font-medium text-purple-700")}
                    <div className="mt-4 pt-4 border-t border-gray-300">
                        <p className="text-sm font-medium text-gray-500 mb-2">ความคิดเห็น</p>
                        <h3 className="text-sm bg-gray-50 p-3 rounded-md">
                            {textInput.director}
                        </h3>
                    </div>
                </div>
            </div>
            <button
                className="cursor-pointer rounded-md text-sm text-white h-10 px-4 py-2 w-full flex items-center justify-center gap-2 mt-4 bg-black"
                onClick={BackToForm}
            >
                <RotateCcw size={18} /> ทำแบบสำรวจใหม่
            </button>
        </section>
    );
}

export default SurveyResult;