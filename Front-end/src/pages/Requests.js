import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
export function TopBar({intitalState}) {
    const [activeSection, setActiveSection] = useState(intitalState)
    const activeStyle = "text-[#197ec2] after:content-[''] after:w-full after:bg-[#197ec2] after:absolute after:h-[1.5px] after:left-0 after:-bottom-2"
    return (
        <div className="w-full mb-4 mt-[50px] main-font text-lg">
            <div className=" flex items-center gap-4">
                <Link className={`${activeSection === `Reqeusts` ? activeStyle : null} py-2 px-4 relative`} to="/requests" onClick={() => setActiveSection("Reqeusts")}>Requests</Link>
                <Link className={`${activeSection === `Books` ? activeStyle : null} py-2 px-4 relative`} to="/books" onClick={() => setActiveSection("Books")}>Books</Link>
            </div>
            <hr className="border-black mt-2"></hr>
        </div>
    )
}
function formatDate(isoString) {
    const date = new Date(isoString);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    // Extract the date components
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = isoString.split('T')[1].split(':')[0];
    const minutes = isoString.split('T')[1].split(':')[1];
    return `${day} ${month} ${year} ${hours}:${minutes}`;
}
function Requests() {
    const [requests, setRequests] = useState([]);
    const user = useSelector(store => store.auth);
    const token = user.token;
    const usertype = user.usertype;
    const profileData = jwtDecode(token);
    const getRequests = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/requests/${profileData.cwSpaceCwID}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(responsedata => {
                setRequests(responsedata.data)
                console.log(responsedata.data)
            }).catch()
    }
    useEffect(() => {
        getRequests();
    }, [])
    function handleAccept(clientClientID, roomRoomID) {
        fetch(`${process.env.REACT_APP_BASE_URL}/requests/${clientClientID}/${roomRoomID}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "status": "accepted",
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
                getRequests()
            } else if (data.status === "error") {
            } else if (data.status === "fail") {
            }
        })
    }
    function handleDelete(clientClientID, roomRoomID) {
        fetch(`${process.env.REACT_APP_BASE_URL}/requests/${clientClientID}/${roomRoomID}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                "status": "accepted",
                
            })
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
                getRequests()
            } else if (data.status === "error") {
                console.log(data.message)
            } else if (data.status === "fail") {
            }
        })
    }
    function PendingRoomCard(props) {
        const room = props.room;
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
                <div className="">
                    <div className="">
                        <img className="h-48 w-full object-cover w-full" src={room.roomImg} alt={"no image found"}></img>
                    </div>
                    <div className="px-8 py-2">
                        <h1 className="capitalize font-semibold text-xl leading-tight text-black main-font">{`${room?.roomType} Room ${room?.roomNumber}`}</h1>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`${formatDate(room?.createdAt)} Created`}</div>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`${formatDate(room?.updatedAt)} Updated`}</div>
                        <div className="flex items-center gap-2 my-2">
                            <img className="w-10 h-10 object-cover rounded-full" src={room.clientImg} alt={"no image found"}></img>
                            <div>{`${room?.clientName}  requested ${room?.numberOfPersons} people`}</div>
                        </div>
                        <div className="flex flex-col items-center gap-1 mt-2">
                            <button className="btn-color px-2 py-1 rounded-xl w-full h-10 text-lg main-font" onClick={() => handleAccept(room.clientClientID, room.roomRoomID)}>Accept</button>
                            <button className="bg-red-500 px-2 py-1 hover:bg-red-600 rounded-xl w-full main-font" onClick={() => handleDelete(room.clientClientID, room.roomRoomID)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    function HistoryCard(props) {
        const room = props.room;
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
                <div className="">
                    <div className="">
                        <img className="h-48 w-full object-cover w-full" src={room.roomImg} alt={"no image found"}></img>
                    </div>
                    <div className="px-8 py-2">
                        <h1 className="capitalize text-lg leading-tight text-xl main-font">{`${room?.roomType} Room ${room?.roomNumber}`}</h1>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`${formatDate(room?.createdAt)} Created `}</div>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`${formatDate(room?.updatedAt)} Updated`}</div>
                        <div className="flex items-center gap-2 my-2">
                            <img className="w-10 h-10 object-cover rounded-full" src={room.clientImg} alt={"no image found"}></img>
                            <div>{`${room?.clientName}  requested ${room?.numberOfPersons} people`}</div>
                        </div>
                        <div className={`main-font text-xl capitalize ${room.status === "accepted" ? "text-green-500" : "text-[#0F4C75]"}`}>{`Request ${room.status}`}</div>
                    </div>
                </div>
            </div>
        )
    }
    const pending = requests?.filter(request => request.status === "pending");
    const History = requests?.filter(request => (request.status === "accepted" || request.status === "rejected"));
    return (
        <>
            <div className="w-[95%] mx-auto min-h-screen">
                <TopBar intitalState={"Reqeusts"}/>
                {pending?.length > 0 || History?.length > 0 ? <><div className="">
                    {pending?.length > 0 && <div className="mt-10">
                        <h2 className="text-2xl main-font mb-4">Pending</h2>
                        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                            {pending?.map((room) => {
                                return <PendingRoomCard room={room} key={room.clientClientID} />
                            })}
                        </div>
                    </div>}
                </div>
                <div>
                    {History?.length > 0 && <div className="mt-10">
                        <h2 className="text-2xl main-font mb-4">History</h2>
                        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                            {History?.map((room) => {
                                return <HistoryCard room={room} key={room.clientClientID} />
                            })}
                        </div>
                    </div>}
                </div></> : <div className="text-center mt-[100px]">
                        <p className="font-medium text-xl">Currently there aren't any requests</p>
                        </div>}
            </div>
        </>
    )
}
export default Requests;