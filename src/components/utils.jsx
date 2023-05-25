
import { useRef, useState,useEffect } from "react";
import data from "../data";
import icon from '../assets/icon-source.svg'



function utils (num) {
  const colors = [
    '#419EBB', // Planet 0
    '#EDA249', // Planet 1
    '#6D2ED5', // Planet 2
    '#D14C32', // Planet 3
    '#D83A34', // Planet 4
    '#CD5120', // Planet 5
    '#1EC1A2', // Planet 6
    '#2D68F0'  // Planet 7 and beyond
  ];
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  

 useEffect( () => {
  window.addEventListener('resize',function(){
    setWindowWidth(window.innerWidth)
  })

  return () => {
    window.removeEventListener('resize',function(){
      setWindowWidth(window.innerWidth)
    })
  }
 })
 
  let color = ''

  // changing the border color based on the planet
  if(num === 0){
    color = '#419EBB'
  }else if(num === 1){
    color = '#EDA249'
  }else if(num === 2){
    color ='#6D2ED5'
  }
  else if(num === 3){
    color = '#D14C32'
  }
  else if(num === 4){
    color = '#D83A34'
  }
  else if(num === 5){
    color = '#CD5120'
  }
  else if(num === 6){
    color = '#1EC1A2'
  }
  else{
    color = '#2D68F0'
  }

   const style ={
    borderColor: windowWidth < 670 ? color : 'rgba(255, 255, 255, .4)',
    // backgroundColor: windowWidth > 670 ? color : 'transparent'
    // borderColor:color
    
    backgroundColor: colors[num]
   }
   const pRef = useRef(null)
 
  

  const [type, setType]= useState('overview')
  const typeChange = useRef(null)
  

   function imgagesRender(){
   if(type === 'structure'){
      return <img src={data[num].images.internal} className='planet--img' alt='' />
    }else if(type === 'geology'){
      return (
        <div className='geology--container'>
          <img src={data[num].images.planet} alt="" className='planet--img' /> 
          <img src={data[num].images.geology} className='planet--img geology'  alt='' />
        </div>
      )
    }
    else{
       return <img src={data[num].images.planet} alt="" className='planet--img' /> 
    }

    




 }

 


 function handleClick(e){
  setType(e.target.dataset.type)

  


  let children = typeChange.current.children
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
  
     

    child.classList.remove('active')

    

    
    
  }

  e.target.classList.add('active')
 
  
  
 
  
  



 
 }


 return(
    <>
       <div className="flex-container">

        <div className="c-cont">
            {  
              imgagesRender()
            }

          <div>
            <div className='p-content'>
              <div>
                  <h1 className='planet--name'>{data[num].name}</h1> 
                  <p className='planet--info'> {data[num][type].content}</p>

                  <div className='source--container'>
                    <span className='source'>Source:</span>
                    <a target='__blank' href={data[num][type].source} className='source'>Wikipedia</a>
                    <img className='icon--source' src={icon} alt="" />
                
                  </div>
              
              </div>
              <div ref={typeChange} className='planet--extra--info'>
                <p ref={pRef}  style={style}  data-type={'overview'} className="active" onClick={handleClick}>
                  {windowWidth >= 670 && <span>01</span>}
                  Overview
                </p>
               
               
                <p ref={pRef} style={style} data-type={'structure'} onClick={handleClick}>
                  {windowWidth >= 670 && <span>02</span>}
                   {windowWidth < 670 ? 'Structure' : 'Internal Structure'}
                  </p>
                <p ref={pRef} style={style}  data-type={'geology'} onClick={handleClick}>
                    {windowWidth >= 670 && <span>03</span>}
                    {windowWidth < 670 ? 'surface' : 'surface geology'}
                </p>
                
              </div>
            </div>
          
           
          </div>
        </div>
        

           <div className='planet--RRRA'>
              <div>
                <p>Rotation Time</p>
                <p>{data[num].rotation}</p>
              </div>
              <div>
                <p>Revolution Time</p>
                <p>{data[num].revolution}</p>
              </div>
              <div>
                <p>Radius</p>
                <p>{data[num].radius}</p>
              </div>
              <div>
                <p>Average Temp.</p>
                <p>{data[num].temperature}</p>
              </div>
            </div>
        </div>
    </>
  )
}

export default utils ;