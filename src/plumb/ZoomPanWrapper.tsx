import {
    ReactZoomPanPinchRef,
    TransformComponent,
    TransformWrapper
} from "react-zoom-pan-pinch";

import "./zoomPanWrapper.css"

interface ZoomPanWrapperProps {
    onZoomStop: (ref: ReactZoomPanPinchRef, event: TouchEvent | MouseEvent) => void,
    children: any
}

const ZoomPanWrapper = ({onZoomStop, children}: ZoomPanWrapperProps) => {
    return (
        <TransformWrapper
            limitToBounds={true}
            smooth={false}
            onZoomStop={onZoomStop}
            minScale={0.2}
            panning={{ velocityDisabled: true }}
            centerOnInit={true}
        >
            <TransformComponent wrapperClass="transform-wrapper">
                {children}
            </TransformComponent>
        </TransformWrapper>
    )
}

export default ZoomPanWrapper;