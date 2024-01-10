import {
    ReactZoomPanPinchContentRef, ReactZoomPanPinchProps,
    ReactZoomPanPinchRef,
    TransformComponent,
    TransformWrapper
} from "react-zoom-pan-pinch";

interface ZoomPanWrapperProps {
    onZoomStop: (ref: ReactZoomPanPinchRef, event: TouchEvent | MouseEvent) => void,
    children: any
}

const zoomConfig: ReactZoomPanPinchProps = {
    // TODO flytt opp hit
}

const ZoomPanWrapper = ({onZoomStop, children}: ZoomPanWrapperProps) => {
    const Controls = ({zoomIn, zoomOut, resetTransform, ...rest}: ReactZoomPanPinchContentRef) => (
        <>
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>x</button>
        </>
    )

    return (
        <TransformWrapper
            limitToBounds={false}
            smooth={false}
            onZoomStop={onZoomStop} // doesn't work. ony onTransformed is fired
            // onTransformed={onZoomStop}
        >
            {(utils: ReactZoomPanPinchContentRef) => (
                <>
                    {/*<Controls {...utils} />*/}
                    <TransformComponent>
                        {children}
                    </TransformComponent>
                </>
            )}
        </TransformWrapper>
    )
}

export default ZoomPanWrapper;