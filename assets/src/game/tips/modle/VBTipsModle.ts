/**
 * 
 * 提示框
 * 
 */

import UtilEvent from "../../Util/UtilEvent";
import VBTipsSignals from "../signals/VBTipsSignals";
import VBTipsView from "../view/VBTipsView";

const {ccclass, property} = cc._decorator;

@ccclass

export default class VBTipsModle {

    private static _instance: VBTipsModle;

    public static get instance():VBTipsModle {
        if(!this._instance){
            this._instance = new VBTipsModle();
        }
        return this._instance;
    }

    /**
     * 提示数组
     */
    private tipsViewArr:Array<cc.Node> = []; 

    /**
     * 正在执行的节点
     */
    private playNowTipsArr:Array<cc.Node> = [];

    private tipsPrefab:cc.Node;

    private mainNode:cc.Node;

    public init() {
        this.addEventList();
        this.initView();
    }

    private initView() {
        this.mainNode = cc.find("Canvas");
    }

    private addEventList() {
        UtilEvent.on(VBTipsSignals.SHOW_TIPS,this.playTipsAni,this);
        UtilEvent.on(VBTipsSignals.SETSHOW_VIEW,this.onSetTipsView,this);
    }

    private removeEventList() {
        UtilEvent.off(VBTipsSignals.SHOW_TIPS,this.playTipsAni,this);
        UtilEvent.off(VBTipsSignals.SETSHOW_VIEW,this.onSetTipsView,this);
    }

    private setView(){

    }

    /**
     * 播放提示动画
     */
    private playTipsAni(str:string = "123") {
        if(!this.tipsPrefab){
            return;
        }
        this.stopAllAni();
        let item;
        if(this.tipsViewArr.length > 0){
            item = this.tipsViewArr.shift();
            item.getComponent(VBTipsView).setTipsData(str);
        } else {
            item = cc.instantiate(this.tipsPrefab);
            item.getComponent(VBTipsView).setTipsData(str);
        }

        this.mainNode.addChild(item); 

        let finished = cc.callFunc(this.playEndAniCall, this, item);
        let myAction = cc.sequence(cc.moveTo(1, cc.v2(0, 100)), cc.fadeOut(1), finished);

        item.runAction(myAction);
        this.playNowTipsArr.push(item);
    }

    /**
     * 停止前面的所有动画
     */
    private stopAllAni() {
        for(let i = 0; i < this.playNowTipsArr.length; ++i)
        {
            let timer = 0.1;
            let finished = cc.callFunc(this.playEndAniCall, this, this.playNowTipsArr[i]);
            let myAction = cc.sequence(cc.moveTo(timer, cc.v2(0, 100)), cc.fadeOut(timer), finished);
            this.playNowTipsArr[i].stopAllActions();
            this.playNowTipsArr[i].runAction(myAction);
        }
    }


    /**
     * 动画结束回调
     */
    private playEndAniCall(item:cc.Node) {
        for(let i = 0; i < this.playNowTipsArr.length; ++i)
        {
            if(item.uuid == this.playNowTipsArr[i].uuid){
                this.playNowTipsArr.splice(i,1);
                break;
            }
        }

        item.stopAllActions();
        item.removeFromParent();
        item.opacity = 255;
        item.x = 0;
        item.y = 0;
        this.tipsViewArr.push(item);
    }
    
    private onSetTipsView(prefab:cc.Node) {
        this.tipsPrefab = prefab;
    }


}
