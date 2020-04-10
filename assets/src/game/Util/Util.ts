// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import VoiceUtil from "../voice/VoiceUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Util {

    private static poolLab:Array<cc.Node> = [];
    public static getLab()
    {
        if(this.poolLab.length <= 0){
            let node = new cc.Node();
            node.addComponent(cc.Label);
            // node.addComponent(SingleLab);
            this.poolLab.push(node);
        }
        
        return this.poolLab.pop();
    }

    public static removeLab(labNod:cc.Node)
    {
        if(labNod){
            labNod.removeFromParent();
        }
        this.poolLab.push(labNod);
    }

    private static voiceUtil:VoiceUtil = new VoiceUtil();

    //音频接口
    public static get voice()
    {
        return this.voiceUtil;
    }

    // update (dt) {}
}
