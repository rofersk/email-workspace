import SampleData from '/src/data/sample-data.json';
import React, {useState, useEffect} from 'react'

import { FaClock, FaSave, FaFilter, FaTrashAlt} from 'react-icons/fa';

const Home = () => {

  const [show, setShow] = useState(-1);
  const [data, setData] = useState(SampleData);
  const [check, setCheck] = useState(new Array(data.length).fill(false))

  const [select, setSelect] = useState(false)
  const selectAll = (e) => {
  const dummy = [...check]
  for(let i = 0; i < check.length ; i++){
  dummy[i] = !select;
  }
  setCheck(dummy);
  setSelect(!select)
  }

    function timeSince(date) {
      date = new Date(date);
      var seconds = Math.floor((new Date() - date) / 1000);
    
      var interval = seconds / 31536000;
    
      if (interval > 1) {
        return Math.floor(interval) + " years";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hrs";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " min";
      }
      return Math.floor(seconds) + " sec";
    }

    function deleteData(e){
      
        const dummy = [...data]
        const checkDummy = [...check]
        
          for(let i = 0 ; i < check.length ; i++){
            if(check[i] == true){
              dummy.splice(i, 1);
              checkDummy.splice(i,1)
            }
          }
          setData(dummy);
          setCheck(checkDummy);
          setShow(-1)

      }

    return(

    //body
    <div className='h-auto'>
      <div className=' bg-slate-200 h-14 mx-12 drop-shadow-md rounded-sm'>
        <div className='flex justify-center float-left'>

          <input 
            id="default-checkbox" 
            type="checkbox" 
            checked={select}
            className="px-4 ml-2 mt-4 text-green-600 uppercase text-xs 
                      rounded-md border"
                      onChange={selectAll}>
          </input>

            <button 
              className="flex justify-center items-center px-2 ml-2 mt-4 text-green-600 uppercase text-xs 
                        rounded-md border border-green-300 bg-green-100">
                        Save
                        <FaSave className='m-1'/>
            </button>

            <button 
              className="flex justify-center items-center px-2 ml-2 mt-4 uppercase text-xs text-slate-600 rounded-md border 
                      border-slate-300 bg-slate-50">
                        Manage Filters
                        <FaFilter className='m-1' />
            </button>

            <button 
              className="flex justify-center items-center px-2 ml-6 mt-4 uppercase text-xs text-red-600 rounded-md 
                        border border-red-300 bg-red-100"
                        onClick={deleteData}>
                        Delete
                        <FaTrashAlt className='m-1' />
            </button>

        </div>

              <div 
                className='float-right mx-2'>
                  <button 
                    className="px-4 mt-4 mx-2 font-semibold text-slate-600 text-sm 
                              rounded-md border border-slate-300 bg-white">
                              {'<'}
                  </button>
                  <div 
                    className='inline'>
                      1 of 50
                  </div>
                  <button 
                    className="px-4 mt-4 mx-2 bold text-slate-600 text-sm 
                              rounded-md border border-slate-300 bg-white">
                              {'>'}
                  </button>
              </div>
      </div>

      <div>

        {
          data.map((post, idx) => {
            
            return(
              <div key={idx}>
                <div className={idx != show ? 'mx-20 h-20 mt-4 bg-slate-100 rounded-lg drop-shadow-md border' : 
                                            'mx-20 h-auto mt-4 bg-slate-100 rounded-lg drop-shadow-md border'}
                  onClick={() => setShow( show == -1 ? idx : -1)}>   

                  <div 
                    className='float-left mt-4'>
                      <input 
                        type="checkbox" 
                        checked={check[idx]}
                        className="mx-4 inline"
                        onChange={()=>{
                          check[idx] = !check[idx];
                          setCheck(check);
                        }}>
                          
                      </input>      
                      <h1 
                        className='inline font-bold text-neutral-700 text-md font-serif'>
                          FWD : 
                          {post.email_subject}
                      </h1>

                      <div 
                        className='block mx-12 font-semibold text-neutral-600 text-sm font-serif'>
                          {post.sender.username} {' '} 
                          {'<'}{post.sender.email}{'>'} 
                          {'|'} 
                          <h1 
                            className='inline ml-2 font-thin text-neutral-500 text-xs font-serif'>
                              {post.datetime}
                          </h1>
                      </div>
                  </div>
                  <div 
                    className='float-right space-x-3'>
                      <div 
                        className='h-6'>      

                        <button 
                          className="float-right text-slate-400 text-lg pr-2">
                            {'>'}
                        </button>

                        <div className='flex justify-center items-center content-center pr-2'>
                        { idx != show && <div className='rounded-lg px-6 bg-blue-100 border border-blue-600 
                                                        text-blue-400 text-sm mx-2'> 
                                                  {post.tag} 
                                          </div> }
                          <div 
                            className='flex justify-center items-center text-yellow-400 text-xs 
                                      m-5 mt-4 bg-yellow-50 p-1 rounded-lg border border-yellow-200'>
                              <FaClock className='m-1'/>
                              {timeSince(post.datetime)}
                          </div>     
                        </div>
                      </div>                  
                  </div>            
                  <div className='mt-24 mx-10'>    
                  <hr/>
                    <div className='m-5 mx-2'>
                      { show == idx && (
                        <>
                          <div className='float-right bg-blue-100 border border-blue-600 
                                  text-blue-400 rounded-lg px-6 text-sm'>
                            {post.tag}
                          </div>
                          <div className='block font-bold text-neutral-700 font-serif'>
                            {post.sender.username}
                          </div>
                          <div className='italic text-sm'>
                            {post.datetime}
                          </div>
                          <div className='mt-4 '>
                            {post.content}
                          </div>
                          <h1 className='mt-5 text-xs font-light'>
                            ---------- Forwarded Message ----------
                          </h1>
                          <div className='inline'>
                            From : {post.sender.username}
                          </div>
                          <a href='#' className='text-blue-700'>
                          {' <'}{post.sender.email}{'>'}
                          </a>
                          <div>
                            Date : {post.datetime}
                          </div>
                          <div>
                            Subject : {post.email_subject}
                          </div>
                          <div>
                            To : {post.reciever.username}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
    )  
}

export default Home