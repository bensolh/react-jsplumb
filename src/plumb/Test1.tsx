import {MutableRefObject, useEffect, useRef} from "react";
import {BrowserJsPlumbInstance, AnchorLocations, BezierConnector} from "@jsplumb/browser-ui";
import * as jsPlumb from "@jsplumb/browser-ui";
import {ReactZoomPanPinchRef} from "react-zoom-pan-pinch";
import ZoomPanWrapper from "./ZoomPanWrapper";

import './test1.css'

const Test1 = () => {
    const loaded = useRef(false) // fordi react strict mode mounter dobbelt i strict mode, og vi kan ikke resette jsPlumb med cleanup function
    const containerRef = useRef(null)
    const div1Ref = useRef(null)
    const div2Ref = useRef(null)
    const jsRef: MutableRefObject<BrowserJsPlumbInstance | undefined> = useRef()

    const resolveElementRef = (ref: MutableRefObject<any>): Element => ref.current as Element

    useEffect(() => {
        console.log("initPlumb")
        if (loaded.current) {
            jsRef.current!.repaintEverything()
            // jsRef.current!.setZoom(jsRef.current!.currentZoom/2, true)
            return;
        }
        jsPlumb.ready(() => {
            const jsInstance = jsPlumb.newInstance({
                container: resolveElementRef(containerRef)
            })
            jsInstance.setDraggable(resolveElementRef(div1Ref), true)
            jsInstance.setDraggable(resolveElementRef(div2Ref), true)

            jsInstance.connect({
                source: resolveElementRef(div1Ref),
                target: resolveElementRef(div2Ref),
                anchor: AnchorLocations.Continuous,
                directed: true,
                connector: {
                    type: BezierConnector.type,
                    options: {
                        curviness: 50 // default 150 - avstand i px mellom elementene når kurven er "perfekt" (90 grader på midten)
                    }
                }
            })

            jsRef.current = jsInstance
        })


        loaded.current = true
    }, []);

    // const handleZoom = (ref: ReactZoomPanPinchRef, state: { scale: number; positionX: number; positionY: number }) => { // for onTransform rather than onZoomStop
    const handleZoom = (ref: ReactZoomPanPinchRef, event: TouchEvent | MouseEvent) => {
        if (!jsRef.current) return
        // console.log("nytt zoomnivå: ", state.scale)
        console.log("ref: ", ref.state.scale)
        jsRef.current!.setZoom(ref.state.scale)
    }


    return (
        <>
            <h1>JsPlumb example, using elements rendered by React</h1>
            <ZoomPanWrapper onZoomStop={handleZoom}>
                <div id="jsplumb-canvas" ref={containerRef}>
                    <div id="div1" ref={div1Ref} className="element">div 1</div>
                    <div id="div2" ref={div2Ref} className="element element2">div 2</div>
                </div>
            </ZoomPanWrapper>
        </>
    );
}

export default Test1