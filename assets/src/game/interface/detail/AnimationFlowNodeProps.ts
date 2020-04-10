import FlowNodeProps from "../FlowNodeProps";

/**
 * 动画节点包含数据
 */
export default class AnimationFlowNodeProps extends FlowNodeProps {
    /**
     * 播放动画的节点所在的地址
     */
    uri: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 播放次数
     */
    times: number | "loop";
    /**
     * 是否可以跳过
     */
    canSkip: boolean;
}