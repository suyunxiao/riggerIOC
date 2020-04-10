import FlowNodeProps from "../FlowNodeProps";

/**
 * 切换预制的数据
 */
export default class PrefabFlowNodeProps extends FlowNodeProps {
    /**
     * 要切换的预制所在的位置
     */
    uri: string;

    /**
     * 用来跳转的标识符
     */
    id:string;
}