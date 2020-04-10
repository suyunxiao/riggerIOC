/**
 * 人物状态值
 * 
 * 理性值  和 爱情值
 */

import FlowNodeProps from "../FlowNodeProps";


export default class PeopleStateType extends FlowNodeProps {

    //人物名字
    public people:string = "";
    
    //理性值
    public reasonNum:number = 0;

    //爱情值
    public LoveNum:number = 0;

}


export class PeopleStateArrType extends FlowNodeProps {

    public peopleStateArr:Array<PeopleStateType>;

    //当前添加的状态值id集合
    public idArr:Array<string> = [];

}