import { useState } from "react";
import Swal from "sweetalert2";
function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [checkerror, setCheckError] = useState("")
    const [success, setSuccess] = useState(false)
    const [dataerrors, setDataErrors] = useState({
        email: false,
    });
    function sendEmail() {
        fetch(`http://localhost:4000/clients/forgotPassword`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
                setSuccess(true)
                console.log("success")
            } else if (data.status === "error") {
                console.log(data.message)
            } else if (data.status === "fail") {
                console.log("oops, something wrong went on !")
            }
        })
    }
    const emailError = (email) => {
        const regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
        if (!email.match(regex)) {
            return true;
        } else {
            return false;
        }
    }
    function handleEmail(e) {
        e.preventDefault()
        if (emailError(email)) {
            setDataErrors({ email: true })
            setCheckError("please write a valid email address")
        }
        else {
            setDataErrors({ email: false })
            setCheckError("")
            sendEmail();
        }
    }
    return (
        <>
            <div className="flex flex-col items-center mt-32 min-h-screen">
                <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0">
                    <div className="p-6">
                        <h1 className="text-xl mb-4 font-bold text-gray-900 md:text-2xl">
                            Reset Password
                        </h1>
                        <div className="">
                            <h1 className="text-sm mb-3 text-gray-600">Please enter your email to be able to change your password</h1>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                <input type="email" value={email} name="email" id="username" className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`} placeholder="enter your email"
                                    onChange={(e) => setEmail(e.target.value)}></input>
                                {dataerrors.email ? <span className="text-[12px] text-red-500">plaese enter a valid email</span> : null}
                            </div>
                            {success && <p className="font-semibold my-4 text-[14px]">Please check your inbox for email sent</p>}
                            <div className="mt-4">
                                <button type="submit" className={`w-full btn-color rounded-sm text-md font-medium px-5 py-2.5 text-center duration-300`}
                                    onClick={(e) => handleEmail(e)}>Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default ForgotPassword;