import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const wrapper: Variants = {
  initial: {
    clipPath: `circle(50px at 50% 50%)`,
  },

  animate: {
    clipPath: `circle(1200px at 50% 50%)`,
    transition: {
      // duration: 0.8,
      duration: 3,
    },
  },
  //   animate2: {
  //     clipPath: smallScreen ? `circle(300px at 50% 50%)` : `circle(150px at 50% 50%)`, // for small screen
  //     // clipPath: `circle(300px at 50% 50%)`,

  //     transition: {
  //       duration: 0.6,
  //     },
  //   },
  //   animate3: {
  //     clipPath: `circle(1200px at 50% 50%)`,
  //     backgroundColor: "#0E0F11",
  //     transition: {
  //       duration: 0.8,
  //     },
  //   },
};
const WebsiteOpenerAnimator = () => {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <motion.div
        className="absolute inset-0 bg-red-400"
        variants={wrapper}
        initial="initial"
        animate={"animate"}
        exit="exit"
        // initial={{
        //   //   opacity: 1,
        //   y: 0,
        // }}
        // animate={{
        //   //   opacity: 0.4,
        //   y: "-80vh",
        //   transition: {
        //     duration: 3,
        //     ease: "easeInOut",
        //   },
        // }}
      >
        {/* <Image src="/assets/SpaceXModel.png" alt="space-x model" width={140} height={120} /> */}
      </motion.div>
      {/* <Image src="/assets/Shadow.png" alt="space-x shadow" width={140} height={140} className="top-[-10] absolute" /> */}
    </div>
  );
};

const SplashScreen = () => {
  const [readyToLaunch, setReadyToLaunch] = useState(false);
  const [readyToRemoveLogo, setReadyToRemoveLogo] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReadyToLaunch(true);
    }, 1900);
  }, []);

  return (
    <motion.div
      className="fixed z-50 w-full "
      initial={{
        y: 0,
      }}
      animate={
        readyToLaunch
          ? {
              y: "-150%",
              transition: {
                duration: 2,
              },
            }
          : { y: 0 }
      }
    >
      <div className="relative">
        <div className="grid w-full md:h-screen bg-[#1F2A38] h-[60rem] place-items-center  ">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1.1,
              transition: {
                duration: 1,
              },
            }}
            onAnimationComplete={() => {
              setReadyToRemoveLogo(true);
            }}
            className="flex flex-col items-center justify-center "
          >
            <Image src="/assets/SpaceXModel.png" alt="space-x model" width={100} height={100} />
            <motion.div
              initial={{
                opacity: 1,
              }}
              animate={
                readyToRemoveLogo
                  ? {
                      opacity: 0,
                      transition: {
                        duration: 1,
                      },
                    }
                  : { opacity: 1 }
              }
            >
              <Image src="/assets/spacex.png" height={160} width={160} className="object-contain" alt="space-x logo" />
            </motion.div>
          </motion.div>
        </div>

        <svg viewBox="0 0 800 73" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[99vh]">
          <path d="M800 72.5C528 6 261.5 7 0 72.5V0.5H800V72.5Z" fill="#1F2A38" />
        </svg>
      </div>
    </motion.div>
  );
};

export { WebsiteOpenerAnimator, SplashScreen };
