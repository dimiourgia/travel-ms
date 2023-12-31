import Icon from "../components/common/Icon"
import leftArrow_icon from '../assets/arrow-left.svg'
import upload_icon from '../assets/upload.svg'
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../components/common/Input"
import DateTime from "../components/common/DateTime"
import Date from "../components/common/Date"
import Select from "../components/common/Select"
import Checkbox from "../components/common/Checkbox"
import SlimDate from "../components/common/SlimDate"
import AddMore from "../components/common/AddMore"
import Button from "../components/common/Button"
import { titleCase } from "../utils/handyFunctions"


export default function (props){

    //onboarding data
    const onBoardingData = props.onBoardingData

    const modeOfTransitList = onBoardingData?.modeOfTransitOptions
    const travelClassOptions = onBoardingData?.travelClassOptions
    const allowedCabClass = onBoardingData?.cabClassOptions 
    const allowedHotelClass = onBoardingData?.hotelClassOptions

    
    //formdata
    const [formData, setFormData] = [props.formData, props.setFormData]

    const [oneWayTrip, setOneWayTrip] = useState(formData.itinerary.tripType.oneWayTrip)
    const [roundTrip, setRoundTrip] = useState(formData.itinerary.tripType.roundTrip)
    const [multiCityTrip, setMultiCityTrip] = useState(formData.itinerary.multiCityTrip)
    const [needsVisa, setNeedsVisa] = useState(formData.itinerary.needsVisa)
    const [needsAirportTransfer, setNeedsAirportTransfer] = useState(formData.itinerary.needsAirportTransfer)
    const [needsHotel, setNeedsHotel] = useState(formData.itinerary.needsHotel)
    const [needsFullDayCab, setNeedsFullDayCab] = useState(formData.itinerary.needsFullDayCabs)
    const [cabClass, setCabClass] = useState(null)

    //format: from, to , departureDate, returnDate
    const [cities, setCities] = useState(formData.itinerary.cities)
    const [modeOfTransit, setModeOfTransit] = useState(formData.itinerary.modeOfTransit)
    const [travelClass, setTravelClass] = useState(formData.itinerary.travelClass)
    const [hotels, setHotels] = useState(formData.itinerary.hotels)
    const [cabs, setCabs] = useState({})


    //update form
    useEffect(()=>{
        const formData_copy = JSON.parse(JSON.stringify(formData))
        formData_copy.itinerary.tripType = {oneWayTrip, roundTrip, multiCityTrip}
        setFormData(formData_copy)
    }, [oneWayTrip, roundTrip, multiCityTrip])

    useEffect(()=>{
        const formData_copy = JSON.parse(JSON.stringify(formData))
        formData_copy.itinerary.needsVisa = needsVisa
        setFormData(formData_copy)
    },[needsVisa])

    useEffect(()=>{
        const formData_copy = JSON.parse(JSON.stringify(formData))
        formData_copy.itinerary.needsAirportTransfer = needsAirportTransfer
        setFormData(formData_copy)
    },[needsAirportTransfer])

    useEffect(()=>{
        const formData_copy = JSON.parse(JSON.stringify(formData))
        formData_copy.itinerary.needsHotel = needsHotel
        setFormData(formData_copy)
    },[needsHotel])

    useEffect(()=>{
        const formData_copy = JSON.parse(JSON.stringify(formData))
        formData_copy.itinerary.needsFullDayCabs = needsFullDayCab
        setFormData(formData_copy)
    },[needsFullDayCab])

    useEffect(()=>{
        const formData_copy = JSON.parse(JSON.stringify(formData))
        formData_copy.itinerary.cities = cities
        setFormData(formData_copy)
    },[cities])

    useEffect(()=>{
        const formData_copy = JSON.parse(JSON.stringify(formData))
        formData_copy.itinerary.hotels = hotels
        setFormData(formData_copy)
    },[hotels])

    useEffect(()=>{
        const formData_copy = JSON.parse(JSON.stringify(formData))
        formData_copy.itinerary.modeOfTransit = modeOfTransit
        setFormData(formData_copy)
    },[modeOfTransit])

    useEffect(()=>{
        const formData_copy = JSON.parse(JSON.stringify(formData))
        formData_copy.itinerary.travelClass = travelClass
        setFormData(formData_copy)
    },[travelClass])


    const navigate = useNavigate()

    const handleBackButton = ()=>{
        navigate('/section0')    
    }

    const handleContinueButton = ()=>{
        console.log(sectionForm)
        console.log(formData)
        navigate('/section2')
    }

    function selectTripType(type){

        switch(type){
            case 'oneWay':{
                setOneWayTrip(true)
                setRoundTrip(false)
                setMultiCityTrip(false)
                return
            }

            case 'round':{
                setOneWayTrip(false)
                setRoundTrip(true)
                setMultiCityTrip(false)
                return
            }

            case 'multiCity':{
                setOneWayTrip(false)
                setRoundTrip(false)
                setMultiCityTrip(true)
                return
            }

            default : {
                setOneWayTrip(true)
                setRoundTrip(false)
                setMultiCityTrip(false)
                return
            }

        }
    }


    const addHotel = ()=>{
        const hotels_copy = JSON.parse(JSON.stringify(hotels))
        hotels_copy.push({})
        setHotels(hotels_copy)
    }

    const addCities = ()=>{
        const cities_copy = JSON.parse(JSON.stringify(cities))
        cities_copy.push({from:null, to:null, departure: {date:null, time:null}, return: {date:null, time:null}})
        setCities(cities_copy)
    }

    useEffect(()=>{
        if(modeOfTransit && !travelClassOptions[modeOfTransit.toLowerCase()].includes(travelClass)){
            setTravelClass(null)
        }
    },[modeOfTransit])

    useEffect(()=>{
        if(!multiCityTrip){
            const cities_copy = JSON.parse(JSON.stringify(cities))
            cities_copy.splice(1, cities_copy.length-1)
            console.log(cities_copy)
            setCities(cities_copy)
        }
    },[multiCityTrip])

    const updateCity = (e, index, field)=>{
        const cities_copy = JSON.parse(JSON.stringify(cities))
        cities_copy[index][field] = e.target.value
        setCities(cities_copy)
    }

    const handleTimeChange = (e, index, field)=>{
      //  console.log(e.target.value, index, field)
        const cities_copy = JSON.parse(JSON.stringify(cities))
        cities_copy[index][field].time = e.target.value
        setCities(cities_copy)
    }

    const handleDateChange = (e, index, field)=>{
      //  console.log(e.target.value, index, field)
        const cities_copy = JSON.parse(JSON.stringify(cities))
        cities_copy[index][field].date = e.target.value
        setCities(cities_copy)
    }

    const handleHotelDateChange = (e, index, field)=>{
        const hotels_copy = JSON.parse(JSON.stringify(hotels))
        hotels_copy[index][field] = e.target.value
        setHotels(hotels_copy)
    }

    const handleHotelClassChange = (option, index)=>{
        const hotels_copy = JSON.parse(JSON.stringify(hotels))
        hotels_copy[index].class = option
        setHotels(hotels_copy)
    }
    
    useEffect(()=>{
        console.log(hotels)
    },[hotels])

    const sectionForm = {
        cities: cities,
        modeOfTransit: modeOfTransit,
        tripType: {oneWayTrip, roundTrip, multiCityTrip},
        hotels: hotels,
        cabs: cabs,
    }

    return(<>
        <div className="w-full h-full relative bg-white md:px-24 md:mx-0 sm:px-0 sm:mx-auto py-12 select-none">
            {/* app icon */}
            <div className='w-full flex justify-center  md:justify-start lg:justify-start'>
                <Icon/>
            </div>

            {/* Rest of the section */}
            <div className="w-full h-full mt-10 p-10">

                {/* back link */}
                <div className='flex items-center gap-4 cursor-pointer' onClick={handleBackButton}>
                    <img className='w-[24px] h-[24px]' src={leftArrow_icon} />
                    <p className='text-neutral-700 text-md font-semibold font-cabin'>Add travel details</p>
                </div>

                {/* one way, round trip, multi-city */}
               <div className="w-fit h-6 justify-start items-center gap-4 inline-flex mt-5">
                    <div onClick={()=>{selectTripType('oneWay')}} className={`${ oneWayTrip? 'text-zinc-100 bg-indigo-600 px-2 py-1 rounded-xl' : 'text-zinc-500' } text-xs font-medium font-cabin cursor-pointer`}>One Way </div>
                    <div onClick={()=>selectTripType('round')} className={`${ roundTrip? 'text-zinc-100 bg-indigo-600 px-2 py-1 rounded-xl' : 'text-zinc-500' } text-xs font-medium font-cabin cursor-pointer `}>Round Trip</div>
                    <div onClick={()=>{selectTripType('multiCity')}} className={`${ multiCityTrip? 'text-zinc-100 bg-indigo-600 px-2 py-1 rounded-xl' : 'text-zinc-500' } text-xs font-medium font-cabin cursor-pointer `}>Multi City</div>
                </div> 
                <hr className='mt-2 -mb-4' />

                {/* from, to , date */}
                {cities.map((city,index)=>
                <div key={index} className="mt-8 flex gap-8 items-center flex-wrap">
                    <Input title='From'  placeholder='City' value={cities[index].from} onBlur={(e)=>updateCity(e, index, 'from')} />
                    <Input title='To' placeholder='City' value={cities[index].to} onBlur={(e)=>updateCity(e, index, 'to')} />
                    <DateTime 
                        title='Departure Date'
                        time = {(cities && cities['departure']!=undefined && cities['departure']['time']!=undefined)? cities['departure'].time : '11:00' }
                        date={(cities && cities['departure']!=undefined && cities['departure']['time']!=undefined)? cities['departure'].time : null }
                        onTimeChange={(e)=>handleTimeChange(e, index, 'departure')}
                        onDateChange={(e)=>handleDateChange(e, index, 'departure')} />
                    {!oneWayTrip && 
                    <DateTime
                        title='Return Date'
                        time = {(cities && cities['return']!=undefined && cities['return']['time']!=undefined)? cities['return'].time : '11:00' }
                        date={(cities && cities['return']!=undefined && cities['return']['time']!=undefined)? cities['return'].time : null }
                        onTimeChange={(e)=>handleTimeChange(e, index, 'return')}
                        onDateChange={(e)=>handleDateChange(e, index, 'return')} 
                        />}

                </div>)}

                {multiCityTrip && <div className="mt-8">
                    <AddMore onClick={addCities} /> 
                </div>}

                <hr className='mt-4' />

                <div className="pt-8">
                    <div className="flex gap-8 flex-wrap">
                        <Select 
                            options={modeOfTransitList}
                            onSelect={(option)=>{setModeOfTransit(option)}}
                            currentOption={modeOfTransit}
                            title='Select mode of transit' 
                            placeholder='Select travel mode' />
                        <Select 
                            options={modeOfTransit? travelClassOptions[modeOfTransit.toLowerCase()] : []}
                            onSelect={(option)=>{setTravelClass(option)}}
                            currentOption={travelClass}
                            title='Select travel Class' 
                            placeholder='Select travel class' />
                    </div>
                </div>

               { modeOfTransit=='Flight' &&  <>
                    <hr className='my-8' />
                    <div className=" flex gap-8">
                    <div className="flex gap-2 items-center">
                        <p className="text-neutral-700 w-full h-full text-sm font-normal font-cabin">
                            Will you need a visa?
                        </p>
                        <Checkbox checked={needsVisa} onClick={(e)=>{setNeedsVisa(e.target.checked)}} />
                    </div>

                    <div className="flex gap-2 items-center">
                        <p className="text-neutral-700 w-full h-full text-sm font-normal font-cabin">
                            Will you need an airport transfer?
                        </p>
                        <Checkbox checked={needsAirportTransfer} onClick={(e)=>{setNeedsAirportTransfer(e.target.checked)}} />
                    </div>

                </div> </>}

                <hr className='mt-8' />

                {/* upload document */}
                <div className="py-8">
                    <div className="flex gap-2">
                        <p className='text-base font-medium text-neutral-700 font-cabin'>Upload trip related documents</p>
                        <p className='text-base font-medium text-neutral-500 font-cabin'>{`(Optional)`}</p>
                    </div>

                    <div className="flex mt-4 flex-wrap">
                       <div className="flex max-w-[583px] h-[153px] w-full bg-stone-100 rounded-md border-neutral-400 justify-center items-center px-6 py-2">
                            <div className="flex flex-col justify-center items-center gap-4">
                                <div className="w-6 h-6 relative">
                                    <img src={upload_icon}/>
                                </div>
                                <div className="text-center">
                                    <span className="text-neutral-500 text-sm font-normal font-cabin">Drag and drop or </span>
                                    <span className="text-indigo-600 text-sm font-normal font-cabin underline cursor-pointer">Browse</span>
                                </div>
                            </div>
                       </div>
                       {/* uploaded documents*/}
                       <div>

                       </div>
                    </div>
                    <hr className='mt-8' />
                </div>


                {/* hotel */}
                    
                    <div className="flex gap-2 items-center">
                        <p className="text-neutral-700 text-sm font-normal font-cabin">
                            Will you need a hotel?
                        </p>
                        <Checkbox checked={needsHotel} onClick={(e)=>{setNeedsHotel(e.target.checked)}} />
                    </div>

                    {needsHotel && <> 
                        {hotels && hotels.map((hotel,index)=><div key={index} className="flex flex-wrap gap-8 mt-8">
                            {allowedHotelClass && allowedHotelClass.length>0 && 
                            <Select options={allowedHotelClass}
                                    title='Hotel Class'
                                    placeholder='Select hotel class'
                                    currentOption={hotels[index].class} 
                                    onSelect={(option)=>handleHotelClassChange(option, index)} />}
                            <SlimDate title='Check In' date={hotels[index].checkIn} onChange={(e)=>{handleHotelDateChange(e, index, 'checkIn')}} />
                            <SlimDate title='Check Out' date={hotels[index].checkOut} onChange={(e)=>{handleHotelDateChange(e, index, 'checkOut')}}/>
                        </div>)}
                        
                        <div className="mt-8">
                           <AddMore onClick={addHotel} /> 
                        </div>
                            
                        </> 
                        }
                
                {/* cab */}
                <hr className='mt-8 mb-8' />
                <div className="flex gap-2 items-center">
                        <p className="text-neutral-700 text-sm font-normal font-cabin">
                            Will you need a full day cab?
                        </p>
                        <Checkbox checked={needsFullDayCab} onClick={(e)=>{setNeedsFullDayCab(e.target.checked)}} />
                </div>

                {needsFullDayCab && 
                <>
                    <div  className="flex flex-wrap gap-8 mt-8 items-center">
                        <Date />
                            {allowedCabClass && allowedCabClass.length>0 && 
                            <Select options={allowedCabClass}
                                    title='Cab Class'
                                    placeholder='Select cab class'
                                    currentOption={cabClass} 
                                    onSelect={(option)=>setCabClass(option)} />}
                        </div>    
                </>
                }


                <div className='my-8 w-[134px] float-bottom float-right'>
                    <Button 
                        text='Continue' 
                        onClick={handleContinueButton} />
                </div> 

            </div>

        </div>
    </>)
}


