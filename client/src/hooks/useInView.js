
import {useState, useEffect, useRef} from "react";

const useInView = () => {

    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(()=> {
        const rf = ref.current;
        const observer = new IntersectionObserver((entries) => {
               if(entries[0].isIntersecting) {
                   setIsInView(entries[0].isIntersecting) 
               }
        })
        // console.log(rf)
       
        if(rf) observer.observe(rf)

        return ()=> {
            if(rf) observer.unobserve(rf)
        }
    }, [])

    return {isInView, ref}
}

export default useInView