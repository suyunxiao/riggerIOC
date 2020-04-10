import RecordData from "../../registration/data/RecordData";
import UtilEvent, { UtilEventConst } from "../Util/UtilEvent";
import { DataEvents } from "../dataServer/event/DataEvents";
import ConstantData from "../../registration/data/ConstantData";
import VBTipsSignals from "../tips/signals/VBTipsSignals";
import { ComTipsStr } from "../Util/ComTipsStr";

const {property, ccclass} = cc._decorator;

//预制体的存放节点路径
const prefabUrl = "Canvas/View/MainView/prefab_node/";

/**
 * 主场景
 */
@ccclass
export default class MainScene extends cc.Component {
    /**
     * 当前播放的音频ID的集合
     */
    static voiceIDSet: Set<number> = new Set();
    update () {
        
      
    }

    onEnable(){
        this.addEventList();
        this.initView();
    }

    private initView() {

    }

    onDisable(){
        this.removeEventList();
    }

    onDestroy(){

    }
 

    private addEventList() {
        UtilEvent.on(UtilEventConst.CLEAN_PREFAB,this.onCleanPrefab,this);
        UtilEvent.on(DataEvents.DATA_SERVER_CONTEXT_END,this.onDataServerEnd,this);
    }

    private removeEventList() {
        UtilEvent.off(UtilEventConst.CLEAN_PREFAB,this.onCleanPrefab,this);
        UtilEvent.off(DataEvents.DATA_SERVER_CONTEXT_END,this.onDataServerEnd,this);
    }

    /**
     * 清除预制体节点
     */ 
    private onCleanPrefab(name:string) {    
        let node = cc.find( prefabUrl + name );
        if(node){
            cc.log(ComTipsStr.str2 + name);
            node.removeFromParent();
        } else {
            cc.warn(ComTipsStr.str3 + name);
        }
    }

    private onDataServerEnd() {
    
    }
}