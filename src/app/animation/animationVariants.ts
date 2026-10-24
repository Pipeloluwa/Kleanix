import { Variants } from "motion/react";




export const animateGradualSpacing: Variants = {
  offscreen: {
    x: -18,
    opacity: 0,
    visibility: "hidden"
  },

  onscreen:(index: number)=> ({
    x: 0,
    opacity: 1,
    visibility: "visible",
    transition: {
      type: 'spring',
      duration: 0.5, 
      delay: index * 0.1,
      
    }
  })

}



export const animateBlurIn: Variants = {
  offscreen: {
    filter: 'blur(20px)',
    opacity: 0,
    visibility: "hidden"
  },

  onscreen: {
    filter: 'blur(0px)',
    opacity: 1,
    visibility: "visible",
    transition: {
      duration: 1.2,
      
    },
  },

}




export const animateFadeUp: Variants = {
  offscreen: {
    opacity: 0, 
    y: 100,
    visibility: "hidden"
  },

  onscreen:(delayNo: number)=> ({
    opacity: 1, 
    y: 0,
    visibility: "visible",
    transition: {
      type: 'spring',
      duration: 3,
      delay: delayNo,
      
    }
  }),

}



export const animateFadeDown: Variants = {
  offscreen: {
    opacity: 0, 
    y: -100,
    visibility: "hidden"
  },

  onscreen:(delayNo: number)=> ({
    opacity: 1, 
    y: 0,
    visibility: "visible",
    transition: {
      type: 'spring',
      duration: 3,
      delay: delayNo,
      
    }
  }),

}


export const animatePullUp: Variants = {
  offscreen: {
    opacity: 0, 
    y: 100,
    visibility: "hidden"
  },

  onscreen:(index: number) => ({
    opacity: 1, 
    y: 0,
    visibility: "visible",
    transition: {
      type: 'spring',
      delay: index * 0.05,
      
    }
  })

}





export const animateVisible: Variants = {
  offscreen: {
    opacity: 0
  },
  onscreen:(index: number) => ( {
    opacity: 1,
    transition: {
      duration: 3,
      delay: index
    },
     
  })
};




export const animateRotateFromLeft: Variants = {
  offscreen: {
    x: -100,
    rotate: -50,
    visibility: "hidden"
  },
  onscreen:(index: number) => ( {
    x: 0,
    rotate: 0,
    visibility: "visible",
    transition: {
      duration: 1.2,
      delay: index
    },
     
  })
};


export const animateRotateFromRight: Variants = {
  offscreen: {
    x: 100,
    rotate: +50,
    visibility: "hidden"
  },
  onscreen:(index: number) => ( {
    x: 0,
    rotate: 0,
    visibility: "visible",
    transition: {
      duration: 1.2,
      delay: index
    },
     
  })

};



export const animateDownTop: Variants = {
  offscreen: {
    y: 100,
    scale: 0,
    opacity: 0
  },
  onscreen: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2
    },
     
  }
};


export const animateTopDown: Variants = {
  offscreen: {
    y: -100,
    scale: 0,
    opacity: 0
  },
  onscreen: {
    y: 0,
    scale: 1,
    opacity: 1,
     
  }
};




export const animateFromLeft: Variants = {
  offscreen: {
    x: -100,
    visibility: "hidden"
  },
  onscreen:(index: number) => (  {
    x: 0,
    visibility: "visible",
    transition: {
      duration: 1.2,
      delay: index
    },
     
  })
};



export const animateFromRight: Variants = {
  offscreen: {
    x: 100,
    visibility: "hidden"
  },
  onscreen:(index: number) => (  {
    x: 0,
    visibility: "visible",
    transition: {
      duration: 1.2,
      delay: index
    },
     
  })
};

export const visibleComponent: Variants = {
  offscreen: { visibility: "hidden" },
  onscreen: { visibility: "visible" }
}