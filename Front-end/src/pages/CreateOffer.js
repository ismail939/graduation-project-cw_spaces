import { useRef, useState } from "react";
import { ExclamationCircleFill, HandIndex } from "react-bootstrap-icons";
import Swal from "sweetalert2";
function getDate() {
    const today = new Date();
    const month = (today.getMonth() + 1).toString();
    const year = (today.getFullYear()).toString();
    const day = (today.getDate()).toString();
    return (`${year}-${month}-${parseInt(day) > 9 ? day : "0" + day}`);
}

function CreateOffer() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [checkerror, setCheckError] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [img, setImg] = useState([]);
    const [path,setPath]=useState("");
    const [binaryData, setBinaryData] = useState(null);
    const [errormessage, setErrorMessage] = useState("");
    const [offerImageName, setOfferImageName] = useState("");
    const [dataerrors, setDataErrors] = useState({
        start: false,
        end: false,
        title: false,
        description: false,
        offerImageName: false
    });
    const formRef = useRef(null);
    const success = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Offer is added successfully",
            showConfirmButton: false,
        });
    }
    function isImage(offerImage) {
        if (offerImageName.slice(-4) === ".jpg" || offerImageName.slice(-5) === ".jpeg" || offerImageName.slice(-4) === ".png") return true;
        else {
            return false;
        }
    }
    const addData = () => {
        if (isImage(offerImageName)) {
           
            // console.log(img)
            
            
            // let formData = { 'img': binaryData, 'imageName': offerImageName, 'title': title, 'description': description, 'start': start, 'end': end }
            let formData = new FormData();
            
            formData.append('imageName', offerImageName);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('start', start);
            formData.append('end', end);
            formData.append('cwSpaceCwID', 1);
            formData.append('img', img);
            // formData = JSON.stringify(formData)
            // console.log(formData)
            fetch('http://localhost:4000/offers', {
                method: 'POST',
                body: formData,
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === "error") {

                        setErrorMessage(data.message);
                        console.log(errormessage);
                    } else if (data.status === "success") {
                        console.log(data);
                    }
                })
                .catch(error => {
                    console.error('Error during fetch operation:', error);

                });
        }
    }

    // const titleError= (title) => {
    //     if (title.length === 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    // const descriptionError= (description) => {
    //     if (description.length === 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    // const dateError= (start,end) => {
    //     if (start.length === 0||end.length===0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    const HandleError = (e) => {
        e.preventDefault();
        if (!isImage(offerImageName)) {
            setDataErrors({ title: false, description: false, start: false, end: false, offerImageName: true })
        }
        else if (title.length === 0) {
            setDataErrors({ title: true, description: false, start: false, end: false, offerImageName: false })
        }
        else if (description.length === 0) {
            setDataErrors({ title: false, description: true, start: false, end: false, offerImageName: false })
        }
        else if (start.length === 0) {
            setDataErrors({ title: false, description: false, start: true, end: false, offerImageName: false })
        }
        else if (end.length === 0) {
            setDataErrors({ title: false, description: false, start: false, end: true, offerImageName: false })
        }
        else {
            setDataErrors({ title: false, description: false, start: false, end: false, offerImageName: false }); addData();
        }
    }
    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0] mb-[100px]">
                    <div className="p-6 space-y-4 p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Create Offer
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" ref={formRef}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Offer Image<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    name="offerImage"
                                    id="offerImage"

                                    className={`bg-gray-50 border ${dataerrors.offerImageName ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                    placeholder=""
                                    required
                                    accept=".png,.jpg,.jpeg"
                                    onChange={(e) => {
                                        

                                        setImg(e.target.files[0]);
                                        setOfferImageName(e.target.files[0].name);
                                        setPath(e.target.value)
                                    }}
                                ></input>
                                {dataerrors.offerImageName ? <span className="text-[12px] text-red-500">plaese enter an image accepted formats are png , jpg , jpeg</span> : null}

                            </div>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    title<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"

                                    className={`bg-gray-50 border ${dataerrors.title ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}

                                    placeholder="Enter your name"
                                    required
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                ></input>

                                {dataerrors.title ? <span className="text-[12px] text-red-500">plaese enter a title</span> : null}

                            </div>
                            <div>
                                <label
                                    htmlFor="Description"
                                    className=" block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Description<span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    type="text"
                                    name="Description"
                                    id="Description"

                                    className={`bg-gray-50 border ${dataerrors.description ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}

                                    placeholder="A breif description about your place"
                                    required
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                ></textarea>
                                {dataerrors.description ? <span className="text-[12px] text-red-500">plaese enter a description</span> : null}

                            </div>
                            <div className="flex justify-between gap-6">
                                <div className="w-full">
                                    <label
                                        htmlFor="phonenumber1"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        start date<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        id="startDate"

                                        value={start}
                                        min={getDate()}
                                        max={end?end:"2024-11-28"}
                                        className={`bg-gray-50 border ${dataerrors.start ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        required
                                        onChange={(e) => {
                                            setStart(e.target.value);

                                        }}
                                    ></input>
                                </div>
                                <div className="w-full">
                                    <label
                                        htmlFor="phonenumber1"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        end date<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        id="endDate"

                                        value={end}
                                        min={start ? start : getDate()}
                                        max="2024-11-28"
                                        className={`bg-gray-50 border ${dataerrors.end ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        required
                                        onChange={(e) => {
                                            setEnd(e.target.value);

                                        }}
                                    ></input>
                                </div>
                            </div>

                            {(dataerrors.end || dataerrors.start) ? <span className="text-[12px] text-red-500">{checkerror}please enter start and end date</span> : null}
                            <br></br>
                            <button
                                type="submit"
                                onClick={(e) => { HandleError(e) }}
                                className="mt-3 w-full text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 font-medium rounded-lg text-md px-5 py-2.5 text-center duration-300 ease-in-out"
                            >
                                Create Offer
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default CreateOffer;
