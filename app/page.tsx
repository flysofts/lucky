// import Image from 'next/image'


'use client'
import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCakeCandles, faClock, faClover, faMoon } from "@fortawesome/free-solid-svg-icons";



interface contentInter {
  name: string;
  desc : string;
  keyword ?: string;
  index ?: string
}
interface today{
  title: string;
  date: string;
  content: contentInter[]

}


export default function Home() {
  const [gender, setGender] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [month , setMonth] = useState<string>("1");
  const [time, setTime] = useState<string>("");

  const[resultToday,setResultToday] = useState<today | null>(null); 

  const [resultTomorrow, setResultTomorrow] = useState<string>("");
  const [resultMonth, setResultMonth] = useState<string>("");
  


  const fetchData = async () =>{
    const res = await fetch(`/api?gender=${gender}&birthdate=${birthDate}&month=${month}&time=${time}`);
    const data = await res.json();
    setResultToday(data.result.day);
    setResultTomorrow(data.result.tomorrow);
    setResultMonth(data.result.month);
    console.log(data.result);
    console.log(data.result.tomorrow);
    console.log(data.result.month);
  }

  const birthChange = ((e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;
    if(value.length <= 8 && /^[0-9]*$/.test(value)){
      setBirthDate(value)
    }
    
  })

  return (
    <>
    <div className='max-w-7xl   py-8 m-auto bg-red-300 rounded-md mt-10'>
      <p className='text-center pb-5 font-bold font-serif text-2xl'>오늘의 운세 ?
      <FontAwesomeIcon className='ml-5 text-neutral-800' icon={faClover}/>
      </p>
      <div className='text-center font-bold mr-2'> 성별:
        <button className='px-4' onClick={()=> setGender("m")}>👨</button>
        <button className='px-2' onClick={()=> setGender("f")}>👩</button>
        </div>
      <div className='flex justify-center items-center flex-col'>
    <div className='mb-2'>
    <FontAwesomeIcon className='text-neutral-800 ml-20' icon={faCakeCandles}/>
      <span className='mr-5 font-bold'>생년월일!!:</span>
      
      <input type='text' className=' bg-red-100' onChange={birthChange} value={birthDate} placeholder='ex)20020505'/>
    </div>
    <div className='mb-2'>
      <span className='ml-14 mr-5 font-bold'><FontAwesomeIcon className='text-neutral-800' icon={faMoon}/>
      음,양력:</span>
      <select  value={month} className='bg-red-100 mr-20' onChange={(e)=> setMonth(e.target.value)}>
        <option value="1">양력</option>
        <option value="2">음력 평달</option>
        <option value="3">음력 윤달</option>
      </select>
    </div>
    <div>
      <span className='ml-10 mr-5 font-bold'> <FontAwesomeIcon className='text-neutral-800' icon={faClock}/>
       태어난 시간:</span>
      <select value={time} className='bg-red-100 mr-14' onChange={(e)=> setTime(e.target.value)}>
        <option value="">몰라요</option>
        <option value="0">23:30 ~ 01:29</option>
        <option value="1">01:30 ~ 03:29</option>
        <option value="2">03:30 ~ 05:29</option>
        <option value="3">05:30 ~ 07:29</option>
        <option value="4">07:30 ~ 09:29</option>
        <option value="5">09:30 ~ 11:29</option>
        <option value="6">11:30 ~ 13:29</option>
        <option value="7">13:30 ~ 15:29</option>
        <option value="8">15:30 ~ 17:29</option>
        <option value="9">17:30 ~ 19:29</option>
        <option value="10">19:30 ~ 21:29</option>
        <option value="11">21:30 ~ 23:29</option>
      </select>
    </div>
    <button className='mt-10 font-bold hover:bg-red-400 px-2 py-1 border-2 border-gray-700 font-serif' onClick={fetchData}>운세보기</button>
    </div>
    </div>
    {resultToday && (
      <>
      <div className='max-w-7xl m-auto bg-red-100'>
      <h2 className='font-bold text-xl'>{resultToday.title}</h2>
      <p className='font-bold text-sm'>{resultToday.date}</p>
      </div>
      {resultToday.content.map((item, idx) => (
        <div key={idx}>
          <div className='max-w-7xl m-auto bg-red-100'>
          <h3 className='pt-2 font-bold text-lg'>{item.name}</h3>
          <p className='font-bold'>{item.desc}</p>
          </div>
        </div>
        
      ))}
     </>
    )}
      {/* {resultData && resultData.day.title} */}      
    </>
  )
}
