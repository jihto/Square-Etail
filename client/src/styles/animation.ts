

export const variantsBottom: Function = (duration?: number) => {
    return {
        hidden: {
            opacity: 0,
            y: "100%",
        },
        visible: {
            opacity: 1,
            y: 0, 
            transition: {
                duration: duration || 1,
                ease: "easeInOut", 
            },
        },
    }
}

export const variantsTop: Function = (duration?: number) => {
    return {
        hidden: {
            opacity: 0,
            y: "-100%",  
        },
        visible: {
            opacity: 1,
            y: 0,  
            transition: {
                duration: duration || 1, 
                ease: "easeInOut", 
            },
        },
    };
}
export const variantsLeft : Function = (duration?: number) => {
    return {
        hidden: {
            opacity: 0,
            x: "-100%", 
        },
        visible: {
            opacity: 1,
            x: 0, 
            transition: {
                duration: duration || 1,  
                ease: "easeInOut",  
            },
        },
    };
}
export const variantsRight: Function = (duration?: number) => {
    return {
        hidden: {
            opacity: 0,
            x: "100%",  
        },
        visible: {
            opacity: 1,
            x: 0,  
            transition: {
                duration: duration || 1, 
                ease: "easeInOut",  
            },
        },
    };
}
export const opacityVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 2, // Adjust animation duration
        ease: "easeInOut",
      },
    },
  };

export const characterVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};