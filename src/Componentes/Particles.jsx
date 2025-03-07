import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Particle(){
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return(
    <Particles 
    id="tsparticles"
    init={particlesInit}
    loaded={particlesLoaded}
    options={
        {"fullScreen": {
            "enable": true,
            "zIndex": -1
        },
        "particles": {
            "number": {
                "value": 5,
                "density": {
                    "enable": true,
                    "area": 500
                }
            },
            "color": {
                "value": "#1b1e34"
            },
            "shape": {
                "type": "polygon",
                "polygon": {
                    "sides": 6
                }
            },
            "opacity": {
                "value": 0.40246529723245905,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 44.69771699587272,
                "random": true,
                "anim": {
                  "enable": true,
                  "speed": 10,
                  "size_min": 20,
                  "sync": false
                }
              },
            "move": {
                "enable": true,
                "speed": 5,
                "direction": "none",
                "outModes": "out"
            }
        },
        "interactivity": {
           
            "modes": {
                "bubble": {
                    "distance": 200,
        "size": 20,
        "duration": 2,
        "opacity": 8,
        "speed": 3
                }
            }
        },
        "background": {
            "color": "#bebebe"
        }
        }
    }
    />

    )
}