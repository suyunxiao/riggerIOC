/**
 * 条件配置结构
 */

import FlowNodeProps from "../FlowNodeProps";

export default class ConditionInfoType extends FlowNodeProps {

    //人物
    public people:string;

    //状态值理性 ， 是理性还是爱情
    public mold:string = "";

    //触发范围
    public range:string;

}

export class ConditionExpression extends FlowNodeProps {
    
    public people:string;

    public range:string;

    public num:number;
}

//状态值类型
export enum ConditionMoldType {

    //理性值
    reasonNum = "reasonNum",

    //爱情值
    loveNum = "loveNum",

}