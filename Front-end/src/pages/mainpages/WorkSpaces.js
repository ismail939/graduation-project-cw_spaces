/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, SortDownAlt, FunnelFill, XCircleFill } from "react-bootstrap-icons";
import Filters from "../../components/Filters";
import notdata from "../../components/images/Nodata.svg"
import servererror from "../../components/images/serverdown.svg"
import WorkSpaceCard from "../../components/WorkSpaceCard";
import { Pagination, PaginationItem } from "@mui/material";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function ShowError() {
    return (
        <div className="flex flex-col items-center text-center">
            <img src={servererror} alt="" className="md:h-[450px] md:w-[500px] h-[300px] w-[300px]"></img>
            <p className="text-2xl text-[#1B262C] sec-font">Oops, there is a problem at the moment. try again later</p>
        </div>
    )
}
export function NoDataError(props) {
    return (
        <div className="flex flex-col items-center text-center">
            <img src={notdata} alt="" className="md:h-[450px] md:w-[500px] h-[300px] w-[300px]"></img>
            <div><p className="mt-8 uppercase  md:text-3xl text-xl sec-font">{props.response}</p>
                <p className="mt-5 text-gray-500 text-md md:text-lg sec-font">Sorry for your inconvenience</p>
            </div>
        </div>
    )
}
function WorkSpaces() {
    const [dropdown, setDropDown] = useState(false);
    const [cwspaces, setCWSpaces] = useState([]);
    const [displayedCwspaces, setDisplayedCwspaces] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [statusresponse, setStatusResponse] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [searchlist, setSearchList] = useState(false);
    const [fetcherror, setFetchError] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [loading, setLodaing] = useState(true);
    const [pageNumber, setPageNumber] = useState(0)
    const token = useSelector(store => store.auth).token;
    const profileData = token ? jwtDecode(token) : null;
    const cwSpacesPerPage = 10;
    const pagesVisited = pageNumber * cwSpacesPerPage;
    const pageCount = Math.ceil(displayedCwspaces?.length / cwSpacesPerPage);
    let menuRef = useRef();
    useEffect(() => {
        if (profileData?.clientID) getFavourites();
        getWorkSpaces();
        setDropDown(false);
    }, [])
    const getFavourites = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/favourites/${profileData.clientID}`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }},)
            .then(res => res.json())
            .then(responsedata => {
                setFavourites(responsedata.data);
            }
            ).catch(error => { });
    }
    useEffect(() => {
        let handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setSearchList(false)
            }
        }
        document.addEventListener("mousedown", handler)
    }, [])
    const getWorkSpaces = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/cw_spaces`)
            .then(res => res.json())
            .then(responsedata => {
                setLodaing(false)
                setCWSpaces(responsedata.data);
                setDisplayedCwspaces(responsedata.data)
                setFetchError(false)
                if (responsedata.status === "error") setStatusResponse("Sorry, there are no Co-working Spaces currently");
                else if (responsedata.status === "fail") setStatusResponse("Oops something went wrong !");
            }
            ).catch(error => { setFetchError(true); });
    }
    const getSearchData = (event) => {
        const search = event.target.value;
        setSearchData(cwspaces?.filter((workspace) => {
            return search === '' ?
                null : workspace.name.toLowerCase().includes(search.toLowerCase());
        }))
    }
    function sortData(sortDir) {
        const soretedData = [...cwspaces];
        soretedData.sort((a, b) => {
            return sortDir === "lowtohigh" ? a.rate - b.rate : b.rate - a.rate;
        })
        setDisplayedCwspaces(soretedData);
    }
    function handleFilter() {
        setAvailableRooms([])
        setShowFilter(!showFilter)
    }
    function ApplyFilter() {
        const filteredCWs = cwspaces?.filter((workspace) => {
            if (availableRooms.length > 0) return (workspace.hourPrice >= priceRange[0]
                && workspace.hourPrice <= priceRange[1]
                && availableRooms.every(value => workspace.availableRooms?.includes(value))
                
            )
            else return workspace.hourPrice >= priceRange[0]
                && workspace.hourPrice <= priceRange[1]
        })
        setDisplayedCwspaces(filteredCWs)
        setAvailableRooms([])
        setShowFilter(false)
    }
    function AdjustPriceRange(newValue) {
        setPriceRange(newValue)
    }
    function changePage(event, value) {
        setPageNumber(value - 1)
    }
    const displayPages = displayedCwspaces?.slice(pagesVisited, pagesVisited + cwSpacesPerPage).map((cwspace) => {
        return <WorkSpaceCard cwspace={cwspace} showFavIcon={true} favourites={favourites} profileData={profileData} key={cwspace.cwID} />
    })
    return (
        <div className="flex flex-col relative min-h-screen justify-between">
            {showFilter && <div className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center bg-black/[.2] z-20">
                <Filters priceRange={priceRange} handleFilter={handleFilter} AdjustPriceRange={AdjustPriceRange} ApplyFilter={ApplyFilter} availableRooms={availableRooms} setAvailableRooms={setAvailableRooms} />
            </div>}
            <div className="w-4/5 mx-auto md:mt-[30px] p-5">
                <div className="relative w-full" ref={menuRef}>
                    <div className="w-full h-10 flex items-center">
                        <input
                            type="search"
                            className="h-full w-full p-2 border-2 border-solid border-black border-r-0 rounded-l-md focus:border-[#0F4C75] focus:outline-none"
                            placeholder="Search by workspace name"
                            aria-label="Search"
                            onChange={e => getSearchData(e)}
                            onClick={() => { setSearchList(true) }}
                        ></input>
                        <button className="duration-200 ease-in-out btn-color h-full p-4 flex items-center rounded-r-md  text-white"
                            onClick={() => {  setDisplayedCwspaces(searchData); setSearchList(false)  }}><Search className="text-lg" /></button>
                    </div>
                    {(searchData?.length > 0 && searchlist) ? <div className="flex flex-col max-h-60 w-full mt-1 shadow-md rounded-md bg-[#fafafa] overflow-x-hidden absolute z-[90]" >
                        {searchData.map((workspace) => {
                            return <Link className="w-full p-3 capitalize hover:bg-gray-200 font-semibold" to={`/workspaces/${workspace.cwID}`}>{workspace.name}</Link>
                        })}
                    </div> : null}
                </div>
                {cwspaces?.length > 0 && <div className="w-full flex justify-between mt-8">
                    <button id="dropdownDefaultButton" className="md:w-36 w-28 mb-5 text-white btn-color flex focus:outline-none font-medium rounded-lg text-sm md:px-5 px-2 py-2.5 justify-center items-center gap-2"
                        onClick={() => handleFilter()} type="button"><FunnelFill className="text-lg" /> Filters
                    </button>
                    <div id="dropdown" className="relative md:w-36 w-28" onMouseLeave={() => { setDropDown(false) }}>
                        <button id="dropdownDefaultButton" className="w-full text-white btn-color flex focus:outline-none font-medium rounded-lg text-sm md:px-5 px-2 py-2.5 justify-center items-center gap-2" type="button" onMouseEnter={() => { setDropDown(!dropdown) }}>Sort By <SortDownAlt className="text-lg" />
                        </button>
                        <ul className={`w-full py-2 text-sm text-gray-700 z-10 bg-white rounded-lg shadow ${dropdown ? "absolute" : "hidden"}`}>
                            <li className="hover:bg-gray-100">
                                <button className="px-4 py-2" value="low-to-high" onClick={() => { sortData("lowtohigh") }}>Low to High</button>
                            </li>
                            <li className="hover:bg-gray-100">
                                <button className="block px-4 py-2" value="high-to-low" onClick={() => sortData("hightolow")} >High to Low</button>
                            </li>
                        </ul>
                    </div>
                </div>}
                {!fetcherror ? <div>
                    {loading ? 
                    <div className="flex flex-col gap-8">
                        <Skeleton className="w-full h-48 rounded-xl mt-10"/>
                        <Skeleton className="w-full h-48 rounded-xl"/>
                        <Skeleton className="w-full h-48 rounded-xl"/>
                    </div>
                    : 
                    (cwspaces ? <div className="flex flex-col gap-8">
                        {displayPages}</div> : <NoDataError response={statusresponse} />)
                    }
                </div> : <ShowError />
                }
            </div >
            {!fetcherror && displayedCwspaces?.length > 0 ? <div className="mt-[50px] flex justify-center">
                <Pagination
                    count={pageCount}
                    onChange={changePage}
                />
            </div> : null}
        </div >
    )
}

export default WorkSpaces;
