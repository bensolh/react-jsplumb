import {MutableRefObject, useEffect, useRef} from "react";
import * as jsPlumb from "@jsplumb/browser-ui";
import {
    AnchorLocations,
    BezierConnector,
    BrowserJsPlumbInstance,
    ConnectParams,
    ContainmentType
} from "@jsplumb/browser-ui";
import {ReactZoomPanPinchRef} from "react-zoom-pan-pinch";
import ZoomPanWrapper from "./ZoomPanWrapper";

import './jsPlumbMain.css'

const connectParams: ConnectParams<any> = {
    anchor: AnchorLocations.Continuous,
    directed: true,
    connector: {
        type: BezierConnector.type,
        options: {
            curviness: 50 // default 150 - distance (px) between elems when curve is "perfect" (perpendicular in the middle)
        }
    }
}

const JsPlumbMain = () => {
    const loaded = useRef(false)
    const containerRef = useRef(null)
    const element1Ref = useRef(null), element2Ref = useRef(null), element3Ref = useRef(null)
    const jsRef: MutableRefObject<BrowserJsPlumbInstance | undefined> = useRef()

    const resolveElementRef = (ref: MutableRefObject<any>): Element => ref.current as Element

    useEffect(() => {
        if (loaded.current) return // react strict mode mounts twice in dev - doesn't play well with jsPlumb

        jsPlumb.ready(() => {
            const jsInstance = jsPlumb.newInstance({
                container: resolveElementRef(containerRef),
                dragOptions: {containment: ContainmentType.parent}
            })
            jsInstance.setDraggable(resolveElementRef(element1Ref), true)
            jsInstance.setDraggable(resolveElementRef(element2Ref), true)
            jsInstance.setDraggable(resolveElementRef(element3Ref), true)

            jsInstance.connect({
                source: resolveElementRef(element1Ref),
                target: resolveElementRef(element3Ref), ...connectParams
            })
            jsInstance.connect({
                source: resolveElementRef(element2Ref),
                target: resolveElementRef(element3Ref), ...connectParams
            })

            jsRef.current = jsInstance
        })

        loaded.current = true
    }, []);


    // const handleZoom = (ref: ReactZoomPanPinchRef, state: { scale: number; positionX: number; positionY: number }) => { // for onTransform rather than onZoomStop
    const handleZoom = (ref: ReactZoomPanPinchRef, event: TouchEvent | MouseEvent) => { // NB! doesn't trigger on  Controls
        if (!jsRef.current) return
        jsRef.current!.setZoom(ref.state.scale) // Tell jsPlumb that we are zoomed
    }


    return (
        <>
            <h1 style={{color: "white"}}>o-o JsPlumb + React + pan/zoom o-o</h1>
            <ZoomPanWrapper onZoomStop={handleZoom}>
                <div id="jsplumb-canvas" ref={containerRef}>
                    <div id="element1" ref={element1Ref} className="element">
                        Rendered using jsx, providing <b>full React integration</b> and flexibility!
                    </div>
                    <div id="element2" ref={element2Ref} className="element">
                        <b>react-zoom-pan-pinch</b> allows us to make a huge canvas the we can navigate as needed!
                    </div>
                    <div id="element3" ref={element3Ref} className="element">
                        <b>JsPlumb community edition</b> provides the tools to connect and move boxes around!
                    </div>
                </div>
            </ZoomPanWrapper>
        </>
    );
}

export default JsPlumbMain