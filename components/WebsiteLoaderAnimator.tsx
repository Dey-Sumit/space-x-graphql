import Image from "next/image";
import { motion, Variants } from "framer-motion";

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
    <div className="fixed z-50 inset-0  grid place-items-center">
      <motion.div
        className="absolute bg-red-400 inset-0"
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

export default WebsiteOpenerAnimator;
