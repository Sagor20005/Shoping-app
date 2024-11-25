const getAosAnimation = ()=>{
    const aosAnimations = [
      'fade', 
      'fade-up', 
      'fade-down', 
      'fade-left', 
      'fade-right', 
      'flip-up', 
      'flip-down', 
      'flip-left', 
      'flip-right', 
      'zoom-in', 
      'zoom-out', 
      'zoom-in-up', 
      'zoom-in-down', 
      'zoom-in-left', 
      'zoom-in-right', 
      'slide-up', 
      'slide-down', 
      'slide-left', 
      'slide-right', 
      'slide-up-right', 
      'slide-up-left', 
      'slide-down-right', 
      'slide-down-left', 
      'fade-up-right', 
      'fade-up-left', 
      'fade-down-right', 
      'fade-down-left',
      'flip-up-right', 
      'flip-up-left', 
      'flip-down-right', 
      'flip-down-left'
    ];
    const index = Math.floor(Math.random()*aosAnimations.length-1) 
    return aosAnimations[index]
  }
  
export default getAosAnimation;