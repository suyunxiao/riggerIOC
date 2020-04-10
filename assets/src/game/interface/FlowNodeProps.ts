/**
 * 流程图的数据属性
 */
export default class FlowNodeProps {
    /**
     * 备注信息
     */
    ps: string;
    /**
     * 类型标注
     */
    type: string;
    /**
     * 优先级
     */
    priority: number;
    /**
     * 标签内容
     */
    tag: string[];

    /**
     * 标签id 用来做跳转
     */
    id: string = "";
}