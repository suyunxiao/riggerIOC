import FlowNodeProps from "../FlowNodeProps";


/**
 * 对话款节点数据类型
 */
export default class TalkFloweNodeProps extends FlowNodeProps {

    //人物名字
    name:string;

    //名字位置，左边或者右边
    namePoint:string;

    //对话内容
    center:string;

    //内容位置信息
    point:cc.Vec2;

    //对话文本响应点击节点路径
    touchNodeUrl:string;

}