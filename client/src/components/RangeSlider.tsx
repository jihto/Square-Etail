import type { SliderProps } from 'rc-slider';
import Slider from 'rc-slider';
import type { TooltipRef } from 'rc-tooltip';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import raf from 'rc-util/lib/raf';
import * as React from 'react';

interface HandleTooltipProps {
    value: number ;
    children: React.ReactElement;
    visible: boolean;
    tipFormatter?: (value: number) => React.ReactNode;
}

const HandleTooltip: React.FC<HandleTooltipProps> = (props) => {
    const { value, children, visible, tipFormatter = (val) => `${val} %`, ...restProps } = props;

    const tooltipRef = React.useRef<TooltipRef>(null);
    const rafRef = React.useRef<number | null>(null);

    function cancelKeepAlign() {
        raf.cancel(rafRef.current!);
    }

    function keepAlign() {
        rafRef.current = raf(() => {
            tooltipRef.current?.forceAlign();
        });
    }

    React.useEffect(() => {
        (visible)  ? keepAlign() : cancelKeepAlign();
        return cancelKeepAlign;
    }, [value, visible]);

    return (
        <Tooltip
            placement="top"
            overlay={tipFormatter(value)}
            overlayInnerStyle={{ minHeight: 'auto' }}
            ref={tooltipRef}
            visible={visible}
            {...restProps}
        >
        {children}
        </Tooltip>
    );
};

export const handleRender: SliderProps['handleRender'] = (node, props) => (
    <HandleTooltip value={props.value} visible={props.dragging}>
        {node}
    </HandleTooltip>
);

interface TooltipSliderProps extends SliderProps {
    tipFormatter?: (value: number) => React.ReactNode;
    tipProps?: any;
}

const RangeSlider: React.FC<TooltipSliderProps> = ({ tipFormatter, tipProps, onChange, ...props }) => { 
    const tipHandleRender: SliderProps['handleRender'] = (node, handleProps) => { 
        return(
        <HandleTooltip
            value={handleProps.value}
            visible={handleProps.dragging}
            tipFormatter={tipFormatter}
            {...tipProps}
        >
        {node}
        </HandleTooltip>
    )};
    return <Slider {...props} handleRender={tipHandleRender} onChange={onChange} />;
};

export default RangeSlider;
