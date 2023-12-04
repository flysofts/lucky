// import Image from 'next/image'


'use client'
import React, { useState } from 'react';




interface contentInter {
  name: string;
  desc: string;
  keyword?: string;
  index?: string
}
interface today {
  title: string;
  date: string;
  content: contentInter[]

}


export default function Home() {
  const [gender, setGender] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [month, setMonth] = useState<string>("1");
  const [time, setTime] = useState<string>("");

  const [resultToday, setResultToday] = useState<today | null>(null);

  const [resultTomorrow, setResultTomorrow] = useState<string>("");
  const [resultMonth, setResultMonth] = useState<string>("");



  const fetchData = async () => {
    const res = await fetch(`/api?gender=${gender}&birthdate=${birthDate}&month=${month}&time=${time}`);
    const data = await res.json();
    setResultToday(data.result.day);
    setResultTomorrow(data.result.tomorrow);
    setResultMonth(data.result.month);
    console.log(data.result);
    console.log(data.result.tomorrow);
    console.log(data.result.month);
  }

  const birthChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 8 && /^[0-9]*$/.test(value)) {
      setBirthDate(value)
    }

  })

  return (
    <>
      <p className='text-center py-8 font-bold text-2xl bg-rose-200'>오늘의 운세 🍀</p>
      <div className='max-w-2xl  m-auto mt-24'>
        <img className='w-full h-[400px] mb-5' src="/lucky.jpg" alt="lucky"/>  
        <div className='font-bold mb-4'> 성별
          <button onClick={() => setGender('m')} className={`border-[1px] border-black-200 mx-2 py-2 px-3 ${gender === 'm' && 'bg-rose-300 text-white'}`}>🧑🏻</button>
          <button onClick={() => setGender('f')} className={`border-[1px] border-black-200 mx-2 py-2 px-3 ${gender === 'f' && 'bg-rose-300 text-white'}`}>👩🏻</button>
        </div>
        <div className='mb-4'>
          <span className='mr-5 font-bold mb-4'>생년월일</span>
          <input type='text' className='border-[1px]' onChange={birthChange} value={birthDate} placeholder='생년월일 8자리' />
        </div>
        <div className='mb-4'>
          <span className='mr-7 font-bold'>
            음,양력</span>
          <select value={month} className='border-[1px]' onChange={(e) => setMonth(e.target.value)}>
            <option value="1">양력</option>
            <option value="2">음력 평달</option>
            <option value="3">음력 윤달</option>
          </select>
        </div>
        <div>
          <span className='mr-5 font-bold'>
            태어난 시간</span>
          <select value={time} className='border-[1px]' onChange={(e) => setTime(e.target.value)}>
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
        <button className='mt-10 font-bold w-full bg-rose-200 hover:bg-rose-300 focus:bg-rose-100 py-2' onClick={fetchData}>운세보기</button>
      </div>
      {resultToday && (
        <>
          <div className='max-w-7xl m-auto '>
            <h2 className='font-bold text-xl mb-2'>{resultToday.title}</h2>
            <p className='font-bold text-lg'>오늘 날짜:{resultToday.date}</p>
          </div>
          {resultToday.content.map((item, idx) => (
            <div key={idx}>
              <div className='max-w-7xl m-auto border-2 my-5 px-2 py-2 rounded-md'>
                <h3 className='pt-2 font-bold text-lg mb-2'>{item.name}</h3>
                <p className=''>{item.desc}</p>
              </div>
            </div>
          ))}
        </>
      )}
      {/* {resultData && resultData.day.title} */}
    </>
  )
}
