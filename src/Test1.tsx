import {MutableRefObject, useEffect, useRef} from "react";
import {BrowserJsPlumbInstance, AnchorLocations, BezierConnector} from "@jsplumb/browser-ui";
import * as jsPlumb from "@jsplumb/browser-ui";

import './test1.css'

const Test1 = () => {
    const loaded = useRef(false) // fordi react strict mode mounter dobbelt i strict mode, og vi kan ikke resette jsPlumb med cleanup function
    const containerRef = useRef(null)
    const div1Ref = useRef(null)
    const div2Ref = useRef(null)
    const jsRef: MutableRefObject<BrowserJsPlumbInstance | undefined> = useRef()

    // MutableRefObject<undefined> is not assignable to type LegacyRef<HTMLDivElement> | undefined

    const resolveRef = (ref: MutableRefObject<any>): Element => ref.current as Element

    useEffect(() => {
        if (loaded.current) {
            // jsRef.current!.setZoom(jsRef.current!.currentZoom/2, true)
            return;
        }
        jsPlumb.ready(() => {
            const jsInstance = jsPlumb.newInstance({
                container: resolveRef(containerRef)
            })
            jsInstance.setDraggable(resolveRef(div1Ref), true)
            jsInstance.setDraggable(resolveRef(div2Ref), true)

            jsInstance.connect({
                source: resolveRef(div1Ref),
                target: resolveRef(div2Ref),
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

    return (
        <>
            <h1>JsPlumb example, using elements rendered by React</h1>
            <div id="canvas" ref={containerRef} style={{width: '500px', height: '500px', outline: '1px solid green'}}>
                <div id="div1" ref={div1Ref} className="element">div 1</div>
                <div id="div2" ref={div2Ref} className="element element2">div 2</div>
            </div>

        </>
    );
}

export default Test1